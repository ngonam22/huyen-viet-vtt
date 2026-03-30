import BoilerplateItemBase from './base-item.mjs';

const intField = (initial = 0, min = 0) =>
    new foundry.data.fields.NumberField({
        required: true,
        nullable: false,
        integer: true,
        initial,
        min,
    });

/** Shared: array of UpgradeRule objects for passive stat mods */
const upgradeRuleArrayField = () => {
    const f = foundry.data.fields;
    return new f.ArrayField(
        new f.SchemaField({
            target: new f.StringField({ initial: 'ability' }),
            mode: new f.StringField({ initial: 'add' }),
            effects: new f.ArrayField(
                new f.SchemaField({
                    name: new f.StringField({ initial: '' }),
                    value: new f.NumberField({ required: true, nullable: false, initial: 0 }),
                })
            ),
            choose: new f.NumberField({ required: false, nullable: true, integer: true }),
        })
    );
};

/** Shared: array of display-only trait objects */
const traitArrayField = () => {
    const f = foundry.data.fields;
    return new f.ArrayField(
        new f.SchemaField({
            id:          new f.StringField({ initial: '' }),
            label:       new f.StringField({ initial: '' }),
            description: new f.StringField({ initial: '' }),   // free text
            category:    new f.StringField({ initial: 'utility' }), // "combat" | "utility" | "social"
        })
    );
};

export default class HvVuKhi extends BoilerplateItemBase {
    static LOCALIZATION_PREFIXES = [
        'BOILERPLATE.Item.base',
        'BOILERPLATE.Item.VuKhi',
    ];

    static defineSchema() {
        const f = foundry.data.fields;
        const schema = super.defineSchema();

        // ── UI display ──────────────────────────────────────────────────────
        schema.flavorText = new f.StringField({ initial: '' }); // short tagline shown under name

        // ── Core attributes ─────────────────────────────────────────────────
        schema.weaponClass = new f.StringField({ initial: 'melee' }); // "melee" | "ranged" | "unarmed"
        schema.baseDamage  = intField(3, 0);
        schema.range       = intField(1, 0);  // in "bộ"

        // ── Durability ──────────────────────────────────────────────────────
        // normal → hu-hai (damaged, -2 damage) → vo-nat (broken, unusable)
        schema.condition = new f.StringField({ initial: 'normal' });

        // ── Equipped state ──────────────────────────────────────────────────
        schema.isEquipped  = new f.BooleanField({ initial: false });
        schema.isTwoHanded = new f.BooleanField({ initial: false });

        // ── Passive stat mods ────────────────────────────────────────────────
        // Applied to character while equipped (one-handed).
        // target: "ability" only — weapons cannot modify other items' stats.
        schema.passiveEffects = upgradeRuleArrayField();

        // Applied additionally when isTwoHanded = true.
        // target: "damage" adds to this weapon's own baseDamage at combat time.
        // Empty array = weapon cannot be used two-handed.
        schema.twoHandedEffects = upgradeRuleArrayField();

        // ── Display-only traits ──────────────────────────────────────────────
        // Rendered in the sheet as descriptive text. No mechanical processing.
        schema.traits = traitArrayField();

        return schema;
    }

    prepareDerivedData() {
        // Effective damage accounts for condition degradation
        switch (this.condition) {
            case 'hu-hai':
                this.effectiveDamage = Math.max(0, this.baseDamage - 2);
                break;
            case 'vo-nat':
                this.effectiveDamage = 0;
                break;
            default:
                this.effectiveDamage = this.baseDamage;
        }
    }
}
