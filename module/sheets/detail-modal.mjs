import { THUAT_THUC_BY_ID } from '../helpers/config/thuat-thuc.ts';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class DetailModal extends HandlebarsApplicationMixin(ApplicationV2) {

    static DEFAULT_OPTIONS = {
        id: 'hv-detail-modal',
        tag: 'section',
        classes: ['huyen-viet-vtt', 'detail-modal'],
        position: {
            width: 420,
            height: 750,
        },
        window: {
            resizable: false,
        },
    };

    static PARTS = {
        main: {
            template: 'systems/huyen-viet-vtt/templates/apps/detail-modal.hbs',
        },
    };

    constructor(item, options = {}) {
        super(options);
        this.item = item;
    }

    get title() {
        return 'Thông tin: ' + this.item.name;
    }

    static show(item) {
        return new this(item).render(true);
    }

    async _prepareContext(_options) {
        const item = this.item;
        switch (item.type) {
            case 'thuatThuc': return this._contextThuatThuc(item);
            case 'vuKhi':     return this._contextVuKhi(item);
            case 'giapTru':   return this._contextGiapTru(item);
            case 'trangBi':   return this._contextTrangBi(item);
            default:          return { type: 'unknown', name: item.name, img: item.img };
        }
    }

    _contextThuatThuc(item) {
        const s = item.system;
        const entry = THUAT_THUC_BY_ID[s.techniqueId];
        if (!entry) return { type: 'unknown', name: item.name, img: item.img };

        const loc = (key) => key ? game.i18n.localize(key) : null;

        const sincerityEffects = (entry.sincerityEffects ?? []).map(e => ({
            ...e,
            text: loc(e.text),
        }));

        const prereqElements = Object.entries(entry.prerequisites?.elements ?? {})
            .map(([key, value]) => ({ key, value }));
        const prereqSkills = Object.entries(entry.prerequisites?.skills ?? {})
            .map(([key, value]) => ({ key, value }));

        return {
            type: 'thuatThuc',
            name: loc(entry.name),
            img: entry.img,
            entry,
            traits: entry.traits ?? [],
            conditionText:   loc(entry.condition),
            skillCheckText:  loc(entry.skillCheck),
            difficultyText:  loc(entry.difficulty),
            rangeText:       loc(entry.range),
            durationText:    loc(entry.duration),
            costText:        loc(entry.cost),
            primaryEffectHtml: loc(entry.primaryEffect),
            descriptionText: loc(entry.description),
            sincerityEffects,
            prereqElements,
            prereqSkills,
            hasPrereqs: prereqElements.length > 0 || prereqSkills.length > 0,
            source: s.source,
            usesRemaining: s.usesRemaining,
        };
    }

    _contextVuKhi(item) {
        const s = item.system;
        return {
            type: 'vuKhi',
            name: item.name,
            img: s.img,
            flavorText: s.flavorText,
            weaponClass: s.weaponClass,
            baseDamage: s.baseDamage,
            effectiveDamage: s.effectiveDamage ?? s.baseDamage,
            range: s.range,
            condition: s.condition,
            isEquipped: s.isEquipped,
            isTwoHanded: s.isTwoHanded,
            traits: s.traits ?? [],
            passiveEffects: s.passiveEffects ?? [],
            twoHandedEffects: s.twoHandedEffects ?? [],
            description: s.description,
        };
    }

    _contextGiapTru(item) {
        const s = item.system;
        return {
            type: 'giapTru',
            name: item.name,
            img: s.img,
            flavorText: s.flavorText,
            baseResistance: s.baseResistance,
            resistance: s.resistance ?? s.baseResistance,
            condition: s.condition,
            isEquipped: s.isEquipped,
            traits: s.traits ?? [],
            passiveEffects: s.passiveEffects ?? [],
            description: s.description,
        };
    }

    _contextTrangBi(item) {
        const s = item.system;
        return {
            type: 'trangBi',
            name: item.name,
            img: item.img,
            flavorText: s.flavorText,
            quantity: s.quantity,
            isEquipped: s.isEquipped,
            passiveEffects: s.passiveEffects ?? [],
            description: s.description,
        };
    }
}
