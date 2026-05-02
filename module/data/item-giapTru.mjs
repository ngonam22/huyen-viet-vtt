import BoilerplateItemBase from './base-item.mjs';

const intField = (initial = 0, min = 0) =>
    new foundry.data.fields.NumberField({
        required: true,
        nullable: false,
        integer: true,
        initial,
        min,
    });

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

const traitArrayField = () => {
    const f = foundry.data.fields;
    return new f.ArrayField(
        new f.SchemaField({
            id:          new f.StringField({ initial: '' }),
            label:       new f.StringField({ initial: '' }),
            description: new f.StringField({ initial: '' }),
            category:    new f.StringField({ initial: 'utility' }),
        })
    );
};

export default class HvGiapTru extends BoilerplateItemBase {
    static LOCALIZATION_PREFIXES = [
        'BOILERPLATE.Item.base',
        'BOILERPLATE.Item.GiapTru',
    ];

    static defineSchema() {
        const f = foundry.data.fields;
        const schema = super.defineSchema();

        // ── UI display ──────────────────────────────────────────────────────
        schema.flavorText = new f.StringField({ initial: '' });
        schema.img = new f.StringField({ initial: '' });

        // ── Core attribute ───────────────────────────────────────────────────
        // baseResistance is stored permanently and never changes.
        // resistance is computed from baseResistance + condition (see prepareDerivedData).
        schema.baseResistance = intField(0, 0);

        // ── Durability ──────────────────────────────────────────────────────
        // normal → hu-hai (-2 resistance) → vo-nat (resistance = 0)
        schema.condition = new f.StringField({ initial: 'normal' });

        // ── Equipped state ──────────────────────────────────────────────────
        schema.isEquipped = new f.BooleanField({ initial: false });

        // ── Passive stat mods ────────────────────────────────────────────────
        // Applied to character while equipped.
        // target: "ability" only — armor cannot modify other items' stats.
        schema.passiveEffects = upgradeRuleArrayField();

        // ── Display-only traits ──────────────────────────────────────────────
        schema.traits = traitArrayField();

        return schema;
    }

    prepareDerivedData() {
        // Effective resistance degrades with condition
        switch (this.condition) {
            case 'hu-hai':
                this.resistance = Math.max(0, this.baseResistance - 2);
                break;
            case 'vo-nat':
                this.resistance = 0;
                break;
            default:
                this.resistance = this.baseResistance;
        }
    }
}
