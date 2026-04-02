import itemsConfig from '../../lib/items-config.json';
import { addWeaponToActor, addArmorToActor, addAccessoryToActor } from '../helpers/itemCatalog.ts';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class InventoryModal extends HandlebarsApplicationMixin(ApplicationV2) {

    static DEFAULT_OPTIONS = {
        id: 'hv-inventory-modal',
        tag: 'section',
        classes: ['huyen-viet-vtt', 'inventory-modal'],
        position: {
            width: 480,
            height: 560,
        },
        window: {
            resizable: true,
        },
    };

    static PARTS = {
        main: {
            template: 'systems/huyen-viet-vtt/templates/apps/inventory-modal.hbs',
        },
    };

    constructor(actor, options = {}) {
        super(options);
        this.actor = actor;
        this._typeFilter = 'all';
        this._searchText = '';
    }

    get title() {
        return 'Kho Vật Phẩm';
    }

    static show(actor) {
        return new this(actor).render(true);
    }

    async _prepareContext(_options) {
        const items = [
            ...itemsConfig.weapons.map(w => ({ ...w, catalogType: 'weapon' })),
            ...itemsConfig.armor.map(a => ({ ...a, catalogType: 'armor' })),
            ...itemsConfig.accessories.map(a => ({ ...a, catalogType: 'accessory' })),
        ];

        return { catalogItems: items };
    }

    async _onRender(_context, _options) {
        await super._onRender(_context, _options);

        const el = this.element;
        const rows = el.querySelectorAll('.hv-catalog__row');
        const searchInput = el.querySelector('.hv-catalog__search');
        const typeBtns = el.querySelectorAll('.hv-catalog__type-btn');

        const applyFilters = () => {
            const search = this._searchText.toLowerCase();
            rows.forEach(row => {
                const type = row.dataset.catalogType;
                const name = row.querySelector('.hv-catalog__name')?.textContent.toLowerCase() ?? '';
                const matchType = this._typeFilter === 'all' || type === this._typeFilter;
                const matchSearch = !search || name.includes(search);
                row.style.display = (matchType && matchSearch) ? '' : 'none';
            });
        };

        // Search input
        searchInput?.addEventListener('input', (e) => {
            this._searchText = e.target.value;
            applyFilters();
        });

        // Type filter buttons
        typeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                typeBtns.forEach(b => b.classList.remove('is-active'));
                btn.classList.add('is-active');
                this._typeFilter = btn.dataset.filter;
                applyFilters();
            });
        });
    }

    async _onClickAction(event, target) {
        const action = target.dataset.action;
        if (action !== 'add-catalog-item') return;

        const catalogId = target.dataset.catalogId;
        const catalogType = target.dataset.catalogType;
        const row = target.closest('.hv-catalog__row');
        const qty = parseInt(row?.querySelector('.hv-catalog__qty')?.value) || 1;

        const addFn = {
            weapon: addWeaponToActor,
            armor: addArmorToActor,
            accessory: addAccessoryToActor,
        }[catalogType];

        if (!addFn) return;

        for (let i = 0; i < qty; i++) {
            await addFn(this.actor, catalogId);
        }

        ui.notifications.info(`Đã thêm ${qty}x vào hành trang.`);
    }
}
