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

/**
 * General accessory / tool item (Trang Bị / Phòng Cụ).
 * Simpler than weapons/armor — no damage or resistance, just optional passive effects.
 */
export default class HvTrangBi extends BoilerplateItemBase {
    static LOCALIZATION_PREFIXES = [
        'BOILERPLATE.Item.base',
        'BOILERPLATE.Item.TrangBi',
    ];

    static defineSchema() {
        const f = foundry.data.fields;
        const schema = super.defineSchema();

        // Short tagline shown under the item name in the sheet (flavour only, not a game rule).
        schema.flavorText = new f.StringField({ initial: '' });

        // How many of this item the actor is carrying.
        // Minimum 1 — if the player drops all copies, delete the item instead.
        schema.quantity = intField(1, 1);

        // Whether the item is currently worn/held and contributing its passiveEffects.
        // When false the item sits in inventory and has zero mechanical effect.
        // Toggled by the player from the character sheet inventory tab.
        schema.isEquipped = new f.BooleanField({ initial: false });

        // Stat modifiers applied to the character while isEquipped === true.
        // Processed by applyEquippedItemEffects() in actor.ts every prepareDerivedData() call.
        // Only target:"ability" rules are applied here (element/skill targets are not supported
        // for equipment — those are locked to Thị Tộc / Bối Cảnh / Gia Cảnh items).
        // target:"damage" is intentionally absent — trangBi never affects combat damage.
        schema.passiveEffects = upgradeRuleArrayField();

        return schema;
    }
}
