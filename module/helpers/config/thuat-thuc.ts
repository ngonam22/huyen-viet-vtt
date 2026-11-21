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
import { VO_KY } from "./thuat-thuc/vo-ky";
import { TAM_THUAT } from "./thuat-thuc/tam-thuat";
import { KY_NGHE } from "./thuat-thuc/ky-nghe";
import { NGHI_THUC } from "./thuat-thuc/nghi-thuc";
import { LINH_THUAT } from "./thuat-thuc/linh-thuat";
import { KHI_THUAT } from "./thuat-thuc/khi-thuat";
import { MA_THUAT } from "./thuat-thuc/ma-thuat";
import { AM_KY } from "./thuat-thuc/am-ky";

export const THUAT_THUC_CATEGORIES = [
    "voKy",
    "tamThuat",
    "kyNghe",
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
    "loiTinh",
    "thienDien",
    "thienHoan",
    "thinhGiac",
    "ngonNgu",
    "phucHoi",
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
 * Catalog Thuật Thức Cấp-1 và Cấp-2 theo rulebook v0.8.4 (Chương 5).
 * Text viết thẳng tiếng Việt (localize() trả nguyên chuỗi). Cấp-3+ chưa transcribe.
 */
export const THUAT_THUC: ThuatThuc[] = [
    ...VO_KY,
    ...TAM_THUAT,
    ...KY_NGHE,
    ...NGHI_THUC,
    ...LINH_THUAT,
    ...KHI_THUAT,
    ...MA_THUAT,
    ...AM_KY,
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
