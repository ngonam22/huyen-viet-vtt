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
    sucLuc: { value: number };
    tamLuc: { value: number };
    canhGiac: { value: number };
    chuTam: { value: number };
    tocDo: { value: number };
    nguHop: { value: number };
}

export interface CharacterAttributes {
    level: { value: number };
}

export interface CharacterSchema {
    identity: CharacterIdentity;
    elements: NguHanh;
    skills: CharacterSkills;
    abilities: CharacterAbilities;
    attributes: CharacterAttributes;
    
    /** Lịch sử các nâng cấp đã áp dụng */
    upgrades: AppliedUpgrade[];
}
