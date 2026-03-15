import {ThiToc} from "../../types/thiToc";

export const BOILERPLATE: any = {};

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

export const THI_TOC: ThiToc[] = [
    {
        ten: 'BOILERPLATE.ThiToc.chuot.ten',
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
        ten: 'BOILERPLATE.ThiToc.trau.ten',
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
        ten: 'BOILERPLATE.ThiToc.ho.ten',
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
        ten: 'BOILERPLATE.ThiToc.meo.ten',
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
        ten: 'BOILERPLATE.ThiToc.ca.ten',
        linhGiap: 'ca',
        viTri: 'BOILERPLATE.ThiToc.ca.viTri',
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
        ten: 'BOILERPLATE.ThiToc.ran.ten',
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
        ten: 'BOILERPLATE.ThiToc.ngua.ten',
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
        ten: 'BOILERPLATE.ThiToc.de.ten',
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
        ten: 'BOILERPLATE.ThiToc.khi.ten',
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
        ten: 'BOILERPLATE.ThiToc.ga.ten',
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
        ten: 'BOILERPLATE.ThiToc.soi.ten',
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
        ten: 'BOILERPLATE.ThiToc.heo.ten',
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