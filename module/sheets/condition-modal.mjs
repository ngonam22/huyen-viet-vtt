import {
    CONDITIONS,
    ELEMENTS_FOR_WOUND,
    getActiveConditions,
    getWoundedElements,
    toggleCondition,
    toggleElementWound,
} from '../helpers/conditions.ts';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class ConditionModal extends HandlebarsApplicationMixin(ApplicationV2) {

    static DEFAULT_OPTIONS = {
        id: 'hv-condition-modal',
        tag: 'section',
        classes: ['huyen-viet-vtt', 'hv-cond-modal'],
        position: {
            width: 460,
            height: 'auto',
        },
        window: {
            resizable: false,
        },
    };

    static PARTS = {
        main: {
            template: 'systems/huyen-viet-vtt/templates/apps/condition-modal.hbs',
        },
    };

    constructor(actor, options = {}) {
        super(options);
        this.actor = actor;
    }

    get title() {
        return `Hiệu Ứng — ${this.actor.name}`;
    }

    static show(actor) {
        return new this(actor).render(true);
    }

    async _prepareContext(_options) {
        const activeConditions = getActiveConditions(this.actor);
        const woundedElements = getWoundedElements(this.actor);

        const conditions = CONDITIONS.map(c => ({
            ...c,
            isActive: activeConditions.has(c.id),
            // tonThuongNguHanh gets an inline element picker; others get null
            elements: c.id === 'tonThuongNguHanh'
                ? ELEMENTS_FOR_WOUND.map(e => ({ ...e, isWounded: woundedElements.has(e.id) }))
                : null,
        }));

        return { conditions };
    }

    async _onRender(_context, _options) {
        await super._onRender(_context, _options);

        const el = this.element;

        // Double-click on a card header → toggle that condition on/off
        el.querySelectorAll('.hv-cond-card__header[data-condition-id]').forEach(header => {
            header.addEventListener('dblclick', async (e) => {
                e.preventDefault();
                const conditionId = header.dataset.conditionId;
                if (conditionId) {
                    await toggleCondition(this.actor, conditionId);
                    this.render();
                }
            });
        });

        // Double-click on an element button → toggle that elemental wound
        el.querySelectorAll('.hv-cond-elem-btn[data-element-id]').forEach(btn => {
            btn.addEventListener('dblclick', async (e) => {
                e.preventDefault();
                const elementId = btn.dataset.elementId;
                if (elementId) {
                    await toggleElementWound(this.actor, elementId);
                    this.render();
                }
            });
        });
    }
}
