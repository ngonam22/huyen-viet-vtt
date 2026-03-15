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
        viTri: 'noiBac',
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
    }
]