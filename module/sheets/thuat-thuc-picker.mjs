import { THUAT_THUC, HE_PHAI } from '../helpers/config.ts';
import {
    learnThuatThuc,
    isThuatThucUnlocked,
    isSectStarterEligible,
    getSectStarterRemaining,
    matchesPrivilege,
    SECT_STARTER_SLOTS,
} from '../helpers/thuatThuc.ts';
import { learnThuatThucWithXp, learnSectStarterTechnique } from '../helpers/progression.ts';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

/** Lowercase + bỏ dấu để tìm "hoa vo" khớp "Hỏa Võ". */
const fold = (s) => s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/đ/g, 'd');
const ELEMENT_ICON = (el) => `systems/huyen-viet-vtt/assets/icons/${el}-tablet-icon.webp`;
const stripHtml = (s) => (s ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

/**
 * Thuật Thức picker — see specs/spec_thuat_thuc.md §9.4.
 * Modes:
 *  - 'learn'     (default): Thuật Thức đã mở theo Giáo Trình + Đặc Quyền, học bằng Tu Vi.
 *  - 'starter'  : lượt Nhập Môn — cấp-1 trong Giáo Trình, miễn phí (source='sect').
 *  - 'privilege': một mục Đặc Quyền `privileges[bac][index]`, học bằng Tu Vi.
 * GM: 'Hiện tất cả' + thêm miễn phí (source='manual') ở mode 'learn'.
 */
export class ThuatThucPicker extends HandlebarsApplicationMixin(ApplicationV2) {
    static DEFAULT_OPTIONS = {
        id: 'hv-thuat-thuc-picker',
        tag: 'section',
        classes: ['huyen-viet-vtt', 'hv-tt-picker'],
        position: { width: 860, height: 680 },
        window: { resizable: true, icon: 'fas fa-book-open' },
        actions: {
            toggleFilter: ThuatThucPicker._onToggleFilter,
            clearLevels: ThuatThucPicker._onClearLevels,
            learnXp: ThuatThucPicker._onLearnXp,
            pickStarter: ThuatThucPicker._onPickStarter,
            addFree: ThuatThucPicker._onAddFree,
        },
    };

    static PARTS = {
        main: { template: 'systems/huyen-viet-vtt/templates/apps/thuat-thuc-picker.hbs' },
    };

    /** Chỉ một picker mở tại một thời điểm (id cố định). */
    static #current = null;

    static async show(actor, { mode = 'learn', bac, index } = {}) {
        await ThuatThucPicker.#current?.close({ animate: false });
        ThuatThucPicker.#current = new this(actor, { mode, bac, index });
        return ThuatThucPicker.#current.render(true);
    }

    constructor(actor, { mode = 'learn', bac, index } = {}, options = {}) {
        super(options);
        this.actor = actor;
        this.mode = mode;
        this.privilegeRef = { bac, index };
        this.filters = { q: '', category: '', levels: [], element: '', showAll: false };
        this.levelMenuOpen = false;
    }

    get title() {
        const titles = { starter: 'Nhập Môn', privilege: 'Đặc Quyền', learn: 'Tàng Kinh Các' };
        return `${titles[this.mode] ?? titles.learn} — ${this.actor.name}`;
    }

    get #sect() {
        return HE_PHAI[this.actor.system.identity?.monPhai];
    }

    get #privilege() {
        return this.#sect?.privileges?.[this.privilegeRef.bac]?.[this.privilegeRef.index];
    }

    /** Danh sách gốc theo mode, trước khi áp filter chip. */
    #basePool() {
        if (this.mode === 'starter') return THUAT_THUC.filter((e) => isSectStarterEligible(this.actor, e));
        if (this.mode === 'privilege') {
            const p = this.#privilege;
            return p ? THUAT_THUC.filter((e) => matchesPrivilege(e, p)) : [];
        }
        if (game.user.isGM && this.filters.showAll) return THUAT_THUC;
        return THUAT_THUC.filter((e) => isThuatThucUnlocked(this.actor, e));
    }

    async _prepareContext(_options) {
        const i18n = game.i18n;
        const isGM = game.user.isGM;
        const currentXp = this.actor.system?.progression?.currentXp ?? 0;
        const learned = new Set(
            this.actor.items.filter((i) => i.type === 'thuatThuc').map((i) => i.system.techniqueId)
        );
        const pool = this.#basePool();

        // Chip chỉ hiện giá trị có trong pool → không bao giờ có chip dẫn tới danh sách rỗng
        const uniq = (arr) => [...new Set(arr.filter(Boolean))];
        const chip = (group, value, label) => ({ group, value, label, active: String(this.filters[group]) === String(value) });
        const chips = {
            category: uniq(pool.map((e) => e.category)).map((c) =>
                chip('category', c, i18n.localize(`BOILERPLATE.ThuatThucCategory.${c}`))),
            element: uniq(pool.map((e) => e.element)).map((el) => ({
                ...chip('element', el, i18n.localize(`BOILERPLATE.Element.${el}.label`)),
                icon: ELEMENT_ICON(el),
            })),
        };

        const { category, levels, element } = this.filters;
        const levelOptions = uniq(pool.map((e) => e.level)).sort().map((l) => ({ value: l, checked: levels.includes(l) }));
        const cards = pool
            .filter((e) => (!category || e.category === category)
                && (!levels.length || levels.includes(e.level))
                && (!element || e.element === element))
            .sort((a, b) => a.level - b.level || a.category.localeCompare(b.category) || a.name.localeCompare(b.name, 'vi'))
            .map((entry) => {
                const summary = stripHtml(entry.primaryEffect || entry.sincerityEffects?.[0]?.text);
                return {
                    entry,
                    searchKey: fold(`${entry.name} ${entry.id}`),
                    categoryLabel: i18n.localize(`BOILERPLATE.ThuatThucCategory.${entry.category}`),
                    elementLabel: entry.element ? i18n.localize(`BOILERPLATE.Element.${entry.element}.label`) : '',
                    elementIcon: entry.element ? ELEMENT_ICON(entry.element) : '',
                    traits: entry.traits.map((t) => i18n.localize(`BOILERPLATE.ThuatThucTrait.${t}`)).join(' · '),
                    summary, // cắt 3 dòng bằng CSS line-clamp
                    hasDetail: !!(entry.primaryEffect || entry.sincerityEffects?.length),
                    learned: learned.has(entry.id),
                    locked: this.mode === 'learn' && !isThuatThucUnlocked(this.actor, entry),
                    canAfford: currentXp >= entry.xpCost,
                };
            });

        return {
            mode: this.mode,
            isStarter: this.mode === 'starter',
            isLearn: this.mode === 'learn',
            isGM,
            currentXp,
            filters: this.filters,
            chips,
            levelOptions,
            levelSummary: levels.length ? levels.slice().sort().join(', ') : i18n.localize('BOILERPLATE.ThuatThuc.allLevelsShort'),
            levelMenuOpen: this.levelMenuOpen,
            showSecondRow: chips.element.length > 1 || (isGM && this.mode === 'learn'),
            cards,
            heading: this.#heading(),
            starterRemaining: getSectStarterRemaining(this.actor),
            starterTotal: SECT_STARTER_SLOTS,
        };
    }

    #heading() {
        const sect = this.#sect;
        const sectName = sect ? game.i18n.localize(sect.ten) : '';
        const sectLevel = this.actor.system.attributes?.level?.value ?? 1;
        const cats = (sect?.curriculum ?? [])
            .map((c) => game.i18n.localize(`BOILERPLATE.ThuatThucCategory.${c}`)).join(' · ');
        if (this.mode === 'starter') {
            return { title: 'Thuật Thức Nhập Môn', subtitle: `${sectName} · Chọn 1 Thuật Thức Cấp-1 từ Giáo Trình: ${cats}` };
        }
        if (this.mode === 'privilege') {
            return { title: `Đặc Quyền Bậc-${this.privilegeRef.bac}`, subtitle: `${sectName} · Thuật Thức ngoài Giáo Trình / vượt cấp` };
        }
        return {
            title: 'Tàng Kinh Các',
            subtitle: sect ? `${sectName} · Bậc ${sectLevel} · Giáo Trình: ${cats}` : 'Chưa gia nhập Hệ Phái',
        };
    }

    async _onRender(context, options) {
        await super._onRender(context, options);
        const search = this.element.querySelector('input[name="q"]');
        const showAll = this.element.querySelector('input[name="showAll"]');
        // Search lọc trực tiếp trên DOM → không re-render, không mất focus khi gõ
        search?.addEventListener('input', () => {
            this.filters.q = search.value;
            this.#applySearch();
        });
        showAll?.addEventListener('change', () => {
            this.filters.showAll = showAll.checked;
            this.render();
        });

        // Dropdown chọn nhiều cấp: giữ trạng thái mở qua re-render, đóng khi click ra ngoài
        const levelMenu = this.element.querySelector('.tt-select');
        levelMenu?.addEventListener('toggle', () => { this.levelMenuOpen = levelMenu.open; });
        levelMenu?.querySelectorAll('input[name="level"]').forEach((box) => {
            box.addEventListener('change', () => {
                const value = Number(box.value);
                const levels = this.filters.levels.filter((l) => l !== value);
                this.filters.levels = box.checked ? [...levels, value] : levels;
                this.render();
            });
        });
        this.#applySearch();
    }

    async _onFirstRender(context, options) {
        await super._onFirstRender(context, options);
        // this.element tồn tại suốt vòng đời app → gắn 1 lần
        this.element.addEventListener('pointerdown', (e) => {
            const menu = this.element.querySelector('.tt-select');
            if (menu?.open && !menu.contains(e.target)) menu.open = false;
        });
    }

    #applySearch() {
        const q = fold(this.filters.q ?? '');
        let visible = 0;
        for (const card of this.element.querySelectorAll('.tt-card')) {
            const hit = !q || card.dataset.search.includes(q);
            card.hidden = !hit;
            if (hit) visible += 1;
        }
        const empty = this.element.querySelector('.tt-picker__empty--search');
        if (empty) empty.hidden = visible > 0 || !q;
    }

    /* ── Actions ── */

    static _onClearLevels() {
        this.filters.levels = [];
        this.render();
    }

    static _onToggleFilter(event, target) {
        const { group, value } = target.dataset;
        this.filters[group] = String(this.filters[group]) === value ? '' : value;
        this.render();
    }

    static async _onLearnXp(event, target) {
        const ok = await learnThuatThucWithXp(this.actor, target.dataset.techniqueId);
        if (ok && this.mode === 'privilege') return this.close();
        this.render();
    }

    static async _onPickStarter(event, target) {
        const ok = await learnSectStarterTechnique(this.actor, target.dataset.techniqueId);
        if (ok) return this.close();
        this.render();
    }

    static async _onAddFree(event, target) {
        await learnThuatThuc(this.actor, target.dataset.techniqueId, 'manual');
        this.render();
    }
}
