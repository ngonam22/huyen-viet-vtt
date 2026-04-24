import {ThiToc} from "../../types/thiToc";
import {BoiCanh} from "../../types/boiCanh";
import {GiaCanh} from "../../types/giaCanh";
import {MonPhai} from "../../types/monPhai";
import type {
    ThuatThuc,
    ThuatThucCategory,
    VoKySubcategory,
    ThuatThucTrait,
    UsageFrequency,
} from "../../types/thuatThuc";


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

export const BOI_CANH: BoiCanh[] = [
    {
        id: 'thanhThi',
        ten: 'BOILERPLATE.BoiCanh.thanhThi.label',
        description: 'BOILERPLATE.BoiCanh.thanhThi.desc',
        upgrade: [
            {
                target: 'element',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'kim',
                        value: 1
                    }
                ]
            },
            {
                target: 'skill',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'thuongNghiep',
                        value: 1
                    }
                ]
            }
        ]
    },
    {
        id: 'nongThon',
        ten: 'BOILERPLATE.BoiCanh.nongThon.label',
        description: 'BOILERPLATE.BoiCanh.nongThon.desc',
        upgrade: [
            {
                target: 'element',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'tho',
                        value: 1
                    }
                ]
            },
            {
                target: 'skill',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'laoDong',
                        value: 1
                    }
                ]
            }
        ]
    },
    {
        id: 'rungSau',
        ten: 'BOILERPLATE.BoiCanh.rungSau.label',
        description: 'BOILERPLATE.BoiCanh.rungSau.desc',
        upgrade: [
            {
                target: 'element',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'moc',
                        value: 1
                    }
                ]
            },
            {
                target: 'skill',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'sinhTon',
                        value: 1
                    }
                ]
            }
        ]
    },
    {
        id: 'songNuoc',
        ten: 'BOILERPLATE.BoiCanh.songNuoc.label',
        description: 'BOILERPLATE.BoiCanh.songNuoc.desc',
        upgrade: [
            {
                target: 'element',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'thuy',
                        value: 1
                    }
                ]
            },
            {
                target: 'skill',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'haiNghiep',
                        value: 1
                    }
                ]
            }
        ]
    },
    {
        id: 'nuiDoi',
        ten: 'BOILERPLATE.BoiCanh.nuiDoi.label',
        description: 'BOILERPLATE.BoiCanh.nuiDoi.desc',
        upgrade: [
            {
                target: 'element',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'tho',
                        value: 1
                    }
                ]
            },
            {
                target: 'skill',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'theThuat',
                        value: 1
                    }
                ]
            }
        ]
    },
    {
        id: 'namHai',
        ten: 'BOILERPLATE.BoiCanh.namHai.label',
        description: 'BOILERPLATE.BoiCanh.namHai.desc',
        upgrade: [
            {
                target: 'element',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'thuy',
                        value: 1
                    }
                ]
            },
            {
                target: 'skill',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'thuongNghiep',
                        value: 1
                    }
                ]
            }
        ]
    },
    {
        id: 'yeuLam',
        ten: 'BOILERPLATE.BoiCanh.yeuLam.label',
        description: 'BOILERPLATE.BoiCanh.yeuLam.desc',
        upgrade: [
            {
                target: 'element',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'moc',
                        value: 1
                    }
                ]
            },
            {
                target: 'skill',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'leDao',
                        value: 1
                    }
                ]
            }
        ]
    },
    {
        id: 'maVuc',
        ten: 'BOILERPLATE.BoiCanh.maVuc.label',
        description: 'BOILERPLATE.BoiCanh.maVuc.desc',
        upgrade: [
            {
                target: 'element',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'hoa',
                        value: 1
                    }
                ]
            },
            {
                target: 'skill',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'thanHoc',
                        value: 1
                    }
                ]
            }
        ]
    },
    {
        id: 'tuyetVien',
        ten: 'BOILERPLATE.BoiCanh.tuyetVien.label',
        description: 'BOILERPLATE.BoiCanh.tuyetVien.desc',
        upgrade: [
            {
                target: 'element',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'thuy',
                        value: 1
                    }
                ]
            },
            {
                target: 'skill',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'sinhTon',
                        value: 1
                    }
                ]
            }
        ]
    },
    {
        id: 'namLuc',
        ten: 'BOILERPLATE.BoiCanh.namLuc.label',
        description: 'BOILERPLATE.BoiCanh.namLuc.desc',
        upgrade: [
            {
                target: 'element',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'kim',
                        value: 1
                    }
                ]
            },
            {
                target: 'skill',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'haiNghiep',
                        value: 1
                    }
                ]
            }
        ]
    }
]

