

export type NguHanhType = "kim" | "moc" | "thuy" | "hoa" | "tho"
export type NguHanh = {
    [key in NguHanhType]: {
        value: number
    }
}

export type AbilityName = "sucLuc" | "tamLuc" | "canhGiac" | "chuTam" | "tocDo"
export type Ability = {
    sucLuc: { base: number; value: number };
    tamLuc: { base: number; value: number };
    canhGiac: { value: number };
    chuTam: { value: number };
    tocDo: { value: number };
}