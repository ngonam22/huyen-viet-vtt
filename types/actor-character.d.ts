import { NguHanh } from "./nguHanh";
import { AppliedUpgrade } from "./upgrade";

export interface CharacterIdentity {
    giaToc: string;
    monPhai: string;
    thiToc: string;
    ngheNghiep: string;
    tinhCach: string;
}

export interface CharacterSkills {
    // Hoc Dao Skills
    chinhTri: number;
    khoaHoc: number;
    thanHoc: number;
    xaHoi: number;
    yHoc: number;

    // Nghe Dao Skills
    myThuat: number;
    vanTu: number;
    thoiTrang: number;
    chienCu: number;

    // Sinh Dao Skills
    laoDong: number;
    thuongNghiep: number;
    haiNghiep: number;
    hacNghiep: number;
    sinhTon: number;

    // Tam Dao Skills
    lanhDao: number;
    leDao: number;
    bieuDien: number;
    tamY: number;

    // Vo Dao Skills
    theThuat: number;
    voThuat: number;
    binhPhap: number;
    thienDinh: number;
}

export interface CharacterAbilities {
    sucLuc: { base: number; value: number };
    tamLuc: { base: number; value: number };
    canhGiac: { value: number };
    chuTam: { value: number };
    tocDo: { value: number };
    nguHop: { value: number };
    khangLuc: { value: number };
}

export interface CharacterAttributes {
    level: { value: number };
}

export interface CharacterProgression {
    /** Spendable XP — decreases on upgrade */
    currentXp: number;
    /** Cumulative XP — never decreases; drives Đặc Kỹ Môn Phái auto-leveling */
    totalXp: number;
}

export type ChangelogEventType =
    | "element_upgrade"
    | "skill_upgrade"
    | "technique_learned"
    | "xp_gain"
    | "identity_change";

export interface ChangelogEntry {
    id: string;
    type: ChangelogEventType;
    timestamp: number;
    /** Human-readable label for UI, e.g. "Hỏa: 2 → 3" */
    label: string;
    /** Dot-path of the changed field, e.g. "elements.hoa", "identity.monPhai" */
    field: string;
    from: unknown;
    to: unknown;
    /** 0 for non-XP events (xp_gain, identity_change) */
    xpCost: number;
}

export interface CharacterSchema {
    identity: CharacterIdentity;
    elements: NguHanh;
    skills: CharacterSkills;
    abilities: CharacterAbilities;
    attributes: CharacterAttributes;
    progression: CharacterProgression;
    /** XP-purchased modifiers consumed by recalculateCharacterStats() */
    upgrades: AppliedUpgrade[];
    /** Append-only event log for UI timeline */
    changelog: ChangelogEntry[];
}