export const THI_TOC: ThiToc[] = [
    {
        ten: 'BOILERPLATE.ThiToc.chuot.label',
        linhGiap: 'chuot',
        viTri: 'BOILERPLATE.ThiToc.chuot.viTri',
        upgrade: [
            {
                target: 'element',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'thuy',
                        value: 1
                    }
                ]
            },
            {
                target: 'skill',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'yHoc',
                        value: 1
                    }
                ]
            }
        ]
    },
    {
        ten: 'BOILERPLATE.ThiToc.trau.label',
        linhGiap: 'trau',
        viTri: 'BOILERPLATE.ThiToc.trau.viTri',
        upgrade: [
            {
                target: 'element',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'tho',
                        value: 1
                    }
                ]
            },
            {
                target: 'skill',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'binhPhap',
                        value: 1
                    }
                ]
            }
        ]
    },
    {
        ten: 'BOILERPLATE.ThiToc.ho.label',
        linhGiap: 'ho',
        viTri: 'BOILERPLATE.ThiToc.ho.viTri',
        upgrade: [
            {
                target: 'element',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'kim',
                        value: 1
                    }
                ]
            },
            {
                target: 'skill',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'theThuat',
                        value: 1
                    }
                ]
            }
        ],
        starterTechniques: ['tiemHanhBo', 'themDoanNangLuc']
    },
    {
        ten: 'BOILERPLATE.ThiToc.meo.label',
        linhGiap: 'meo',
        viTri: 'BOILERPLATE.ThiToc.meo.viTri',
        upgrade: [
            {
                target: 'element',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'moc',
                        value: 1
                    }
                ]
            },
            {
                target: 'skill',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'bieuDien',
                        value: 1
                    }
                ]
            }
        ]
    },
    {
        ten: 'BOILERPLATE.ThiToc.thin.label',
        linhGiap: 'thin',
        viTri: 'BOILERPLATE.ThiToc.thin.viTri',
        upgrade: [
            {
                target: 'element',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'thuy',
                        value: 1
                    }
                ]
            },
            {
                target: 'skill',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'thienDinh',
                        value: 1
                    }
                ]
            }
        ]
    },
    {
        ten: 'BOILERPLATE.ThiToc.ran.label',
        linhGiap: 'ran',
        viTri: 'BOILERPLATE.ThiToc.ran.viTri',
        upgrade: [
            {
                target: 'element',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'thuy',
                        value: 1
                    }
                ]
            },
            {
                target: 'skill',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'tamY',
                        value: 1
                    }
                ]
            }
        ]
    },
    {
        ten: 'BOILERPLATE.ThiToc.ngua.label',
        linhGiap: 'ngua',
        viTri: 'BOILERPLATE.ThiToc.ngua.viTri',
        upgrade: [
            {
                target: 'element',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'hoa',
                        value: 1
                    }
                ]
            },
            {
                target: 'skill',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'thuongNghiep',
                        value: 1
                    }
                ]
            }
        ],
        starterTechniques: ['hoaKhiThuc', 'hoaKhiQuyen']
    },
    {
        ten: 'BOILERPLATE.ThiToc.de.label',
        linhGiap: 'de',
        viTri: 'BOILERPLATE.ThiToc.de.viTri',
        upgrade: [
            {
                target: 'element',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'tho',
                        value: 1
                    }
                ]
            },
            {
                target: 'skill',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'laoDong',
                        value: 1
                    }
                ]
            }
        ]
    },
    {
        ten: 'BOILERPLATE.ThiToc.khi.label',
        linhGiap: 'khi',
        viTri: 'BOILERPLATE.ThiToc.khi.viTri',
        upgrade: [
            {
                target: 'element',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'moc',
                        value: 1
                    }
                ]
            },
            {
                target: 'skill',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'leDao',
                        value: 1
                    }
                ]
            }
        ]
    },
    {
        ten: 'BOILERPLATE.ThiToc.ga.label',
        linhGiap: 'ga',
        viTri: 'BOILERPLATE.ThiToc.ga.viTri',
        upgrade: [
            {
                target: 'element',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'kim',
                        value: 1
                    }
                ]
            },
            {
                target: 'skill',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'myThuat',
                        value: 1
                    }
                ]
            }
        ]
    },
    {
        ten: 'BOILERPLATE.ThiToc.soi.label',
        linhGiap: 'soi',
        viTri: 'BOILERPLATE.ThiToc.soi.viTri',
        upgrade: [
            {
                target: 'element',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'tho',
                        value: 1
                    }
                ]
            },
            {
                target: 'skill',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'hacNghiep',
                        value: 1
                    }
                ]
            }
        ]
    },
    {
        ten: 'BOILERPLATE.ThiToc.heo.label',
        linhGiap: 'heo',
        viTri: 'BOILERPLATE.ThiToc.heo.viTri',
        upgrade: [
            {
                target: 'element',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'thuy',
                        value: 1
                    }
                ]
            },
            {
                target: 'skill',
                choose: 1,
                mode: 'add',
                effects: [
                    {
                        name: 'sinhTon',
                        value: 1
                    }
                ]
            }
        ]
    }
]

