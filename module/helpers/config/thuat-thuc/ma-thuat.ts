import type { ThuatThuc } from "../../../../types/thuatThuc";

/** Ma Chú Thuật (Ma Thuật) — Cấp-1 & Cấp-2. Source: specs/rule_book_v0.8.4.md */
export const MA_THUAT: ThuatThuc[] = [
    {
        id: "maLinhNguyenChu",
        name: "Ma Linh Nguyền Chú",
        category: "maThuat",
        level: 1,
        maHoa: true,
        traits: ["hanhDong", "congKich", "muuKe", "nguHanh", "maThuat", "nguyenChu"],
        skillCheck: "Thần Học. Hành phương bất kỳ",
        difficulty: "Cảnh Giác của đối tượng",
        range: "1 đối tượng, phạm vi tiếp xúc",
        primaryEffect:
            "<p><strong>Thành công:</strong> Đối tượng có Hành khắc xuất với Hành của bài xét rơi vào trạng thái “Nhiễm ma”</p>" +
            "<p>Ví dụ: Ma Linh Nguyền Chú (Kim) sẽ khiến Hành Mộc của đối phương bị “Nhiễm ma”</p>",
        sincerityEffects: [
            { cost: "1+", text: "tăng phạm vi lên +1-bộ." },
            { cost: "1+", text: "Ma thuật ảnh hưởng lên thêm một đối tượng có Độ Cảnh Giác bằng hoặc thấp hơn đối tượng chính." },
        ],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "suuThanKhongTamChu",
        name: "Sưu Thần Khống Tâm Chú",
        category: "maThuat",
        level: 1,
        element: "kim",
        maHoa: true,
        traits: ["hanhDong", "congKich", "muuKe", "kimHanh", "maThuat", "nguyenChu"],
        skillCheck: "Thần Học (Kim)",
        difficulty: "Cảnh Giác của đối tượng",
        range: "1 đối tượng, phạm vi 6-bộ",
        duration: "Số vòng đấu bằng với cấp bậc Kim hành của nhân vật",
        primaryEffect:
            "<p><strong>Thành công:</strong> Đối tượng có thần trí bị trấn áp nghiêm trọng, trong thời gian hiệu quả của Ma Chú, đối tượng phải thành thật trả lời những câu hỏi của nhân vật.</p>",
        sincerityEffects: [
            {
                cost: "2 Kim",
                element: "kim",
                text: "Đối tượng mất đi ký ức của sự việc diễn ra trong thời gian hiệu quả của Ma Pháp, từ câu hỏi cho đến câu trả lời, như một giấc mộng cực kỳ mơ hồ.",
            },
            {
                cost: "3 Kim",
                element: "kim",
                text: "Nhân vật có thể ban một mệnh lệnh đơn giản cho đối tượng, thời hạn của mệnh lệnh này là số cảnh bằng với cấp bậc Kim Hành của nhân vật. Đối tượng có thể chống đối lại mệnh lệnh này, nhưng phải nhận tổn hại Tâm Lực bằng với cấp bậc Kim Hành của nhân vật ở cuối mỗi cảnh. Nếu đối tượng rơi vào trạng thái Loạn Tâm chống đối lại mệnh lệnh này, đối tượng đó phải lập tức phát tiết, thực hiện mệnh lệnh của nhân vật cho đến cuối cảnh đó. Sau đó, mệnh lệnh sẽ mất hiệu lực.",
            },
        ],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "dienCuongSatGioiChu",
        name: "Điên Cuồng Sát Giới Chú",
        category: "maThuat",
        level: 1,
        element: "hoa",
        maHoa: true,
        traits: ["hanhDong", "hoTro", "muuKe", "hoaHanh", "maThuat", "nguyenChu"],
        skillCheck: "Thần Học",
        difficulty: "Cảnh Giác của đối tượng",
        range: "1 đối tượng, phạm vi 6-bộ",
        duration: "Kết thúc cảnh",
        primaryEffect:
            "<p><strong>Thành công:</strong> Đối tượng rơi vào trạng thái “Cuồng Nộ”. Trong thời gian hiệu quả của Ma Pháp, nếu đối tượng có Hành Khí bị Ma Hóa, đối tượng đó có thể nghịch chuyển hiệu ứng sở đoản thành sở trường đối với các bài xét năng lực liên quan đến Hành Khí đó.</p>",
        sincerityEffects: [
            {
                cost: "1+ Hỏa",
                element: "hoa",
                text: "Ma Pháp ảnh hưởng thêm một đối tượng trong phạm vi có Độ Cảnh Giác thấp hơn hoặc bằng với đối tượng chính.",
            },
            {
                cost: "2 Hỏa",
                element: "hoa",
                text: "Giảm Tâm Lực của mỗi đối tượng một lượng bằng với cấp bậc Hỏa Hành của nhân vật, và tăng cường Sức Lực tối đa và Sức Lực hiện tại một lượng tương tự.",
            },
        ],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "khoHaiMaChu",
        name: "Khổ Hải Ma Chú",
        category: "maThuat",
        level: 1,
        element: "thuy",
        maHoa: true,
        traits: ["hanhDong", "congKich", "thuyHanh", "maThuat", "nguyenChu"],
        skillCheck: "Thần Học (Thủy)",
        difficulty: "Cảnh Giác của đối tượng",
        range: "1 đối tượng, phạm vi 3-bộ",
        duration: "lập tức",
        primaryEffect:
            "<p><strong>Thành công:</strong> Gây tổn thương nghiêm trọng lên thể xác. Đối tượng nhận sát thương siêu nhiên bằng với cấp bậc Thủy Hành của nhân vật cộng với số lượng Hành Khí bị Nhiễm Ma của đối tượng.</p>",
        sincerityEffects: [
            {
                cost: "1+ Thủy",
                element: "thuy",
                text: "Ma Pháp ảnh hưởng thêm một đối tượng trong phạm vi có Độ Cảnh Giác thấp hơn hoặc bằng với đối tượng chính.",
            },
            {
                cost: "1 Thủy",
                element: "thuy",
                text: "Một đối tượng phải thực hiện xét Thể Thuật với Độ Khó 4 (Thổ 2, Hỏa 5) để không rơi vào một trong các trạng thái sau do nhân vật chọn: “Choáng váng”, “Lạc hướng”, “Câm lặng”",
            },
            {
                cost: "1 Thủy",
                element: "thuy",
                text: "Một đối tượng phải thực hiện xét Thể Thuật với Độ Khó 4 (Thổ 2, Hỏa 5) để không rơi vào một trong các trạng thái sau do nhân vật chọn: “Xuất huyết”, “Định thân”, “Tổn thương” một Hành cho nhân vật chọn.",
            },
        ],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "khoiTuMaChu",
        name: "Khởi Tử Ma Chú",
        category: "maThuat",
        level: 1,
        element: "tho",
        maHoa: true,
        traits: ["hanhDong", "hoTro", "muuKe", "thoHanh", "maThuat", "nguyenChu", "hoaThe"],
        skillCheck: "Thần Học",
        difficulty: "3",
        range: "1 thi thể, phạm vi 6-bộ",
        duration: "Đặc biệt",
        primaryEffect:
            "<p><strong>Thành công:</strong> Thi thể trở thành Thi Quỷ, địa hình 2-bộ xung quanh nơi thi thể khởi tử có tính trạng “Nhiễm Ma”. Những Thi Quỷ này tồn tại cho tới khi bị tiêu diệt.</p>",
        sincerityEffects: [
            { cost: "1+ Thổ", element: "tho", text: "Ma thuật có thể ảnh hưởng lên thêm một thi thể." },
            { cost: "1+ Thổ", element: "tho", text: "Mỗi thi thể có Sức Lực tối đa tăng thêm +1." },
            {
                cost: "2 Thổ",
                element: "tho",
                text: "Một lần mỗi vòng đấu, một thi thể có thể sử dụng cấp bậc kỹ năng của Tà Linh Sư thay thế để thực hiện bài xét năng lực.",
            },
            { cost: "2 Thổ", element: "tho", text: "Thi thể bị nguyền chú trở thành Đại Thi Quỷ thay vì Thi Quỷ." },
        ],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
];
