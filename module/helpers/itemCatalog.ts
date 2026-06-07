import itemsConfig from '../../lib/items-config.json';
import traitsConfig from '../../lib/traits-config.json';

// ── Types ─────────────────────────────────────────────────────────────────────

interface UpgradeRuleEntry {
    target: string;
    mode: string;
    effects: { name: string; value: number }[];
    choose?: number;
}

export interface TraitEntry {
    id: string;
    label: string;
    category: string;
    description: string;
}

interface TraitRef {
    id: string;
    label?: string;
    description?: string;
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

// ── Trait resolution ───────────────────────────────────────────────────────────

const traitDefaults = new Map<string, TraitEntry>(
    (traitsConfig.traits as TraitEntry[]).map((t) => [t.id, t])
);

export function resolveTraits(refs: TraitRef[]): TraitEntry[] {
    return refs.map((ref) => {
        const base = traitDefaults.get(ref.id);
        if (!base) throw new Error(`Unknown trait id: "${ref.id}"`);
        return { ...base, ...ref } as TraitEntry;
    });
}

// ── Lookup helpers ─────────────────────────────────────────────────────────────

export function getWeaponById(id: string): WeaponEntry | undefined {
    const raw = (itemsConfig.weapons as (Omit<WeaponEntry, 'traits'> & { traits: TraitRef[] })[]).find((w) => w.id === id);
    if (!raw) return undefined;
    return { ...raw, traits: resolveTraits(raw.traits) };
}

export function getArmorById(id: string): ArmorEntry | undefined {
    const raw = (itemsConfig.armor as (Omit<ArmorEntry, 'traits'> & { traits: TraitRef[] })[]).find((a) => a.id === id);
    if (!raw) return undefined;
    return { ...raw, traits: resolveTraits(raw.traits) };
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