export const GIA_CANH: GiaCanh[] = [
  {
    id: "nong-dan",
    ten: "BOILERPLATE.GiaCanh.nongDan.label",
    description: "Sản xuất lương thực, trồng trọt chăn nuôi",
    upgrade: [
      {
        target: "element",
        mode: "add",
        effects: [
          { name: "tho", value: 1 },
          { name: "moc", value: 1 }
        ],
        choose: 1
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "laoDong", value: 1 }]
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "theThuat", value: 1 }]
      }
    ]
  },
  {
    id: "thuong-nhan",
    ten: "Thương nhân",
    description: "Trao đổi buôn bán, luân chuyển đồng tiền cũng như vật phẩm",
    upgrade: [
      {
        target: "element",
        mode: "add",
        effects: [
          { name: "kim", value: 1 },
          { name: "thuy", value: 1 }
        ],
        choose: 1
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "thuongNghiep", value: 1 }]
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "leDao", value: 1 }]
      }
    ]
  }
];

/* -------------------------------------------- */
/*  Thuật Thức (Techniques & Spells)            */
/*  See specs/spec_thuat_thuc.md                */
/* -------------------------------------------- */

export const THUAT_THUC_CATEGORIES = [
    "voKy",
    "tamThuat",
    "linhThuat",
    "nghiThuc",
    "khiThuat",
    "maThuat",
    "amKy",
] as const satisfies readonly ThuatThucCategory[];

export const THUAT_THUC_SUBCATEGORIES_VO_KY = [
    "toanDung",
    "canChien",
    "xaChien",
    "thanPhap",
] as const satisfies readonly VoKySubcategory[];

export const THUAT_THUC_TRAITS = [
    "hanhDong",
    "congKich",
    "muuKe",
    "hoTro",
    "diChuyen",
    "dinhKy",
    "chiThanh",
    "phanUng",
    "hoaHanh",
    "thoHanh",
    "kimHanh",
    "thuyHanh",
    "mocHanh",
    "nguHanh",
    "tieuHanh",
    "daiHanh",
    "nguHop",
    "hoaTinh",
    "thoTinh",
    "kimTinh",
    "thuyTinh",
    "mocTinh",
    "hoaKhi",
    "hoaThe",
    "nguyenChu",
    "maThuat",
    "dacBiet",
] as const satisfies readonly ThuatThucTrait[];

export const THUAT_THUC_USAGE_FREQUENCIES = [
    "unlimited",
    "perTurn",
    "perRound",
    "perScene",
    "perSession",
    "perDay",
    "perWeek",
    "perCampaign",
    "perOpportunity",
] as const satisfies readonly UsageFrequency[];

export const THUAT_THUC_XP_COST_DEFAULT = 3;

/**
 * Seed catalog — Level 1 samples (one per phân hệ; two for Võ Kỹ).
 * Full Level-1 catalog transcription is deferred — see spec §13.
 */
