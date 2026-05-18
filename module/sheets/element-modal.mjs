import { ELEMENTS } from '../helpers/config'

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class ElementModal extends HandlebarsApplicationMixin(ApplicationV2)
{
    static DEFAULT_OPTIONS = {
        id: "hv-element-modal",
        tag: "section",
        classes: ["huyen-viet-vtt", "element-modal"],
        position: {
            width: 520,
            height: "auto",
        },
        window: {
            title: "Bảng Tung Xúc Xắc",
            resizable: true,
        },
    };

    static PARTS = {
        main: {
            template: "systems/huyen-viet-vtt/templates/apps/element-modal.hbs",
        },
    };

    constructor(actor, skillKey = null, options = {}) {
        super(options);

        this.actor = actor;
        this.skillKey = skillKey;
        this._selectedElement = "kim";
        this._rollMode = game.settings?.get("core", "rollMode") ?? "publicroll";
    }

    static show(actor, skillKey = null) {
        return new this(actor, skillKey).render(true);
    }

    async _onRender(_context, _options) {
        await super._onRender(_context, _options);

        const el = this.element;

        // Element tablet selection
        const $tablets = el.querySelectorAll('.elemental-tablet');
        $tablets.forEach(btn => {
            if (btn.dataset.elementKey === this._selectedElement) {
                btn.classList.add('is-active');
            }
            btn.addEventListener('click', () => {
                if (btn.classList.contains('is-active')) {
                    btn.classList.remove('is-active');
                    this._selectedElement = null;
                    return;
                }
                $tablets.forEach(b => b.classList.remove('is-active'));
                btn.classList.add('is-active');
                this._selectedElement = btn.dataset.elementKey;
            });
        });

        // Roll mode selection
        const $rollModeBtns = el.querySelectorAll('.roll-mode-btn');
        $rollModeBtns.forEach(btn => {
            if (btn.dataset.rollMode === this._rollMode) {
                btn.classList.add('is-active');
            }
            btn.addEventListener('click', () => {
                $rollModeBtns.forEach(b => b.classList.remove('is-active'));
                btn.classList.add('is-active');
                this._rollMode = btn.dataset.rollMode;
            });
        });
    }

    async _prepareContext(_options) {
        return {
            system: this.actor.system,
        }
    }

    async _onClickAction(event, target) {
        const action = target.dataset.action;

        if (action === 'roll-dice') {
            const skillValue = this.skillKey
                ? (this.actor.system.skills[this.skillKey] ?? 0)
                : 0;
            const elementValue = this._selectedElement
                ? (this.actor.system.elements[this._selectedElement]?.value ?? 0)
                : 0;
            const numDice = Math.max(1, skillValue + elementValue);

            await this.actor.testDiceSoNice(numDice, this._rollMode);
            this.close();
        }
    }
}
