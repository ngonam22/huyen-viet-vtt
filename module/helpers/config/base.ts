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
    boiCanh?: string;
    giaCanh?: string;
    thienTu?: string;
    uuDiemTitle?: string;
    uuDiemDesc?: string;
    khuyetDiemTitle?: string;
    khuyetDiemDesc?: string;
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

export const SKILL_LABELS: Record<HvSkillKey, string> = {
    chinhTri:     'Chính Trị',
    khoaHoc:      'Khoa Học',
    thanHoc:      'Thần Học',
    xaHoi:        'Xã Hội',
    yHoc:         'Y Học',
    myThuat:      'Mỹ Thuật',
    vanTu:        'Văn Tự',
    thoiTrang:    'Thời Trang',
    chienCu:      'Chiến Cụ',
    laoDong:      'Lao Động',
    thuongNghiep: 'Thương Nghiệp',
    haiNghiep:    'Hải Nghiệp',
    hacNghiep:    'Hắc Nghiệp',
    sinhTon:      'Sinh Tồn',
    lanhDao:      'Lãnh Đạo',
    leDao:        'Lễ Đạo',
    bieuDien:     'Biểu Diễn',
    tamY:         'Tâm Ý',
    theThuat:     'Thể Thuật',
    voThuat:      'Võ Thuật',
    binhPhap:     'Binh Pháp',
    thienDinh:    'Thiền Định',
};

export const ELEMENT_CLASS: Record<HvElementKey, string> = {
    kim:  'metal',
    moc:  'wood',
    thuy: 'water',
    hoa:  'fire',
    tho:  'earth',
};

export const ELEMENTS = {
    kim: {
        key: "kim",
        label: "BOILERPLATE.Element.kim.label",
        hanhTheLabel: "BOILERPLATE.Element.kim.hanhThe",
        icon: "/systems/huyen-viet-vtt/assets/icons/metal-element.webp",
        ringIcon: "/systems/huyen-viet-vtt/assets/icons/metal-ring-element.png",
    },
    moc: {
        key: "moc",
        label: "BOILERPLATE.Element.moc.label",
        hanhTheLabel: "BOILERPLATE.Element.moc.hanhThe",
        icon: "/systems/huyen-viet-vtt/assets/icons/wood-element.webp",
        ringIcon: "/systems/huyen-viet-vtt/assets/icons/wood-ring-element.png",
    },
    thuy: {
        key: "thuy",
        label: "BOILERPLATE.Element.thuy.label",
        hanhTheLabel: "BOILERPLATE.Element.thuy.hanhThe",
        icon: "/systems/huyen-viet-vtt/assets/icons/water-element.webp",
        ringIcon: "/systems/huyen-viet-vtt/assets/icons/water-ring-element.png",
    },
    hoa: {
        key: "hoa",
        label: "BOILERPLATE.Element.hoa.label",
        hanhTheLabel: "BOILERPLATE.Element.hoa.hanhThe",
        icon: "/systems/huyen-viet-vtt/assets/icons/fire-element.webp",
        ringIcon: "/systems/huyen-viet-vtt/assets/icons/fire-ring-element.png",
    },
    tho: {
        key: "tho",
        label: "BOILERPLATE.Element.tho.label",
        hanhTheLabel: "BOILERPLATE.Element.tho.hanhThe",
        icon: "/systems/huyen-viet-vtt/assets/icons/earth-element.webp",
        ringIcon: "/systems/huyen-viet-vtt/assets/icons/earth-ring-element.png",
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

export const THIEN_TU_DESCRIPTIONS = {
    kim: 'Cứng rắn từ bên trong, khí chất như kim loại được tôi luyện qua muôn trận. Người mang Thiên Tư Kim Hành thiên về sức chịu đựng và ý chí kiên cường bất khuất trước mọi thử thách.',
    moc: 'Bén rễ sâu trong đất, vươn cành đón ánh sáng. Người mang Thiên Tư Mộc Hành gần gũi với sinh khí muôn loài, thấu cảm lẽ trời đất và sức mạnh của sự hồi sinh.',
    thuy: 'Chảy không ngừng, thấm qua mọi kẽ hở. Người mang Thiên Tư Thủy Hành sở hữu linh giác nhạy bén và khả năng thích nghi xuất sắc trước mọi biến cố khó lường.',
    hoa: 'Bùng cháy trong từng nhịp tim, nhiệt huyết chẳng bao giờ lụi tàn. Người mang Thiên Tư Hỏa Hành tỏa sáng nhất trong khoảnh khắc quyết định, sức mạnh bùng phát bất ngờ.',
    tho: 'Tựa núi vững, tựa đất rộng. Người mang Thiên Tư Thổ Hành là trụ cột vững chắc, sức nặng của họ chở che và giữ vững tất cả những người xung quanh.',
};