export const THUAT_THUC: ThuatThuc[] = [
    {
        id: "hoaKhiThuc",
        name: "BOILERPLATE.ThuatThuc.hoaKhiThuc.name",
        category: "voKy",
        subcategory: "toanDung",
        level: 1,
        element: "hoa",
        traits: ["chiThanh", "hoaHanh"],
        condition: "BOILERPLATE.ThuatThuc.hoaKhiThuc.condition",
        usage: { frequency: "unlimited", maxUses: 1 },
        prerequisites: { elements: { hoa: 1 }, skills: { voThuat: 1 } },
        xpCost: THUAT_THUC_XP_COST_DEFAULT,
        sincerityEffects: [
            {
                cost: "1+ Hỏa",
                element: "hoa",
                text: "BOILERPLATE.ThuatThuc.hoaKhiThuc.sincerity.1",
            },
        ],
        description: "BOILERPLATE.ThuatThuc.hoaKhiThuc.desc",
    },
    {
        id: "phiKhiThuc",
        name: "BOILERPLATE.ThuatThuc.phiKhiThuc.name",
        category: "voKy",
        subcategory: "toanDung",
        level: 1,
        traits: ["hanhDong", "congKich"],
        skillCheck: "BOILERPLATE.ThuatThuc.phiKhiThuc.skillCheck",
        difficulty: "2",
        range: "BOILERPLATE.ThuatThuc.phiKhiThuc.range",
        usage: { frequency: "unlimited", maxUses: 1 },
        prerequisites: { skills: { voThuat: 1 } },
        xpCost: THUAT_THUC_XP_COST_DEFAULT,
        primaryEffect: "BOILERPLATE.ThuatThuc.phiKhiThuc.primaryEffect",
        sincerityEffects: [
            {
                cost: "1+",
                text: "BOILERPLATE.ThuatThuc.phiKhiThuc.sincerity.1",
            },
        ],
        description: "BOILERPLATE.ThuatThuc.phiKhiThuc.desc",
    },
    {
        id: "themDoanNangLuc",
        name: "BOILERPLATE.ThuatThuc.themDoanNangLuc.name",
        category: "tamThuat",
        level: 1,
        element: "kim",
        traits: ["chiThanh", "kimHanh"],
        condition: "BOILERPLATE.ThuatThuc.themDoanNangLuc.condition",
        usage: { frequency: "unlimited", maxUses: 1 },
        prerequisites: { elements: { kim: 1 } },
        xpCost: THUAT_THUC_XP_COST_DEFAULT,
        sincerityEffects: [
            {
                cost: "1+ Kim",
                element: "kim",
                text: "BOILERPLATE.ThuatThuc.themDoanNangLuc.sincerity.1",
            },
            {
                cost: "2 Kim",
                element: "kim",
                text: "BOILERPLATE.ThuatThuc.themDoanNangLuc.sincerity.2",
            },
        ],
        description: "BOILERPLATE.ThuatThuc.themDoanNangLuc.desc",
    },
    {
        id: "nghiThucTruTa",
        name: "BOILERPLATE.ThuatThuc.nghiThucTruTa.name",
        category: "nghiThuc",
        level: 1,
        traits: ["hanhDong", "dinhKy", "nguHanh"],
        skillCheck: "BOILERPLATE.ThuatThuc.nghiThucTruTa.skillCheck",
        difficulty: "4",
        range: "BOILERPLATE.ThuatThuc.nghiThucTruTa.range",
        usage: { frequency: "unlimited", maxUses: 1 },
        prerequisites: { skills: { thanHoc: 1 } },
        xpCost: THUAT_THUC_XP_COST_DEFAULT,
        primaryEffect: "BOILERPLATE.ThuatThuc.nghiThucTruTa.primaryEffect",
        sincerityEffects: [
            { cost: "1", text: "BOILERPLATE.ThuatThuc.nghiThucTruTa.sincerity.1" },
            { cost: "1+", text: "BOILERPLATE.ThuatThuc.nghiThucTruTa.sincerity.2" },
            { cost: "1+", text: "BOILERPLATE.ThuatThuc.nghiThucTruTa.sincerity.3" },
        ],
        description: "BOILERPLATE.ThuatThuc.nghiThucTruTa.desc",
    },
    {
        id: "hoaDiemChiThuat",
        name: "BOILERPLATE.ThuatThuc.hoaDiemChiThuat.name",
        category: "linhThuat",
        level: 1,
        element: "hoa",
        traits: ["hanhDong", "congKich", "hoaHanh", "hoaKhi", "hoaTinh"],
        skillCheck: "BOILERPLATE.ThuatThuc.hoaDiemChiThuat.skillCheck",
        difficulty: "3",
        range: "BOILERPLATE.ThuatThuc.hoaDiemChiThuat.range",
        duration: "BOILERPLATE.ThuatThuc.hoaDiemChiThuat.duration",
        usage: { frequency: "unlimited", maxUses: 1 },
        prerequisites: { elements: { hoa: 1 }, skills: { thanHoc: 1 } },
        xpCost: THUAT_THUC_XP_COST_DEFAULT,
        primaryEffect: "BOILERPLATE.ThuatThuc.hoaDiemChiThuat.primaryEffect",
        sincerityEffects: [
            {
                cost: "1+ Hỏa",
                element: "hoa",
                text: "BOILERPLATE.ThuatThuc.hoaDiemChiThuat.sincerity.1",
            },
        ],
        description: "BOILERPLATE.ThuatThuc.hoaDiemChiThuat.desc",
    },
    {
        id: "hoaKhiQuyen",
        name: "BOILERPLATE.ThuatThuc.hoaKhiQuyen.name",
        category: "khiThuat",
        level: 1,
        element: "hoa",
        traits: ["hanhDong", "congKich", "hoTro", "hoaHanh", "hoaTinh"],
        skillCheck: "BOILERPLATE.ThuatThuc.hoaKhiQuyen.skillCheck",
        difficulty: "2",
        range: "BOILERPLATE.ThuatThuc.hoaKhiQuyen.range",
        duration: "BOILERPLATE.ThuatThuc.hoaKhiQuyen.duration",
        usage: { frequency: "unlimited", maxUses: 1 },
        prerequisites: { elements: { hoa: 1 }, skills: { voThuat: 1 } },
        xpCost: THUAT_THUC_XP_COST_DEFAULT,
        primaryEffect: "BOILERPLATE.ThuatThuc.hoaKhiQuyen.primaryEffect",
        description: "BOILERPLATE.ThuatThuc.hoaKhiQuyen.desc",
    },
    {
        id: "maLinhNguyenChu",
        name: "BOILERPLATE.ThuatThuc.maLinhNguyenChu.name",
        category: "maThuat",
        level: 1,
        maHoa: true,
        traits: ["hanhDong", "congKich", "muuKe", "nguHanh", "maThuat", "nguyenChu"],
        skillCheck: "BOILERPLATE.ThuatThuc.maLinhNguyenChu.skillCheck",
        difficulty: "BOILERPLATE.ThuatThuc.maLinhNguyenChu.difficulty",
        range: "BOILERPLATE.ThuatThuc.maLinhNguyenChu.range",
        usage: { frequency: "unlimited", maxUses: 1 },
        prerequisites: { skills: { thanHoc: 1 } },
        xpCost: THUAT_THUC_XP_COST_DEFAULT,
        primaryEffect: "BOILERPLATE.ThuatThuc.maLinhNguyenChu.primaryEffect",
        sincerityEffects: [
            { cost: "1+", text: "BOILERPLATE.ThuatThuc.maLinhNguyenChu.sincerity.1" },
            { cost: "1+", text: "BOILERPLATE.ThuatThuc.maLinhNguyenChu.sincerity.2" },
        ],
        description: "BOILERPLATE.ThuatThuc.maLinhNguyenChu.desc",
    },
    {
        id: "tiemHanhBo",
        name: "BOILERPLATE.ThuatThuc.tiemHanhBo.name",
        category: "amKy",
        level: 1,
        element: "kim",
        traits: ["chiThanh", "kimHanh"],
        condition: "BOILERPLATE.ThuatThuc.tiemHanhBo.condition",
        usage: { frequency: "unlimited", maxUses: 1 },
        prerequisites: { elements: { kim: 1 }, skills: { hacNghiep: 1 } },
        xpCost: THUAT_THUC_XP_COST_DEFAULT,
        sincerityEffects: [
            {
                cost: "1 Kim",
                element: "kim",
                text: "BOILERPLATE.ThuatThuc.tiemHanhBo.sincerity.1",
            },
        ],
        description: "BOILERPLATE.ThuatThuc.tiemHanhBo.desc",
    },
];

