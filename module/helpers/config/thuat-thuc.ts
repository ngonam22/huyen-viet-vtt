/**
 * Thuật Thức (Techniques & Spells) configuration.
 * See specs/spec_thuat_thuc.md
 */
import type {
    ThuatThuc,
    ThuatThucCategory,
    VoKySubcategory,
    ThuatThucTrait,
    UsageFrequency,
} from "../../../types/thuatThuc";
import { BOILERPLATE } from "./base";

export const THUAT_THUC_CATEGORIES = [
    "voKy",
    "tamThuat",
    "linhThuat",
    "nghiThuc",
    "khiThuat",
    "maThuat",
    "amKy",
] as const satisfies readonly ThuatThucCategory[];

export const THUAT_THUC_SUBCATEGORIES_VO_KY = [
    "toanDung",
    "canChien",
    "xaChien",
    "thanPhap",
] as const satisfies readonly VoKySubcategory[];

export const THUAT_THUC_TRAITS = [
    "hanhDong",
    "congKich",
    "muuKe",
    "hoTro",
    "diChuyen",
    "dinhKy",
    "chiThanh",
    "phanUng",
    "hoaHanh",
    "thoHanh",
    "kimHanh",
    "thuyHanh",
    "mocHanh",
    "nguHanh",
    "tieuHanh",
    "daiHanh",
    "nguHop",
    "hoaTinh",
    "thoTinh",
    "kimTinh",
    "thuyTinh",
    "mocTinh",
    "hoaKhi",
    "hoaThe",
    "nguyenChu",
    "maThuat",
    "dacBiet",
] as const satisfies readonly ThuatThucTrait[];

export const THUAT_THUC_USAGE_FREQUENCIES = [
    "unlimited",
    "perTurn",
    "perRound",
    "perScene",
    "perSession",
    "perDay",
    "perWeek",
    "perCampaign",
    "perOpportunity",
] as const satisfies readonly UsageFrequency[];

export const THUAT_THUC_XP_COST_DEFAULT = 3;

/**
 * Seed catalog — Level 1 samples (one per phân hệ; two for Võ Kỹ).
 * Full Level-1 catalog transcription is deferred — see spec §13.
 */
