/**
 * Base configuration — core types, keys, type guards, and ELEMENTS.
 */

export const BOILERPLATE: any = {};

export const ELEMENT_KEYS = ["hoa", "tho", "kim", "thuy", "moc"] as const;
export type HvElementKey = (typeof ELEMENT_KEYS)[number];

export const SKILL_KEYS = [
    "chinhTri",
    "khoaHoc",
    "thanHoc",
    "xaHoi",
    "yHoc",

    "myThuat",
    "vanTu",
    "thoiTrang",
    "chienCu",

    "laoDong",
    "thuongNghiep",
    "haiNghiep",
    "hacNghiep",
    "sinhTon",

    "lanhDao",
    "leDao",
    "bieuDien",
    "tamY",

    "theThuat",
    "voThuat",
    "binhPhap",
    "thienDinh"
] as const;
export type HvSkillKey = (typeof SKILL_KEYS)[number];
export const SKILLS: Record<HvSkillKey, {}>= {
    "chinhTri": {
        ten: 'BOILERPLATE.Skills.chinhTri.label',
        description: 'BOILERPLATE.Skills.chinhTri.label',
    },
    "khoaHoc": {
        ten: 'BOILERPLATE.Skills.khoaHoc.label',
        description: 'BOILERPLATE.Skills.khoaHoc.label',
    },
    "thanHoc": {
        ten: 'BOILERPLATE.Skills.thanHoc.label',
        description: 'BOILERPLATE.Skills.thanHoc.label',
    },
    "xaHoi": {
        ten: 'BOILERPLATE.Skills.xaHoi.label',
        description: 'BOILERPLATE.Skills.xaHoi.label',
    },
    "yHoc": {
        ten: 'BOILERPLATE.Skills.yHoc.label',
        description: 'BOILERPLATE.Skills.yHoc.label',
    },

    "myThuat": {
        ten: 'BOILERPLATE.Skills.myThuat.label',
        description: 'BOILERPLATE.Skills.myThuat.label',
    },
    "vanTu": {
        ten: 'BOILERPLATE.Skills.vanTu.label',
        description: 'BOILERPLATE.Skills.vanTu.label',
    },
    "thoiTrang": {
        ten: 'BOILERPLATE.Skills.thoiTrang.label',
        description: 'BOILERPLATE.Skills.thoiTrang.label',
    },
    "chienCu": {
        ten: 'BOILERPLATE.Skills.chienCu.label',
        description: 'BOILERPLATE.Skills.chienCu.label',
    },

    "laoDong": {
        ten: 'BOILERPLATE.Skills.laoDong.label',
        description: 'BOILERPLATE.Skills.laoDong.label',
    },
    "thuongNghiep": {
        ten: 'BOILERPLATE.Skills.thuongNghiep.label',
        description: 'BOILERPLATE.Skills.thuongNghiep.label',
    },
    "haiNghiep": {
        ten: 'BOILERPLATE.Skills.haiNghiep.label',
        description: 'BOILERPLATE.Skills.haiNghiep.label',
    },
    "hacNghiep": {
        ten: 'BOILERPLATE.Skills.hacNghiep.label',
        description: 'BOILERPLATE.Skills.hacNghiep.label',
    },
    "sinhTon": {
        ten: 'BOILERPLATE.Skills.sinhTon.label',
        description: 'BOILERPLATE.Skills.sinhTon.label',
    },

    "lanhDao": {
        ten: 'BOILERPLATE.Skills.lanhDao.label',
        description: 'BOILERPLATE.Skills.lanhDao.label',
    },
    "leDao": {
        ten: 'BOILERPLATE.Skills.leDao.label',
        description: 'BOILERPLATE.Skills.leDao.label',
    },
    "bieuDien": {
        ten: 'BOILERPLATE.Skills.bieuDien.label',
        description: 'BOILERPLATE.Skills.bieuDien.label',
    },
    "tamY": {
        ten: 'BOILERPLATE.Skills.tamY.label',
        description: 'BOILERPLATE.Skills.tamY.label',
    },

    "theThuat": {
        ten: 'BOILERPLATE.Skills.theThuat.label',
        description: 'BOILERPLATE.Skills.theThuat.label',
    },
    "voThuat": {
        ten: 'BOILERPLATE.Skills.voThuat.label',
        description: 'BOILERPLATE.Skills.voThuat.label',
    },
    "binhPhap": {
        ten: 'BOILERPLATE.Skills.binhPhap.label',
        description: 'BOILERPLATE.Skills.binhPhap.label',
    },
    "thienDinh": {
        ten: 'BOILERPLATE.Skills.thienDinh.label',
        description: 'BOILERPLATE.Skills.thienDinh.label',
    },
}