/**
 * Lookup map for fast access by id.
 */
export const THUAT_THUC_BY_ID: Record<string, ThuatThuc> = Object.fromEntries(
    THUAT_THUC.map((t) => [t.id, t])
);

BOILERPLATE.thuatThuc = {
    categories: THUAT_THUC_CATEGORIES,
    subcategoriesVoKy: THUAT_THUC_SUBCATEGORIES_VO_KY,
    traits: THUAT_THUC_TRAITS,
    usageFrequencies: THUAT_THUC_USAGE_FREQUENCIES,
    catalog: THUAT_THUC,
    byId: THUAT_THUC_BY_ID,
};

/**
 * Cấu hình tham khảo cho 12 Môn Phái (Thập Nhị Học Viện).
 * Lưu ý: Các field progressionReqs chứa data mẫu, dự kiến được điền đầy đủ
 * các yêu cầu theo đúng chuẩn của Rulebook sau này.
 */
export const MON_PHAI: Record<string, MonPhai> = {
    tinhLyYSu: {
        id: 'tinhLyYSu',
        ten: 'BOILERPLATE.MonPhai.tinhLyYSu.label',
        category: 'thapNhiHocVien',
        upgrade: [
            {
                target: 'element',
                choose: 2,
                mode: 'add',
                effects: [
                    { name: 'kim', value: 1 },
                    { name: 'moc', value: 1 },
                    { name: 'thuy', value: 1 },
                    { name: 'hoa', value: 1 },
                    { name: 'tho', value: 1 },
                ]
            }
        ],
        progressionReqs: {
            2: { yHoc: 3, theThuat: 1 },
            3: { yHoc: 4, theThuat: 2, thanHoc: 1 },
            4: { yHoc: 5, theThuat: 3, thanHoc: 2 },
            5: { yHoc: 5, theThuat: 4, thanHoc: 4, tamY: 2 },
            6: { yHoc: 5, theThuat: 5, thanHoc: 5, tamY: 4 }
        }
    },
    sanhCuuLanhQuan: {
        id: 'sanhCuuLanhQuan',
        ten: 'BOILERPLATE.MonPhai.sanhCuuLanhQuan.label',
        category: 'thapNhiHocVien',
        upgrade: [
            {
                target: 'element',
                choose: 2,
                mode: 'add',
                effects: [
                    { name: 'kim', value: 1 },
                    { name: 'moc', value: 1 },
                    { name: 'thuy', value: 1 },
                    { name: 'hoa', value: 1 },
                    { name: 'tho', value: 1 },
                ]
            }
        ],
        progressionReqs: {
            2: { binhPhap: 2, lanhDao: 1 },
            3: { binhPhap: 3, lanhDao: 2, theThuat: 1 },
            4: { binhPhap: 4, lanhDao: 3, theThuat: 2 },
            5: { binhPhap: 5, lanhDao: 4, theThuat: 4, chienCu: 2 },
            6: { binhPhap: 5, lanhDao: 5, theThuat: 5, chienCu: 4 }
        }
    },
    duongTanPhucMaSu: {
        id: 'duongTanPhucMaSu',
        ten: 'BOILERPLATE.MonPhai.duongTanPhucMaSu.label',
        category: 'thapNhiHocVien',
        upgrade: [
            {
                target: 'element',
                choose: 2,
                mode: 'add',
                effects: [
                    { name: 'kim', value: 1 },
                    { name: 'moc', value: 1 },
                    { name: 'thuy', value: 1 },
                    { name: 'hoa', value: 1 },
                    { name: 'tho', value: 1 },
                ]
            }
        ],
        progressionReqs: {
            2: { thanHoc: 2, voThuat: 1 },
            3: { thanHoc: 3, voThuat: 2, tamY: 1 },
            4: { thanHoc: 4, voThuat: 3, tamY: 2 },
            5: { thanHoc: 5, voThuat: 4, tamY: 4, sinhTon: 2 },
            6: { thanHoc: 5, voThuat: 5, tamY: 5, sinhTon: 4 }
        }
    },
    minhHaoNgheSu: {
        id: 'minhHaoNgheSu',
        ten: 'BOILERPLATE.MonPhai.minhHaoNgheSu.label',
        category: 'thapNhiHocVien',
        upgrade: [
            {
                target: 'element',
                choose: 2,
                mode: 'add',
                effects: [
                    { name: 'kim', value: 1 },
                    { name: 'moc', value: 1 },
                    { name: 'thuy', value: 1 },
                    { name: 'hoa', value: 1 },
                    { name: 'tho', value: 1 },
                ]
            }
        ],
        progressionReqs: {
            2: { myThuat: 2, thoiTrang: 1 },
            3: { myThuat: 3, thoiTrang: 2, bieuDien: 1 },
            4: { myThuat: 4, thoiTrang: 3, bieuDien: 2 },
            5: { myThuat: 5, thoiTrang: 4, bieuDien: 4, leDao: 2 },
            6: { myThuat: 5, thoiTrang: 5, bieuDien: 5, leDao: 4 }
        }
    },
    thuongLienLinhSi: {
        id: 'thuongLienLinhSi',
        ten: 'BOILERPLATE.MonPhai.thuongLienLinhSi.label',
        category: 'thapNhiHocVien',
        upgrade: [
            {
                target: 'element',
                choose: 2,
                mode: 'add',
                effects: [
                    { name: 'kim', value: 1 },
                    { name: 'moc', value: 1 },
                    { name: 'thuy', value: 1 },
                    { name: 'hoa', value: 1 },
                    { name: 'tho', value: 1 },
                ]
            }
        ],
        progressionReqs: {
            2: { thienDinh: 2, thanHoc: 1 },
            3: { thienDinh: 3, thanHoc: 2, tamY: 1 },
            4: { thienDinh: 4, thanHoc: 3, tamY: 2 },
            5: { thienDinh: 5, thanHoc: 4, tamY: 4, yHoc: 2 },
            6: { thienDinh: 5, thanHoc: 5, tamY: 5, yHoc: 4 }
        }
    },
    tienViThuongSi: {
        id: 'tienViThuongSi',
        ten: 'BOILERPLATE.MonPhai.tienViThuongSi.label',
        category: 'thapNhiHocVien',
        upgrade: [
            {
                target: 'element',
                choose: 2,
                mode: 'add',
                effects: [
                    { name: 'kim', value: 1 },
                    { name: 'moc', value: 1 },
                    { name: 'thuy', value: 1 },
                    { name: 'hoa', value: 1 },
                    { name: 'tho', value: 1 },
                ]
            }
        ],
        progressionReqs: {
            2: { thuongNghiep: 2, leDao: 1 },
            3: { thuongNghiep: 3, leDao: 2, xaHoi: 1 },
            4: { thuongNghiep: 4, leDao: 3, xaHoi: 2 },
            5: { thuongNghiep: 5, leDao: 4, xaHoi: 4, vanTu: 2 },
            6: { thuongNghiep: 5, leDao: 5, xaHoi: 5, vanTu: 4 }
        }
    },
    nghiVoKySi: {
        id: 'nghiVoKySi',
        ten: 'BOILERPLATE.MonPhai.nghiVoKySi.label',
        category: 'thapNhiHocVien',
        upgrade: [
            {
                target: 'element',
                choose: 2,
                mode: 'add',
                effects: [
                    { name: 'kim', value: 1 },
                    { name: 'moc', value: 1 },
                    { name: 'thuy', value: 1 },
                    { name: 'hoa', value: 1 },
                    { name: 'tho', value: 1 },
                ]
            }
        ],
        progressionReqs: {
            2: { theThuat: 2, sinhTon: 1 },
            3: { theThuat: 3, sinhTon: 2, voThuat: 1 },
            4: { theThuat: 4, sinhTon: 3, voThuat: 2 },
            5: { theThuat: 5, sinhTon: 4, voThuat: 4, binhPhap: 2 },
            6: { theThuat: 5, sinhTon: 5, voThuat: 5, binhPhap: 4 }
        }
    },
    sonViThietTuong: {
        id: 'sonViThietTuong',
        ten: 'BOILERPLATE.MonPhai.sonViThietTuong.label',
        category: 'thapNhiHocVien',
        upgrade: [
            {
                target: 'element',
                choose: 2,
                mode: 'add',
                effects: [
                    { name: 'kim', value: 1 },
                    { name: 'moc', value: 1 },
                    { name: 'thuy', value: 1 },
                    { name: 'hoa', value: 1 },
                    { name: 'tho', value: 1 },
                ]
            }
        ],
        progressionReqs: {
            2: { chienCu: 2, theThuat: 1 },
            3: { chienCu: 3, theThuat: 2, laoDong: 1 },
            4: { chienCu: 4, theThuat: 3, laoDong: 2 },
            5: { chienCu: 5, theThuat: 4, laoDong: 4, thuongNghiep: 2 },
            6: { chienCu: 5, theThuat: 5, laoDong: 5, thuongNghiep: 4 }
        }
    },
    thiHuanThamLamQuan: {
        id: 'thiHuanThamLamQuan',
        ten: 'BOILERPLATE.MonPhai.thiHuanThamLamQuan.label',
        category: 'thapNhiHocVien',
        upgrade: [
            {
                target: 'element',
                choose: 2,
                mode: 'add',
                effects: [
                    { name: 'kim', value: 1 },
                    { name: 'moc', value: 1 },
                    { name: 'thuy', value: 1 },
                    { name: 'hoa', value: 1 },
                    { name: 'tho', value: 1 },
                ]
            }
        ],
        progressionReqs: {
            2: { sinhTon: 2, theThuat: 1 },
            3: { sinhTon: 3, theThuat: 2, voThuat: 1 },
            4: { sinhTon: 4, theThuat: 3, voThuat: 2 },
            5: { sinhTon: 5, theThuat: 4, voThuat: 4, thienDinh: 2 },
            6: { sinhTon: 5, theThuat: 5, voThuat: 5, thienDinh: 4 }
        }
    },
    dienHauChinhSi: {
        id: 'dienHauChinhSi',
        ten: 'BOILERPLATE.MonPhai.dienHauChinhSi.label',
        category: 'thapNhiHocVien',
        upgrade: [
            {
                target: 'element',
                choose: 2,
                mode: 'add',
                effects: [
                    { name: 'kim', value: 1 },
                    { name: 'moc', value: 1 },
                    { name: 'thuy', value: 1 },
                    { name: 'hoa', value: 1 },
                    { name: 'tho', value: 1 },
                ]
            }
        ],
        progressionReqs: {
            2: { chinhTri: 2, vanTu: 1 },
            3: { chinhTri: 3, vanTu: 2, lanhDao: 1 },
            4: { chinhTri: 4, vanTu: 3, lanhDao: 2 },
            5: { chinhTri: 5, vanTu: 4, lanhDao: 4, leDao: 2 },
            6: { chinhTri: 5, vanTu: 5, lanhDao: 5, leDao: 4 }
        }
    },
    tuyetLuatThamTu: {
        id: 'tuyetLuatThamTu',
        ten: 'BOILERPLATE.MonPhai.tuyetLuatThamTu.label',
        category: 'thapNhiHocVien',
        upgrade: [
            {
                target: 'element',
                choose: 2,
                mode: 'add',
                effects: [
                    { name: 'kim', value: 1 },
                    { name: 'moc', value: 1 },
                    { name: 'thuy', value: 1 },
                    { name: 'hoa', value: 1 },
                    { name: 'tho', value: 1 },
                ]
            }
        ],
        progressionReqs: {
            2: { hacNghiep: 2, tamY: 1 },
            3: { hacNghiep: 3, tamY: 2, chinhTri: 1 },
            4: { hacNghiep: 4, tamY: 3, chinhTri: 2 },
            5: { hacNghiep: 5, tamY: 4, chinhTri: 4, voThuat: 2 },
            6: { hacNghiep: 5, tamY: 5, chinhTri: 5, voThuat: 4 }
        }
    },
    haoGioiHungBinh: {
        id: 'haoGioiHungBinh',
        ten: 'BOILERPLATE.MonPhai.haoGioiHungBinh.label',
        category: 'thapNhiHocVien',
        upgrade: [
            {
                target: 'element',
                choose: 2,
                mode: 'add',
                effects: [
                    { name: 'kim', value: 1 },
                    { name: 'moc', value: 1 },
                    { name: 'thuy', value: 1 },
                    { name: 'hoa', value: 1 },
                    { name: 'tho', value: 1 },
                ]
            }
        ],
        progressionReqs: {
            2: { voThuat: 2, theThuat: 1 },
            3: { voThuat: 3, theThuat: 2, sinhTon: 1 },
            4: { voThuat: 4, theThuat: 3, sinhTon: 2 },
            5: { voThuat: 5, theThuat: 4, sinhTon: 4, lanhDao: 2 },
            6: { voThuat: 5, theThuat: 5, sinhTon: 5, lanhDao: 4 }
        }
    }
};

