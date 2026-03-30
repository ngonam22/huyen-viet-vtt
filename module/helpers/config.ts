import {ThiToc} from "../../types/thiToc";
import {BoiCanh} from "../../types/boiCanh";
import {GiaCanh} from "../../types/giaCanh";


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
    "nguHop"
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
        ]
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
        ]
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