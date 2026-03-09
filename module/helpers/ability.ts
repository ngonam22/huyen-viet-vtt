import {Ability, NguHanh} from "../../types/nguHanh";

export function createNullNguHanh(): NguHanh {
    return {
        kim: {
            value: 0
        },
        moc: {
            value: 0
        },
        thuy: {
            value: 0
        },
        hoa: {
            value: 0
        },
        tho: {
            value: 0
        }
    }
}
export function calculateAbility(nguHanh?: NguHanh): Ability {
    if (!nguHanh) {
        nguHanh = createNullNguHanh()
    }

    return {
        sucLuc: {
            value: 5 + (+nguHanh?.hoa?.value || 0) + (+nguHanh?.moc?.value || 0) + (+nguHanh?.tho?.value || 0),
        },
        tamLuc: {
            value: (+nguHanh?.tho?.value || 0) + (+nguHanh?.kim?.value || 0) + (+nguHanh?.thuy?.value || 0)
        },
        canhGiac: {
            value: 1
        },
        chuTam: {
            value: 1
        },
        tocDo: {
            value: 1
        }
    }
}