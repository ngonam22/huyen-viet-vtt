import itemsConfig from '../../lib/items-config.json';

// ── Types ─────────────────────────────────────────────────────────────────────

interface UpgradeRuleEntry {
    target: string;
    mode: string;
    effects: { name: string; value: number }[];
    choose?: number;
}

interface TraitEntry {
    id: string;
    label: string;
    category: string;
    description: string;
}

export interface WeaponEntry {
    id: string;
    name: string;
    description: string;
    flavorText: string;
    weaponClass: 'melee' | 'ranged' | 'unarmed';
    baseDamage: number;
    range: number;
    condition: string;
    isTwoHanded: boolean;
    passiveEffects: UpgradeRuleEntry[];
    twoHandedEffects: UpgradeRuleEntry[];
    traits: TraitEntry[];
}

export interface ArmorEntry {
    id: string;
    name: string;
    description: string;
    flavorText: string;
    baseResistance: number;
    condition: string;
    passiveEffects: UpgradeRuleEntry[];
    traits: TraitEntry[];
}

export interface AccessoryEntry {
    id: string;
    name: string;
    description: string;
    flavorText: string;
    quantity: number;
    passiveEffects: UpgradeRuleEntry[];
}

// ── Lookup helpers ─────────────────────────────────────────────────────────────

export function getWeaponById(id: string): WeaponEntry | undefined {
    return (itemsConfig.weapons as WeaponEntry[]).find((w) => w.id === id);
}

export function getArmorById(id: string): ArmorEntry | undefined {
    return (itemsConfig.armor as ArmorEntry[]).find((a) => a.id === id);
}

export function getAccessoryById(id: string): AccessoryEntry | undefined {
    return (itemsConfig.accessories as AccessoryEntry[]).find((a) => a.id === id);
}

// ── Add-to-inventory helpers ───────────────────────────────────────────────────

/**
 * Add a weapon from the catalog to an actor's inventory (unequipped).
 */
export async function addWeaponToActor(actor: Actor, weaponId: string): Promise<void> {
    const weapon = getWeaponById(weaponId);
    if (!weapon) throw new Error(`Weapon "${weaponId}" not found in catalog`);

    const { id: _id, name, ...system } = weapon;
    await actor.createEmbeddedDocuments('Item', [{
        name,
        type: 'vuKhi',
        system: {
            ...system,
            isEquipped: false,
        }
    }]);
}

/**
 * Add an armor from the catalog to an actor's inventory (unequipped).
 */
export async function addArmorToActor(actor: Actor, armorId: string): Promise<void> {
    const armor = getArmorById(armorId);
    if (!armor) throw new Error(`Armor "${armorId}" not found in catalog`);

    const { id: _id, name, ...system } = armor;
    await actor.createEmbeddedDocuments('Item', [{
        name,
        type: 'giapTru',
        system: {
            ...system,
            isEquipped: false,
        }
    }]);
}

/**
 * Add an accessory from the catalog to an actor's inventory (unequipped).
 */
export async function addAccessoryToActor(actor: Actor, accessoryId: string): Promise<void> {
    const acc = getAccessoryById(accessoryId);
    if (!acc) throw new Error(`Accessory "${accessoryId}" not found in catalog`);

    const { id: _id, name, ...system } = acc;
    await actor.createEmbeddedDocuments('Item', [{
        name,
        type: 'trangBi',
        system: {
            ...system,
            isEquipped: false,
        }
    }]);
}
