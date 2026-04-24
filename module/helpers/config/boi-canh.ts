/**
 * Bối Cảnh configuration.
 */
import { BoiCanh } from "../../../types/boiCanh";

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
