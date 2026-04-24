/**
 * Cấu hình tham khảo cho 12 Môn Phái (Thập Nhị Học Viện).
 * Lưu ý: Các field progressionReqs chứa data mẫu, dự kiến được điền đầy đủ
 * các yêu cầu theo đúng chuẩn của Rulebook sau này.
 */
import { MonPhai } from "../../../types/monPhai";

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