/* -------------------------------------------- */
/*  Progression System                          */
/*  See specs/spec_character_progression.md     */
/* -------------------------------------------- */

/**
 * Bảng giá XP nâng cấp Ngũ Hành.
 * Key = cấp mục tiêu, Value = chi phí XP.
 * Có thể chỉnh sửa linh hoạt cho từng cấp.
 */
export const ELEMENT_UPGRADE_COST: Record<number, number> = {
    2: 6,   // lên cấp 2 tốn 6 XP
    3: 9,   // lên cấp 3 tốn 9 XP
    4: 12,  // lên cấp 4 tốn 12 XP
    5: 15,  // lên cấp 5 tốn 15 XP
    6: 18,  // lên cấp 6 tốn 18 XP
};

/**
 * Bảng giá XP nâng cấp Kỹ Năng.
 * Key = cấp mục tiêu, Value = chi phí XP.
 * Có thể chỉnh sửa linh hoạt cho từng cấp.
 */
export const SKILL_UPGRADE_COST: Record<number, number> = {
    1: 2,   // lên cấp 1 tốn 2 XP
    2: 4,   // lên cấp 2 tốn 4 XP
    3: 6,   // lên cấp 3 tốn 6 XP
    4: 8,   // lên cấp 4 tốn 8 XP
    5: 10,  // lên cấp 5 tốn 10 XP
    6: 12,  // lên cấp 6 tốn 12 XP
};

