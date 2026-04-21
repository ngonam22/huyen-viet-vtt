import type { HvElementKey, HvSkillKey } from "../module/helpers/config";

export type ThuatThucCategory =
    | "voKy"
    | "tamThuat"
    | "linhThuat"
    | "nghiThuc"
    | "khiThuat"
    | "maThuat"
    | "amKy";

export type VoKySubcategory = "toanDung" | "canChien" | "xaChien" | "thanPhap";

export type ThuatThucTrait =
    // Action traits
    | "hanhDong"
    | "congKich"
    | "muuKe"
    | "hoTro"
    | "diChuyen"
    | "dinhKy"
    // Timing
    | "chiThanh"
    | "phanUng"
    // Element (hành phương)
    | "hoaHanh"
    | "thoHanh"
    | "kimHanh"
    | "thuyHanh"
    | "mocHanh"
    | "nguHanh"
    | "tieuHanh"
    | "daiHanh"
    // Resource
    | "nguHop"
    // Supernatural properties
    | "hoaTinh"
    | "thoTinh"
    | "kimTinh"
    | "thuyTinh"
    | "mocTinh"
    | "hoaKhi"
    | "hoaThe"
    | "nguyenChu"
    | "maThuat"
    // Catch-all
    | "dacBiet";

export type UsageFrequency =
    | "unlimited"
    | "perTurn"
    | "perRound"
    | "perScene"
    | "perSession"
    | "perDay"
    | "perWeek"
    | "perCampaign"
    | "perOpportunity";

export type ThuatThucSource = "clan" | "xp" | "manual";

export interface UsageSpec {
    frequency: UsageFrequency;
    maxUses: number;
}

export interface Prerequisites {
    elements?: Partial<Record<HvElementKey, number>>;
    skills?: Partial<Record<HvSkillKey, number>>;
}

export interface SincerityEffect {
    cost: string;
    element?: HvElementKey;
    text: string;
}

export interface ThuatThuc {
    id: string;
    name: string;
    category: ThuatThucCategory;
    subcategory?: VoKySubcategory;
    level: 1 | 2 | 3 | 4 | 5 | 6;
    element?: HvElementKey;
    maHoa?: boolean;
    traits: ThuatThucTrait[];

    condition?: string;
    skillCheck?: string;
    difficulty?: string;
    range?: string;
    duration?: string;
    cost?: string;
    primaryEffect?: string;
    sincerityEffects?: SincerityEffect[];

    usage: UsageSpec;
    prerequisites?: Prerequisites;
    xpCost: number;

    description?: string;
}
