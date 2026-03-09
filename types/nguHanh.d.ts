

export type NguHanhType = "kim" | "moc" | "thuy" | "hoa" | "tho"
export type NguHanh = {
    [key in NguHanhType]: {
        value: number
    }
}

export type AbilityName = "sucLuc" | "tamLuc" | "canhGiac" | "chuTam" | "tocDo"
export type Ability = {
    [key in AbilityName]: {
        value: number
    }
}