import type { ThuatThuc } from "../../../../types/thuatThuc";

/** Ám Kỹ — Cấp-1 & Cấp-2. Source: specs/rule_book_v0.8.4.md */
export const AM_KY: ThuatThuc[] = [
    {
        id: "tiemHanhBo",
        name: "Tiềm Hành Bộ",
        category: "amKy",
        level: 1,
        element: "kim",
        traits: ["chiThanh", "kimHanh"],
        condition:
            "nhân vật trong địa hình “Che Phủ”, nơi đông người, hoặc những trường hợp khác hỗ trợ khả năng ẩn tránh.",
        sincerityEffects: [
            {
                cost: "1 Kim",
                element: "kim",
                text: "Nhân vật trở nên “ẩn thân” đối với một đối tượng có Độ Cảnh Giác bằng hoặc thấp hơn cấp độ Hắc Nghiệp của bản thân.",
            },
        ],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "docThuAmKichThuc",
        name: "Độc Thủ Ám Kích Thức",
        category: "amKy",
        level: 2,
        element: "kim",
        traits: ["hanhDong", "congKich", "kimHanh"],
        skillCheck: "Võ Thuật (Kim Hành) với vũ khí cận chiến đương dụng có tính trạng “Kín đáo”",
        difficulty: "4",
        range: "1 đối tượng, phạm vi vũ khí",
        primaryEffect:
            "<p><strong>Thành công:</strong> Nhân vật bôi một liều độc dược lên vũ khí, sau đó Tấn Công đối tượng, gây sát thương của Vũ Khí và nhiễm độc đối phương.</p>",
        sincerityEffects: [
            {
                cost: "1+ Kim",
                element: "kim",
                text: "Nhân vật di chuyển 1-bộ với mỗi điểm chí thành dùng theo cách này.",
            },
        ],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
];
