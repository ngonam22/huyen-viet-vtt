import itemsConfig from '../../lib/items-config.json';
import { resolveTraits } from '../helpers/itemCatalog.ts';
import { DetailModal } from './detail-modal.mjs';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

let activeItemsSidebarModal = null;

const PAGE_SIZE = 8;
const FALLBACK_ITEM_IMG = '/systems/huyen-viet-vtt/assets/icons/weapon.png';

const CATEGORIES = [
  { id: 'all', label: 'Tất Cả', icon: 'fa-layer-group' },
  { id: 'weapon', label: 'Vũ Khí', icon: 'fa-khanda', type: 'vuKhi', source: 'weapons' },
  { id: 'armor', label: 'Giáp Trụ', icon: 'fa-shield-halved', type: 'giapTru', source: 'armor' },
  { id: 'accessory', label: 'Trang Bị', icon: 'fa-toolbox', type: 'trangBi', source: 'accessories' },
];

const TYPE_LABELS = {
  vuKhi: 'Vũ Khí',
  giapTru: 'Giáp Trụ',
  trangBi: 'Trang Bị',
};

function normalizeText(value) {
  return String(value ?? '').toLocaleLowerCase('vi-VN');
}

function truncateText(value, maxLength = 110) {
  const text = String(value ?? '').trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trim()}…`;
}

function buildRows() {
  return CATEGORIES
    .filter(category => category.source)
    .flatMap(category => (itemsConfig[category.source] ?? []).map(item => {
      const img = item.img || FALLBACK_ITEM_IMG;

      return {
        key: `${category.id}:${item.id}`,
        id: item.id,
        name: item.name,
        type: category.type,
        typeLabel: TYPE_LABELS[category.type],
        category: category.id,
        img,
        rarity: 'Thường',
        flavorText: item.flavorText ?? '',
        shortDescription: truncateText(item.flavorText || item.description || 'Không có mô tả.'),
        searchText: normalizeText(`${item.name} ${item.flavorText ?? ''}`),
        system: {
          ...item,
          traits: item.traits ? resolveTraits(item.traits) : [],
          img,
          isEquipped: false,
          effectiveDamage: item.baseDamage,
          resistance: item.baseResistance,
        },
      };
    }));
}

export class ItemsSidebarModal extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: 'hv-items-sidebar-modal',
    tag: 'section',
    classes: ['huyen-viet-vtt', 'hv-items-sidebar-modal'],
    position: {
      width: 920,
      height: 680,
    },
    window: {
      resizable: true,
    },
  };

  static PARTS = {
    main: {
      template: 'systems/huyen-viet-vtt/templates/apps/items-sidebar-modal.hbs',
    },
  };

  get title() {
    return 'VẬT PHẨM';
  }

  constructor(options = {}) {
    super(options);
    this._rows = buildRows();
    this._category = 'all';
    this._searchText = '';
    this._page = 1;
    this._focusSearch = false;
  }

  static show() {
    if (activeItemsSidebarModal?.element?.isConnected) {
      activeItemsSidebarModal.bringToTop?.();
      return activeItemsSidebarModal;
    }

    activeItemsSidebarModal = new this();
    return activeItemsSidebarModal.render(true);
  }

  async _prepareContext(_options) {
    const search = normalizeText(this._searchText).trim();
    const filteredRows = this._rows.filter(row => {
      const matchesCategory = this._category === 'all' || row.category === this._category;
      const matchesSearch = !search || row.searchText.includes(search);
      return matchesCategory && matchesSearch;
    });

    const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
    this._page = Math.min(Math.max(this._page, 1), totalPages);

    const start = (this._page - 1) * PAGE_SIZE;
    const pageRows = filteredRows.slice(start, start + PAGE_SIZE).map(row => ({
      ...row,
      statLabel: this._statLabel(row),
    }));

    return {
      subtitle: 'Tất cả vật phẩm trong thế giới Huyền Việt.',
      searchText: this._searchText,
      activeCategory: this._category,
      categories: CATEGORIES.map(category => ({
        ...category,
        count: category.id === 'all'
          ? this._rows.length
          : this._rows.filter(row => row.category === category.id).length,
        isActive: category.id === this._category,
      })),
      rows: pageRows,
      totalCount: this._rows.length,
      filteredCount: filteredRows.length,
      hasRows: pageRows.length > 0,
      hasPagination: filteredRows.length > PAGE_SIZE,
      page: this._page,
      totalPages,
      canPagePrev: this._page > 1,
      canPageNext: this._page < totalPages,
      pageStart: filteredRows.length ? start + 1 : 0,
      pageEnd: Math.min(start + PAGE_SIZE, filteredRows.length),
    };
  }

  async _onRender(context, options) {
    await super._onRender(context, options);

    this.element.querySelector('.hv-item-dashboard__search')?.addEventListener('input', event => {
      this._searchText = event.target.value ?? '';
      this._page = 1;
      this._focusSearch = true;
      this.render();
    });

    this.element.querySelectorAll('.hv-item-dashboard__row').forEach(row => {
      row.addEventListener('click', event => {
        if (event.target.closest('button')) return;
        this._showDetail(row.dataset.itemKey);
      });
    });

    if (this._focusSearch) {
      const searchInput = this.element.querySelector('.hv-item-dashboard__search');
      searchInput?.focus();
      searchInput?.setSelectionRange?.(searchInput.value.length, searchInput.value.length);
      this._focusSearch = false;
    }
  }

  async _onClickAction(event, target) {
    const action = target.dataset.action;

    if (action === 'filter-category') {
      this._category = target.dataset.category || 'all';
      this._page = 1;
      this.render();
      return;
    }

    if (action === 'page-prev' && this._page > 1) {
      this._page -= 1;
      this.render();
      return;
    }

    if (action === 'page-next') {
      this._page += 1;
      this.render();
      return;
    }

    if (action === 'show-detail') {
      this._showDetail(target.dataset.itemKey);
    }
  }

  _showDetail(itemKey) {
    const row = this._rows.find(item => item.key === itemKey);
    if (!row) return;

    DetailModal.show({
      id: row.id,
      name: row.name,
      type: row.type,
      img: row.img,
      system: row.system,
    });
  }

  _statLabel(row) {
    if (row.type === 'vuKhi') return `Sát thương ${row.system.baseDamage}`;
    if (row.type === 'giapTru') return `Kháng lực ${row.system.baseResistance}`;
    return `Số lượng ${row.system.quantity ?? 1}`;
  }
}
