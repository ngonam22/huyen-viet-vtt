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
    }

    get title() {
        return this.type === 'sucLuc' ? 'Quản Lý Sức Lực' : 'Quản Lý Tâm Lực';
    }

    static show(actor, type) {
        return new this(actor, type).render(true);
    }

    async _prepareContext(_options) {
        const ability = this.actor.system.abilities[this.type];
        return {
            type: this.type,
            label: this.type === 'sucLuc' ? 'Sức Lực' : 'Tâm Lực',
            current: ability.value,
            base: ability.base,
            amount: this._amount,
        };
    }

    async _onRender(context, options) {
        await super._onRender(context, options);

        const input = this.element.querySelector('.hv-resource-amount');
        const slider = this.element.querySelector('.hv-resource-slider');
        if (!input || !slider) return;

        const MIN = 1;
        const MAX = 50;

        const updateSlider = (val) => {
            this._amount = val;
            input.value = val;
            slider.dataset.value = val;
            slider.setAttribute('aria-valuenow', val);
            slider.querySelector('.hv-resource-slider__val').textContent = val;

            const pct = (val - MIN) / (MAX - MIN); // 0 = bottom, 1 = top
            const fill = slider.querySelector('.hv-resource-slider__fill');
            const thumb = slider.querySelector('.hv-resource-slider__thumb');
            fill.style.height = `${pct * 100}%`;
            thumb.style.bottom = `${pct * 100}%`;
        };

        // initialize visual position
        updateSlider(this._amount);

        // mouse wheel — scroll up increases, scroll down decreases
        slider.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY < 0 ? 1 : -1;
            const newVal = Math.min(Math.max(this._amount + delta, MIN), MAX);
            updateSlider(newVal);
        }, { passive: false });

        // keyboard support when focused: arrow up/down
        slider.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
                e.preventDefault();
                updateSlider(Math.min(this._amount + 1, MAX));
            } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
                e.preventDefault();
                updateSlider(Math.max(this._amount - 1, MIN));
            }
        });

        // number input stays in sync
        input.addEventListener('input', (e) => {
            const val = Math.min(Math.max(parseInt(e.target.value) || MIN, MIN), MAX);
            updateSlider(val);
        });
    }

    async _onClickAction(event, target) {
        const action = target.dataset.action;
        if (action !== 'heal' && action !== 'damage') return;

        const ability = this.actor.system.abilities[this.type];
        const newValue = action === 'heal'
            ? Math.min(ability.value + this._amount, ability.base)
            : Math.max(ability.value - this._amount, 0);

        await this.actor.update({
            [`system.abilities.${this.type}.value`]: newValue,
        });

        this.render();
    }
}
