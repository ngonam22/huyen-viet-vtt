import { applyNextElementalWound } from '../helpers/conditions.js';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class ResourceModal extends HandlebarsApplicationMixin(ApplicationV2) {
    static DEFAULT_OPTIONS = {
        id: "hv-resource-modal",
        tag: "section",
        classes: ["huyen-viet-vtt", "resource-modal"],
        position: {
            width: 300,
            height: "auto",
        },
        window: {
            resizable: false,
        },
    };

    static PARTS = {
        main: {
            template: "systems/huyen-viet-vtt/templates/apps/resource-modal.hbs",
        },
    };

    /**
     * @param {Actor} actor
     * @param {'sucLuc'|'tamLuc'} type
     */
    constructor(actor, type, options = {}) {
        super(options);
        this.actor = actor;
        this.type = type;
        this._amount = 1;
        this._damageElement = false;
    }

    get title() {
        return this.type === 'sucLuc' ? 'Quản Lý Sức Lực' : 'Quản Lý Tâm Lực';
    }

    static show(actor, type) {
        return new this(actor, type).render(true);
    }

    async _prepareContext(_options) {
        const sl = this.actor.system.abilities.sucLuc;
        const tl = this.actor.system.abilities.tamLuc;
        const ability = this.actor.system.abilities[this.type];
        return {
            type: this.type,
            isSucLuc: this.type === 'sucLuc',
            isTamLuc: this.type === 'tamLuc',
            label: this.type === 'sucLuc' ? 'Sức Lực' : 'Tâm Lực',
            current: ability.value,
            base: ability.base,
            amount: this._amount,
            damageElement: this._damageElement,
            sucLuc: { current: sl.value, base: sl.base },
            tamLuc: { current: tl.value, base: tl.base },
        };
    }

    async _onRender(context, options) {
        await super._onRender(context, options);

        const input  = this.element.querySelector('.hv-resource-amount');
        const slider = this.element.querySelector('.hv-resource-slider');
        const drum   = this.element.querySelector('.hv-resource-slider__drum');
        const items  = this.element.querySelectorAll('.hv-resource-slider__item');
        if (!input || !slider || !drum || !items.length) return;

        const MIN    = 1;
        const MAX    = 50;
        const ITEM_H = 38; // px — must match SCSS &__item height

        let _prevVal    = this._amount;
        let _animFrame  = null;

        const renderDrum = (val) => {
            items.forEach(item => {
                const offset = parseInt(item.dataset.offset);
                const v = val + offset;
                item.textContent = (v >= MIN && v <= MAX) ? String(v) : '';
            });
        };

        const updateSlider = (val) => {
            const delta = val - _prevVal;
            _prevVal        = val;
            this._amount    = val;
            input.value     = val;
            slider.dataset.value = val;
            slider.setAttribute('aria-valuenow', val);

            // Cancel any in-flight animation
            if (_animFrame !== null) {
                cancelAnimationFrame(_animFrame);
                _animFrame = null;
                drum.style.transition = 'none';
            }

            renderDrum(val);

            if (delta !== 0 && Math.abs(delta) === 1) {
                // Snap to old-value position, then animate to centre
                drum.style.transition = 'none';
                drum.style.transform  = `translateY(calc(-50% + ${delta * ITEM_H}px))`;

                _animFrame = requestAnimationFrame(() => {
                    drum.style.transition = 'transform 0.18s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    drum.style.transform  = 'translateY(-50%)';
                    _animFrame = null;
                });
            } else {
                drum.style.transition = 'none';
                drum.style.transform  = 'translateY(-50%)';
            }
        };

        // Initialise without animation
        updateSlider(this._amount);

        // Arrow buttons
        this.element.querySelector('.hv-resource-slider__arrow--up')
            ?.addEventListener('click', () => updateSlider(Math.min(this._amount + 1, MAX)));
        this.element.querySelector('.hv-resource-slider__arrow--down')
            ?.addEventListener('click', () => updateSlider(Math.max(this._amount - 1, MIN)));

        // Mouse wheel on the viewport — scroll up increases, scroll down decreases
        slider.addEventListener('wheel', (e) => {
            e.preventDefault();
            const dir = e.deltaY < 0 ? 1 : -1;
            updateSlider(Math.min(Math.max(this._amount + dir, MIN), MAX));
        }, { passive: false });

        // Keyboard when focused
        slider.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
                e.preventDefault();
                updateSlider(Math.min(this._amount + 1, MAX));
            } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
                e.preventDefault();
                updateSlider(Math.max(this._amount - 1, MIN));
            }
        });

        // Number input stays in sync
        input.addEventListener('input', (e) => {
            const val = Math.min(Math.max(parseInt(e.target.value) || MIN, MIN), MAX);
            updateSlider(val);
        });

        // Elemental wound checkbox
        const cbEl = this.element.querySelector('.hv-element-damage-toggle');
        if (cbEl) {
            cbEl.addEventListener('change', () => {
                this._damageElement = cbEl.checked;
            });
        }
    }

    async _onClickAction(event, target) {
        const action = target.dataset.action;

        // Tab switching — change active resource type and re-render
        if (action === 'switch-resource') {
            const newType = target.dataset.tab;
            if (newType && newType !== this.type) {
                this.type           = newType;
                this._amount        = 1;
                this._damageElement = false;
                this.render();
            }
            return;
        }

        if (action !== 'heal' && action !== 'damage') return;

        const ability  = this.actor.system.abilities[this.type];
        const newValue = action === 'heal'
            ? Math.min(ability.value + this._amount, ability.base)
            : Math.max(ability.value - this._amount, 0);

        await this.actor.update({
            [`system.abilities.${this.type}.value`]: newValue,
        });

        if (action === 'damage' && this._damageElement && this.type === 'sucLuc') {
            await applyNextElementalWound(this.actor);
        }

        this.render();
    }
}