export const ABILITY_KEYS = [
    "sucLuc",
    "tamLuc",
    "canhGiac",
    "chuTam",
    "tocDo",
    "nguHop",
    "khangLuc"
] as const;
export type HvAbilityKey = (typeof ABILITY_KEYS)[number];

export interface HvCharacterIdentity {
    giaToc: string;
    monPhai: string;
    thiToc: string;
    ngheNghiep: string;
    tinhCach: string;
}

export type HvElementField = {
    value: number;
};

export type HvAbilityField = {
    value: number;
};

export type HvResourceAbilityField = {
    base: number;
    value: number;
};

export type HvElements = Record<HvElementKey, HvElementField>;
export type HvSkills = Record<HvSkillKey, number>;
export interface HvAbilities {
    sucLuc: HvResourceAbilityField;
    tamLuc: HvResourceAbilityField;
    canhGiac: HvAbilityField;
    chuTam: HvAbilityField;
    tocDo: HvAbilityField;
    nguHop: HvAbilityField;
}

export interface HvCharacterSystemData {
    identity: HvCharacterIdentity;
    elements: HvElements;
    skills: HvSkills;
    abilities: HvAbilities;
    attributes: {
        level: {
            value: number;
        };
    };
}

/**
 * Đây là object tạm để tính bonus từ Item/Effect
 * Không lưu xuống DB
 */
export interface HvComputedTotals {
    elements: Record<HvElementKey, number>;
    skills: Record<HvSkillKey, number>;
}

export function isElementKey(value: string): value is HvElementKey {
    return (ELEMENT_KEYS as readonly string[]).includes(value);
}

export function isSkillKey(value: string): value is HvSkillKey {
    return (SKILL_KEYS as readonly string[]).includes(value);
}

export const ELEMENTS = {
    kim: {
        key: "kim",
        label: "BOILERPLATE.Element.kim.label",
        hanhTheLabel: "BOILERPLATE.Element.kim.hanhThe",
        icon: "/systems/huyen-viet-vtt/assets/icons/metal-element.webp",
    },
    moc: {
        key: "moc",
        label: "BOILERPLATE.Element.moc.label",
        hanhTheLabel: "BOILERPLATE.Element.moc.hanhThe",
        icon: "/systems/huyen-viet-vtt/assets/icons/wood-element.webp",
    },
    thuy: {
        key: "thuy",
        label: "BOILERPLATE.Element.thuy.label",
        hanhTheLabel: "BOILERPLATE.Element.thuy.hanhThe",
        icon: "/systems/huyen-viet-vtt/assets/icons/water-element.webp",
    },
    hoa: {
        key: "hoa",
        label: "BOILERPLATE.Element.hoa.label",
        hanhTheLabel: "BOILERPLATE.Element.hoa.hanhThe",
        icon: "/systems/huyen-viet-vtt/assets/icons/fire-element.webp",
    },
    tho: {
        key: "tho",
        label: "BOILERPLATE.Element.tho.label",
        hanhTheLabel: "BOILERPLATE.Element.tho.hanhThe",
        icon: "/systems/huyen-viet-vtt/assets/icons/earth-element.webp",
    },
}

/**
 * The set of Ability Scores used within the system.
 * @type {Object}
 */
BOILERPLATE.abilities = {
    sucLuc: 'BOILERPLATE.Ability.sucLuc.long',
    tamLuc: 'BOILERPLATE.Ability.tamLuc.long',
    canhGiac: 'BOILERPLATE.Ability.canhGiac.long',
    chuTam: 'BOILERPLATE.Ability.chuTam.long',
    tocDo: 'BOILERPLATE.Ability.tocDo.long',
    nguHop: 'BOILERPLATE.Ability.nguHop.long',
    khangLuc: 'BOILERPLATE.Ability.khangLuc.long',
};

BOILERPLATE.abilityAbbreviations = {
    str: 'BOILERPLATE.Ability.Str.abbr',
    dex: 'BOILERPLATE.Ability.Dex.abbr',
    con: 'BOILERPLATE.Ability.Con.abbr',
    int: 'BOILERPLATE.Ability.Int.abbr',
    wis: 'BOILERPLATE.Ability.Wis.abbr',
    cha: 'BOILERPLATE.Ability.Cha.abbr',
};
