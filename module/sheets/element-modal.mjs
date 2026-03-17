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

    async _prepareContext(_options) {
        return {
            hello: 'THERE in CONTEXT'
        }
    }
}