/** Giới hạn cấp tối đa cho Ngũ Hành (1–6) */
export const ELEMENT_MAX_LEVEL = 6;

/** Giới hạn cấp tối đa cho Kỹ Năng (0–6) */
export const SKILL_MAX_LEVEL = 6;

/**
 * Bảng ngưỡng XP → cấp Đặc Kỹ Môn Phái.
 * Sắp xếp tăng dần theo minXp.
 */
export const SECT_XP_LEVELS: { level: number; minXp: number }[] = [
    { level: 1, minXp: 0 },
    { level: 2, minXp: 20 },
    { level: 3, minXp: 50 },
    { level: 4, minXp: 90 },
    { level: 5, minXp: 140 },
    { level: 6, minXp: 201 },
];

/**
 * Tính cấp Đặc Kỹ Môn Phái dựa trên tổng XP tích lũy.
 */
export function getSectLevelFromTotalXp(totalXp: number): number {
    for (let i = SECT_XP_LEVELS.length - 1; i >= 0; i--) {
        if (totalXp >= SECT_XP_LEVELS[i].minXp) return SECT_XP_LEVELS[i].level;
    }
    return 1;
}

/**
 * Danh sách các loại sự kiện changelog.
 * UI timeline tra cứu để render màu sắc, icon, label cho mỗi node.
 */
export const CHANGELOG_TYPES = {
    element_upgrade:    { label: 'Nâng Hành',       color: '#e74c3c', icon: '🔥' },
    skill_upgrade:      { label: 'Nâng Kỹ Năng',    color: '#3498db', icon: '📘' },
    technique_learned:  { label: 'Lĩnh Ngộ Thuật',  color: '#9b59b6', icon: '⚡' },
    sect_upgrade:       { label: 'Thăng Cấp Phái',  color: '#f1c40f', icon: '🏛️' },
    xp_gain:            { label: 'Nhận Tu Vi',       color: '#2ecc71', icon: '✨' },
    xp_adjust:          { label: 'Hiệu Chỉnh XP',   color: '#95a5a6', icon: '🔧' },
    identity_change:    { label: 'Thay Đổi Danh',   color: '#1abc9c', icon: '🔄' },
} as const;

export type ChangelogType = keyof typeof CHANGELOG_TYPES;