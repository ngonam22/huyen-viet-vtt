/**
 * Cấu hình tham khảo cho 12 Hệ Phái (Thập Nhị Học Viện).
 * progressionReqs / curriculum / privileges theo rulebook v0.8.4 (Chương 4).
 * Bậc-6 không có điều kiện kỹ năng — chỉ cần đủ Tu Vi.
 */
import { HePhai } from "../../../types/hePhai";

export const HE_PHAI: Record<string, HePhai> = {
    tinhLyYSu: {
        id: 'tinhLyYSu',
        ten: 'BOILERPLATE.MonPhai.tinhLyYSu.label',
        category: 'thapNhiHocVien',
        bonusSkills: ['yDuoc', 'voThuat'],
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
            2: { yDuoc: 2 },
            3: { yDuoc: 3 },
            4: { yDuoc: 4 },
            5: { yDuoc: 5 },
        },
        curriculum: ['voKy', 'kyNghe', 'nghiThuc'],
        privileges: {
            1: [{ category: 'tamThuat', maxLevel: 1 }, { id: 'dieuDuong' }],
            // 2: Cường Thể (Cấp-3), Trí Dụng Chi Minh (Cấp-3) — chờ catalog cấp 3
            3: [{ category: 'tamThuat', maxLevel: 3 }],
            // 4: Phục Thể (Cấp-5) — chờ catalog cấp 5
        },
        initItems: [
            {id: 'hanh-phuc', quantity: 1},
            {id: 'giap-da', quantity: 1},
            {id: 'viet-kiem', quantity: 1},
            {id: 'bo-hanh-tau', quantity: 1},
            {id: 'bo-y-cu', quantity: 1},
        ]
    },
    sanhCuuLanhQuan: {
        id: 'sanhCuuLanhQuan',
        ten: 'BOILERPLATE.MonPhai.sanhCuuLanhQuan.label',
        category: 'thapNhiHocVien',
        bonusSkills: ['binhPhap', 'lanhDao'],
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
            2: { binhPhap: 2 },
            3: { binhPhap: 3 },
            4: { binhPhap: 4 },
            5: { binhPhap: 5 },
        },
        curriculum: ['voKy', 'tamThuat', 'nghiThuc'],
        privileges: {
            1: [{ category: 'tamThuat', maxLevel: 2 }],
            2: [{ category: 'tamThuat', maxLevel: 3 }],
            3: [{ category: 'tamThuat', maxLevel: 4 }],
            4: [{ category: 'tamThuat', maxLevel: 5 }],
        },
        initItems: [
            {id: 'hanh-phuc', quantity: 1},
            {id: 'ao-xich', quantity: 1},
            {id: 'viet-kiem', quantity: 1},
            {id: 'thuong', quantity: 1},
            {id: 'cung', quantity: 1},
            {id: 'ten', quantity: 1},
            {id: 'bo-hanh-tau', quantity: 1},
        ]
    },
    duongTanPhucMaSu: {
        id: 'duongTanPhucMaSu',
        ten: 'BOILERPLATE.MonPhai.duongTanPhucMaSu.label',
        category: 'thapNhiHocVien',
        bonusSkills: [], // TODO: chờ bổ sung
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
            2: { thanHoc: 2 },
            3: { thanHoc: 3 },
            4: { thanHoc: 4 },
            5: { thanHoc: 5 },
        },
        curriculum: ['voKy', 'linhThuat', 'nghiThuc'],
        privileges: {
            1: [{ id: 'phoQuangHoaGiapThuat' }, { id: 'tranMaPhongTaThuat' }],
            2: [{ category: 'tamThuat', maxLevel: 1 }],
            // 3: Xích Lôi Thuật (Cấp-4) — chờ catalog cấp 4
            // 4: Xích Lôi Thiên Hỏa Hóa Khí Đại Thuật (Cấp-5) — chờ catalog cấp 5
            4: [{ category: 'tamThuat', maxLevel: 2 }],
        },
        initItems: [
            {id: 'giao-bao', quantity: 1},
            {id: 'viet-kiem', quantity: 1},
            {id: 'bo-hanh-tau', quantity: 1},
            {id: 'phu-thu', quantity: 1},
            {id: 'bo-hoa-trang', quantity: 1},
        ]
    },
    minhHaoNgheSu: {
        id: 'minhHaoNgheSu',
        ten: 'BOILERPLATE.MonPhai.minhHaoNgheSu.label',
        category: 'thapNhiHocVien',
        bonusSkills: ['myThuat', 'thoiTrang', 'bieuDien', 'renDuc'],
        bonusSkillsChoose: 2,
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
        // Rulebook: "Nghệ Đạo bậc N" — chỉ cần 1 kỹ năng nhóm Nghệ Đạo đạt
        progressionReqs: {
            2: { myThuat: 2, thoiTrang: 2, bieuDien: 2, renDuc: 2 },
            3: { myThuat: 3, thoiTrang: 3, bieuDien: 3, renDuc: 3 },
            4: { myThuat: 4, thoiTrang: 4, bieuDien: 4, renDuc: 4 },
            5: { myThuat: 5, thoiTrang: 5, bieuDien: 5, renDuc: 5 },
        },
        progressionReqsMode: 'any',
        curriculum: ['kyNghe', 'tamThuat', 'nghiThuc'],
        initItems: [
            {id: 'hanh-phuc', quantity: 1},
            {id: 'le-phuc', quantity: 1},
            {id: 'viet-kiem', quantity: 1},
            {id: 'bo-tra-dao', quantity: 1},
            {id: 'bo-thu-phap', quantity: 1},
        ]
    },
    thuongLienLinhSi: {
        id: 'thuongLienLinhSi',
        ten: 'BOILERPLATE.MonPhai.thuongLienLinhSi.label',
        category: 'thapNhiHocVien',
        bonusSkills: [], // TODO: chờ bổ sung
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
            2: { thanHoc: 2 },
            3: { thanHoc: 3 },
            4: { thanHoc: 4 },
            5: { thanHoc: 5 },
        },
        curriculum: ['linhThuat', 'tamThuat', 'nghiThuc'],
        initItems: [
            {id: 'hanh-phuc', quantity: 1},
            {id: 'giao-phuc', quantity: 1},
            {id: 'viet-kiem', quantity: 1},
            {id: 'dao-gam', quantity: 1},
            {id: 'bo-boi-que', quantity: 1},
            {id: 'phu-thu', quantity: 1},
        ]
    },
    tienViThuongSi: {
        id: 'tienViThuongSi',
        ten: 'BOILERPLATE.MonPhai.tienViThuongSi.label',
        category: 'thapNhiHocVien',
        bonusSkills: ['leDao', 'thuongNghiep'],
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
            2: { thuongNghiep: 2 },
            3: { thuongNghiep: 3 },
            4: { thuongNghiep: 4 },
            5: { thuongNghiep: 5 },
        },
        curriculum: ['voKy', 'tamThuat', 'nghiThuc'],
        initItems: [
            {id: 'hanh-phuc', quantity: 1},
            {id: 'le-phuc', quantity: 1},
            {id: 'viet-kiem', quantity: 1},
            {id: 'cung-ngan', quantity: 1},
            {id: 'ten', quantity: 1},
            {id: 'bo-thu-phap', quantity: 1},
            {id: 'bo-hanh-tau', quantity: 1},
        ]
    },
    nghiVoKySi: {
        id: 'nghiVoKySi',
        ten: 'BOILERPLATE.MonPhai.nghiVoKySi.label',
        category: 'thapNhiHocVien',
        bonusSkills: ['theThuat', 'sinhTon'],
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
            2: { sinhTon: 2 },
            3: { sinhTon: 3 },
            4: { sinhTon: 4 },
            5: { sinhTon: 5 },
        },
        curriculum: ['voKy', 'tamThuat'],
        initItems: [
            {id: 'hanh-phuc', quantity: 1},
            {id: 'viet-kiem', quantity: 1},
            {id: 'thuong', quantity: 1},
            {id: 'giap-xich', quantity: 1},
            {id: 'cung', quantity: 1},
            {id: 'ten', quantity: 1},
            {id: 'bo-hanh-tau', quantity: 1},
        ]
    },
    thuyMinhThietTuong: {
        id: 'thuyMinhThietTuong',
        ten: 'BOILERPLATE.MonPhai.thuyMinhThietTuong.label',
        category: 'thapNhiHocVien',
        bonusSkills: ['renDuc', 'theThuat'],
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
            2: { renDuc: 2 },
            3: { renDuc: 3 },
            4: { renDuc: 4 },
            5: { renDuc: 5 },
        },
        curriculum: ['kyNghe', 'voKy', 'nghiThuc'],
        initItems: [
            {id: 'hanh-phuc', quantity: 1},
            {id: 'viet-kiem', quantity: 1},
            {id: 'bua-ren', quantity: 1},
            {id: 'ao-xich', quantity: 1},
            {id: 'bo-dung-cu-ren', quantity: 1},
            {id: 'bo-hanh-tau', quantity: 1},
        ]
    },
    thiHuanThamLamQuan: {
        id: 'thiHuanThamLamQuan',
        ten: 'BOILERPLATE.MonPhai.thiHuanThamLamQuan.label',
        category: 'thapNhiHocVien',
        bonusSkills: [], // TODO: chờ bổ sung
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
            2: { thanHoc: 2 },
            3: { thanHoc: 3 },
            4: { thanHoc: 4 },
            5: { thanHoc: 5 },
        },
        curriculum: ['linhThuat', 'tamThuat', 'nghiThuc'],
        initItems: [
            {id: 'hanh-phuc', quantity: 1},
            {id: 'viet-kiem', quantity: 1},
            {id: 'thuong', quantity: 1},
            {id: 'ao-xich', quantity: 1},
            {id: 'cung', quantity: 1},
            {id: 'ten', quantity: 1},
            {id: 'bo-hanh-tau', quantity: 1},
        ]
    },
    dienHauChinhSi: {
        id: 'dienHauChinhSi',
        ten: 'BOILERPLATE.MonPhai.dienHauChinhSi.label',
        category: 'thapNhiHocVien',
        bonusSkills: ['chinhTri', 'vanTu'],
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
            2: { chinhTri: 2 },
            3: { chinhTri: 3 },
            4: { chinhTri: 4 },
            5: { chinhTri: 5 },
        },
        curriculum: ['tamThuat', 'voKy', 'nghiThuc'],
        initItems: [
            {id: 'hanh-phuc', quantity: 1},
            {id: 'le-phuc', quantity: 1},
            {id: 'viet-kiem', quantity: 1},
            {id: 'dao-gam', quantity: 1},
            {id: 'bo-thu-phap', quantity: 1},
            {id: 'bo-hanh-tau', quantity: 1},
        ]
    },
    tuyetLuatThamTu: {
        id: 'tuyetLuatThamTu',
        ten: 'BOILERPLATE.MonPhai.tuyetLuatThamTu.label',
        category: 'thapNhiHocVien',
        bonusSkills: ['hacNghiep', 'tamY'],
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
            2: { vanTu: 2 },
            3: { vanTu: 3 },
            4: { vanTu: 4 },
            5: { vanTu: 5 },
        },
        curriculum: ['voKy', 'tamThuat'],
        initItems: [
            {id: 'hanh-phuc', quantity: 1},
            {id: 'le-phuc', quantity: 1},
            {id: 'viet-kiem', quantity: 1},
            {id: 'doan-gam', quantity: 1},
            {id: 'bo-thu-phap', quantity: 1},
            {id: 'so-ghi-chep', quantity: 1},
            {id: 'bo-hanh-tau', quantity: 1},
        ]
    },
    haoGioiHungSi: {
        id: 'haoGioiHungSi',
        ten: 'BOILERPLATE.MonPhai.haoGioiHungSi.label',
        category: 'thapNhiHocVien',
        bonusSkills: ['theThuat', 'sinhTon'],
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
            2: { theThuat: 2 },
            3: { theThuat: 3 },
            4: { theThuat: 4 },
            5: { theThuat: 5 },
        },
        curriculum: ['voKy', 'tamThuat'],
        initItems: [
            {id: 'hanh-phuc', quantity: 1},
            {id: 'viet-kiem', quantity: 1},
            {id: 'dai-dao', quantity: 1},
            {id: 'giap-xich', quantity: 1},
            {id: 'cung', quantity: 1},
            {id: 'ten', quantity: 1},
            {id: 'bo-hanh-tau', quantity: 1},
        ]
    }
};
