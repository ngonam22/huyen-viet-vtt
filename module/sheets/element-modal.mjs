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

    constructor(actor, elementKey = null, options = {}) {
        super(options);

        this.actor = actor;
        // this.elementKey = elementKey ?? getActorCurrentElement(actor) ?? "kim";
        this.elementKey = "kim"
    }

    static show(actor, elementKey = null) {
        return new this(actor, elementKey).render(true);
    }

    async _onRender(_context, _options) {
        await super._onRender(_context, _options);

        const el = this.element;
        const $tablets = el.querySelectorAll('.elemental-tablet')
        $tablets.forEach(btn => {
            btn.addEventListener('click', () => {

                if (btn.classList.contains('is-active')) {
                    btn.classList.remove('is-active');
                    return;
                }

                $tablets.forEach(b => b.classList.remove('is-active'));
                btn.classList.add('is-active');
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

        if (action === 'test-dsn') {
            // event.preventDefault()
            await this.actor.testDiceSoNice(4);
            return
        }
    }
}
