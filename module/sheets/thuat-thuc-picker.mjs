import {
    THUAT_THUC,
    THUAT_THUC_CATEGORIES,
    ELEMENT_KEYS,
} from '../helpers/config.ts';
import { learnThuatThuc, isThuatThucUnlocked } from '../helpers/thuatThuc.ts';
import { learnThuatThucWithXp } from '../helpers/progression.ts';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * Thuật Thức picker — see specs/spec_thuat_thuc.md §9.4.
 * Lists catalog entries unlocked by the actor's Hệ Phái (Giáo Trình + Đặc Quyền);
 * "Học" spends Tu Vi (source='xp'). GM may show all and add free (source='manual').
 */
export class ThuatThucPicker extends HandlebarsApplicationMixin(ApplicationV2) {
    static DEFAULT_OPTIONS = {
        id: 'hv-thuat-thuc-picker',
        tag: 'section',
        classes: ['huyen-viet-vtt', 'hv-thuat-thuc-picker'],
        position: {
            width: 560,
            height: 'auto',
        },
        window: {
            resizable: true,
        },
    };

    static PARTS = {
        main: {
            template: 'systems/huyen-viet-vtt/templates/apps/thuat-thuc-picker.hbs',
        },
    };

    constructor(actor, options = {}) {
        super(options);
        this.actor = actor;
        this.filters = {
            q: '',
            category: '',
            level: '',
            element: '',
            showAll: false,
        };
    }

    get title() {
        return `Thuật Thức — ${this.actor.name}`;
    }

    static show(actor) {
        return new this(actor).render(true);
    }

    async _prepareContext(_options) {
        const levels = [1, 2, 3, 4, 5, 6];

        const q = this.filters.q?.toLowerCase() ?? '';
        const isGM = game.user.isGM;
        const learned = new Set(
            this.actor.items.filter((i) => i.type === 'thuatThuc').map((i) => i.system.techniqueId)
        );
        const filtered = THUAT_THUC.filter((entry) => {
            if (!(isGM && this.filters.showAll) && !isThuatThucUnlocked(this.actor, entry)) return false;
            if (this.filters.category && entry.category !== this.filters.category) return false;
            if (this.filters.level && entry.level !== Number(this.filters.level)) return false;
            if (this.filters.element && entry.element !== this.filters.element) return false;
            if (q) {
                const name = game.i18n.localize(entry.name).toLowerCase();
                if (!name.includes(q) && !entry.id.toLowerCase().includes(q)) return false;
            }
            return true;
        });

        const actorElements = this.actor.system?.elements ?? {};
        const actorSkills = this.actor.system?.skills ?? {};

        const results = filtered.map((entry) => {
            let prereqWarning = false;
            const pre = entry.prerequisites;
            if (pre?.elements) {
                for (const [k, v] of Object.entries(pre.elements)) {
                    if ((actorElements[k]?.value ?? 0) < v) { prereqWarning = true; break; }
                }
            }
            if (!prereqWarning && pre?.skills) {
                for (const [k, v] of Object.entries(pre.skills)) {
                    if ((actorSkills[k] ?? 0) < v) { prereqWarning = true; break; }
                }
            }
            return {
                entry,
                prereqWarning,
                locked: !isThuatThucUnlocked(this.actor, entry),
                learned: learned.has(entry.id),
            };
        });

        return {
            filters: this.filters,
            categories: THUAT_THUC_CATEGORIES,
            levels,
            elements: ELEMENT_KEYS,
            results,
            isGM,
            currentXp: this.actor.system?.progression?.currentXp ?? 0,
        };
    }

    async _onRender(_context, _options) {
        await super._onRender(_context, _options);

        const el = this.element;

        for (const name of ['q', 'category', 'level', 'element', 'showAll']) {
            const input = el.querySelector(`[name="${name}"]`);
            if (!input) continue;
            const evt = input.tagName === 'SELECT' || input.type === 'checkbox' ? 'change' : 'input';
            input.addEventListener(evt, () => {
                this.filters[name] = input.type === 'checkbox' ? input.checked : input.value;
                this.render();
            });
        }

        el.querySelectorAll('[data-action="pickThuatThuc"]').forEach((btn) => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                const id = btn.dataset.techniqueId;
                if (!id) return;
                await learnThuatThuc(this.actor, id, 'manual');
                this.render();
            });
        });

        el.querySelectorAll('[data-action="learnThuatThucXp"]').forEach((btn) => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                const id = btn.dataset.techniqueId;
                if (!id) return;
                await learnThuatThucWithXp(this.actor, id);
                this.render();
            });
        });
    }
}