export const THUAT_THUC: ThuatThuc[] = [
    {
        id: "hoaKhiThuc",
        name: "BOILERPLATE.ThuatThuc.hoaKhiThuc.name",
        category: "voKy",
        subcategory: "toanDung",
        level: 1,
        element: "hoa",
        traits: ["chiThanh", "hoaHanh"],
        condition: "BOILERPLATE.ThuatThuc.hoaKhiThuc.condition",
        usage: { frequency: "unlimited", maxUses: 1 },
        prerequisites: { elements: { hoa: 1 }, skills: { voThuat: 1 } },
        xpCost: THUAT_THUC_XP_COST_DEFAULT,
        sincerityEffects: [
            {
                cost: "1+ Hỏa",
                element: "hoa",
                text: "BOILERPLATE.ThuatThuc.hoaKhiThuc.sincerity.1",
            },
        ],
        description: "BOILERPLATE.ThuatThuc.hoaKhiThuc.desc",
    },
    {
        id: "phiKhiThuc",
        name: "BOILERPLATE.ThuatThuc.phiKhiThuc.name",
        category: "voKy",
        subcategory: "toanDung",
        level: 1,
        traits: ["hanhDong", "congKich"],
        skillCheck: "BOILERPLATE.ThuatThuc.phiKhiThuc.skillCheck",
        difficulty: "2",
        range: "BOILERPLATE.ThuatThuc.phiKhiThuc.range",
        usage: { frequency: "unlimited", maxUses: 1 },
        prerequisites: { skills: { voThuat: 1 } },
        xpCost: THUAT_THUC_XP_COST_DEFAULT,
        primaryEffect: "BOILERPLATE.ThuatThuc.phiKhiThuc.primaryEffect",
        sincerityEffects: [
            {
                cost: "1+",
                text: "BOILERPLATE.ThuatThuc.phiKhiThuc.sincerity.1",
            },
        ],
        description: "BOILERPLATE.ThuatThuc.phiKhiThuc.desc",
    },
    {
        id: "themDoanNangLuc",
        name: "BOILERPLATE.ThuatThuc.themDoanNangLuc.name",
        category: "tamThuat",
        level: 1,
        element: "kim",
        traits: ["chiThanh", "kimHanh"],
        condition: "BOILERPLATE.ThuatThuc.themDoanNangLuc.condition",
        usage: { frequency: "unlimited", maxUses: 1 },
        prerequisites: { elements: { kim: 1 } },
        xpCost: THUAT_THUC_XP_COST_DEFAULT,
        sincerityEffects: [
            {
                cost: "1+ Kim",
                element: "kim",
                text: "BOILERPLATE.ThuatThuc.themDoanNangLuc.sincerity.1",
            },
            {
                cost: "2 Kim",
                element: "kim",
                text: "BOILERPLATE.ThuatThuc.themDoanNangLuc.sincerity.2",
            },
        ],
        description: "BOILERPLATE.ThuatThuc.themDoanNangLuc.desc",
    },
    {
        id: "nghiThucTruTa",
        name: "BOILERPLATE.ThuatThuc.nghiThucTruTa.name",
        category: "nghiThuc",
        level: 1,
        traits: ["hanhDong", "dinhKy", "nguHanh"],
        skillCheck: "BOILERPLATE.ThuatThuc.nghiThucTruTa.skillCheck",
        difficulty: "4",
        range: "BOILERPLATE.ThuatThuc.nghiThucTruTa.range",
        usage: { frequency: "unlimited", maxUses: 1 },
        prerequisites: { skills: { thanHoc: 1 } },
        xpCost: THUAT_THUC_XP_COST_DEFAULT,
        primaryEffect: "BOILERPLATE.ThuatThuc.nghiThucTruTa.primaryEffect",
        sincerityEffects: [
            { cost: "1", text: "BOILERPLATE.ThuatThuc.nghiThucTruTa.sincerity.1" },
            { cost: "1+", text: "BOILERPLATE.ThuatThuc.nghiThucTruTa.sincerity.2" },
            { cost: "1+", text: "BOILERPLATE.ThuatThuc.nghiThucTruTa.sincerity.3" },
        ],
        description: "BOILERPLATE.ThuatThuc.nghiThucTruTa.desc",
    },
    {
        id: "hoaDiemChiThuat",
        name: "BOILERPLATE.ThuatThuc.hoaDiemChiThuat.name",
        category: "linhThuat",
        level: 1,
        element: "hoa",
        traits: ["hanhDong", "congKich", "hoaHanh", "hoaKhi", "hoaTinh"],
        skillCheck: "BOILERPLATE.ThuatThuc.hoaDiemChiThuat.skillCheck",
        difficulty: "3",
        range: "BOILERPLATE.ThuatThuc.hoaDiemChiThuat.range",
        duration: "BOILERPLATE.ThuatThuc.hoaDiemChiThuat.duration",
        usage: { frequency: "unlimited", maxUses: 1 },
        prerequisites: { elements: { hoa: 1 }, skills: { thanHoc: 1 } },
        xpCost: THUAT_THUC_XP_COST_DEFAULT,
        primaryEffect: "BOILERPLATE.ThuatThuc.hoaDiemChiThuat.primaryEffect",
        sincerityEffects: [
            {
                cost: "1+ Hỏa",
                element: "hoa",
                text: "BOILERPLATE.ThuatThuc.hoaDiemChiThuat.sincerity.1",
            },
        ],
        description: "BOILERPLATE.ThuatThuc.hoaDiemChiThuat.desc",
    },
    {
        id: "hoaKhiQuyen",
        name: "BOILERPLATE.ThuatThuc.hoaKhiQuyen.name",
        category: "khiThuat",
        level: 1,
        element: "hoa",
        traits: ["hanhDong", "congKich", "hoTro", "hoaHanh", "hoaTinh"],
        skillCheck: "BOILERPLATE.ThuatThuc.hoaKhiQuyen.skillCheck",
        difficulty: "2",
        range: "BOILERPLATE.ThuatThuc.hoaKhiQuyen.range",
        duration: "BOILERPLATE.ThuatThuc.hoaKhiQuyen.duration",
        usage: { frequency: "unlimited", maxUses: 1 },
        prerequisites: { elements: { hoa: 1 }, skills: { voThuat: 1 } },
        xpCost: THUAT_THUC_XP_COST_DEFAULT,
        primaryEffect: "BOILERPLATE.ThuatThuc.hoaKhiQuyen.primaryEffect",
        description: "BOILERPLATE.ThuatThuc.hoaKhiQuyen.desc",
    },
    {
        id: "maLinhNguyenChu",
        name: "BOILERPLATE.ThuatThuc.maLinhNguyenChu.name",
        category: "maThuat",
        level: 1,
        maHoa: true,
        traits: ["hanhDong", "congKich", "muuKe", "nguHanh", "maThuat", "nguyenChu"],
        skillCheck: "BOILERPLATE.ThuatThuc.maLinhNguyenChu.skillCheck",
        difficulty: "BOILERPLATE.ThuatThuc.maLinhNguyenChu.difficulty",
        range: "BOILERPLATE.ThuatThuc.maLinhNguyenChu.range",
        usage: { frequency: "unlimited", maxUses: 1 },
        prerequisites: { skills: { thanHoc: 1 } },
        xpCost: THUAT_THUC_XP_COST_DEFAULT,
        primaryEffect: "BOILERPLATE.ThuatThuc.maLinhNguyenChu.primaryEffect",
        sincerityEffects: [
            { cost: "1+", text: "BOILERPLATE.ThuatThuc.maLinhNguyenChu.sincerity.1" },
            { cost: "1+", text: "BOILERPLATE.ThuatThuc.maLinhNguyenChu.sincerity.2" },
        ],
        description: "BOILERPLATE.ThuatThuc.maLinhNguyenChu.desc",
    },
    {
        id: "tiemHanhBo",
        name: "BOILERPLATE.ThuatThuc.tiemHanhBo.name",
        category: "amKy",
        level: 1,
        element: "kim",
        traits: ["chiThanh", "kimHanh"],
        condition: "BOILERPLATE.ThuatThuc.tiemHanhBo.condition",
        usage: { frequency: "unlimited", maxUses: 1 },
        prerequisites: { elements: { kim: 1 }, skills: { hacNghiep: 1 } },
        xpCost: THUAT_THUC_XP_COST_DEFAULT,
        sincerityEffects: [
            {
                cost: "1 Kim",
                element: "kim",
                text: "BOILERPLATE.ThuatThuc.tiemHanhBo.sincerity.1",
            },
        ],
        description: "BOILERPLATE.ThuatThuc.tiemHanhBo.desc",
    },
];

/**
 * Lookup map for fast access by id.
 */
export const THUAT_THUC_BY_ID: Record<string, ThuatThuc> = Object.fromEntries(
    THUAT_THUC.map((t) => [t.id, t])
);

BOILERPLATE.thuatThuc = {
    categories: THUAT_THUC_CATEGORIES,
    subcategoriesVoKy: THUAT_THUC_SUBCATEGORIES_VO_KY,
    traits: THUAT_THUC_TRAITS,
    usageFrequencies: THUAT_THUC_USAGE_FREQUENCIES,
    catalog: THUAT_THUC,
    byId: THUAT_THUC_BY_ID,
};
