import BoilerplateItemBase from './base-item.mjs';

/**
 * Thuật Thức (Technique / Spell) — per-instance state on an actor.
 * Display data lives in the THUAT_THUC catalog (config.ts) and is looked up
 * via techniqueId. See specs/spec_thuat_thuc.md §5–§6.
 */
export default class HvThuatThuc extends BoilerplateItemBase {
    static LOCALIZATION_PREFIXES = [
        'BOILERPLATE.Item.base',
        'BOILERPLATE.Item.ThuatThuc',
    ];

    static defineSchema() {
        const f = foundry.data.fields;
        const schema = super.defineSchema();

        schema.techniqueId = new f.StringField({
            required: true,
            blank: false,
            initial: '',
        });

        schema.source = new f.StringField({
            required: true,
            choices: ['clan', 'xp', 'manual'],
            initial: 'manual',
        });

        schema.usesRemaining = new f.NumberField({
            required: true,
            nullable: false,
            integer: true,
            initial: 1,
            min: 0,
        });

        schema.lastResetAt = new f.NumberField({
            required: false,
            nullable: true,
            integer: true,
            initial: null,
        });

        schema.notes = new f.HTMLField({ initial: '' });

        return schema;
    }
}
