import { UpgradeRule } from './upgrade';

export type WeaponClass = 'melee' | 'ranged' | 'unarmed';
export type EquipmentCondition = 'normal' | 'hu-hai' | 'vo-nat';
export type TraitCategory = 'combat' | 'utility' | 'social';

/** Display-only trait entry — rendered as text, no mechanical processing */
export interface EquipmentTrait {
    id: string;
    label: string;
    description: string;   // free text set by GM
    category: TraitCategory;
}

/**
 * Weapon (Vũ Khí) system data.
 * passiveEffects  — target: "ability" only, applied to character while equipped
 * twoHandedEffects — target: "damage" to modify this weapon's own baseDamage at combat time;
 *                    empty = weapon cannot be used two-handed
 */
export interface VuKhiSchema {
    flavorText: string;
    weaponClass: WeaponClass;
    baseDamage: number;
    effectiveDamage: number;   // computed: baseDamage adjusted for condition
    range: number;             // in "bộ"
    condition: EquipmentCondition;
    isEquipped: boolean;
    isTwoHanded: boolean;
    passiveEffects: UpgradeRule[];
    twoHandedEffects: UpgradeRule[];
    traits: EquipmentTrait[];
}

/**
 * Armor (Giáp Trụ) system data.
 * passiveEffects — target: "ability" only, applied to character while equipped
 */
export interface GiapTruSchema {
    flavorText: string;
    baseResistance: number;
    resistance: number;        // computed: baseResistance adjusted for condition
    condition: EquipmentCondition;
    isEquipped: boolean;
    passiveEffects: UpgradeRule[];
    traits: EquipmentTrait[];
}
