import type { ThuatThuc } from "../../../../types/thuatThuc";

export const KY_NGHE: ThuatThuc[] = [
    {
        id: "bachVatTuyDung",
        name: "Bách Vật Tùy Dụng",
        category: "kyNghe",
        level: 1,
        element: "moc",
        traits: ["hanhDong", "hoTro", "mocHanh"],
        skillCheck: "Kỹ năng Nghệ Đạo hoặc Lao Động",
        range: "1 vật phẩm trong tầm tay",
        difficulty: "2",
        duration: "Đến khi kết thúc cảnh hiện tại",
        primaryEffect:
            "<p><strong>Thành công:</strong> Nhân vật ứng biến sử dụng nó như một một trang bị hoặc vật phẩm có Giá Trị 2 hoặc nhỏ hơn. Nó sẽ bị “Vỡ nát” ngay sau khi mỗi lần công năng của nó được sử dụng. Quản Trò quyết định tính khả thi của thuật thức này.</p>",
        sincerityEffects: [
            {
                cost: "1",
                element: "moc",
                text: "Vật phẩm bị “Hư hại” sau khi được sử dụng thay vì “Vỡ nát”.",
            },
            {
                cost: "1+",
                element: "moc",
                text: "Tăng Giá Trị tối đa có thể được ứng biến với mỗi chí thành sử dụng theo cách này, tới tối đa thành Giá Trị 5",
            },
            {
                cost: "3",
                element: "moc",
                text: "Vật phẩm không tự động trở nên “Hư hại” hoặc “Vỡ nát” do được sử dụng, nhưng vẫn có thể nhận các trạng thái trên do các tác nhân khác.",
            },
        ],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "congCuThuanThu",
        name: "Công Cụ Thuận Thủ",
        category: "kyNghe",
        level: 1,
        element: "kim",
        traits: ["hanhDong", "dinhKy", "kimHanh"],
        skillCheck: "Kỹ năng Nghệ Đạo hoặc Sinh Đạo",
        range: "1 bộ dụng cụ nghề nghiệp",
        difficulty: "2",
        duration: "Đến khi kết thúc cảnh tiếp theo",
        primaryEffect:
            "<p><strong>Thành công:</strong> Nhân vật chau chuốt bộ công cụ nghề nghiệp của mình, sẵn sàng cho lần sử dụng tiếp theo. Bài Xét năng lực đầu tiên sử dụng bộ công cụ này cho đến hết cảnh tiếp theo có Độ Khó giảm -1.</p>",
        sincerityEffects: [
            {
                cost: "2",
                element: "kim",
                text: "Lợi ích giảm Độ Khó áp dụng cho hai bài Xét đầu tiên thay vì một.",
            },
        ],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "khaiVatDacLieu",
        name: "Khai Vật Đắc Liệu",
        category: "kyNghe",
        level: 1,
        element: "kim",
        traits: ["hanhDong", "dinhKy", "kimHanh"],
        skillCheck: "Kỹ năng Nghệ Đạo hoặc Sinh Đạo",
        range: "Nguyên liệu đang được thu thập",
        difficulty: "Độ Hiếm của vật phẩm, nguyên liệu",
        primaryEffect:
            "<p><strong>Thành công:</strong> Nhân vật phân loại được thành phần tốt nhất trong nguyên liệu thu thập được, thành phần này được tính là có Giá Trị cao hơn 1 cấp cho mục đích Luyện Chế.</p>",
        sincerityEffects: [
            {
                cost: "2",
                element: "kim",
                text: "Phần nguyên liệu tốt này cũng được tính là có Độ Hiếm cao hơn 1 cấp cho mục đích Luyện Chế.",
            },
        ],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "thuongPhamDiemTinh",
        name: "Thương Phẩm Điểm Tinh",
        category: "kyNghe",
        level: 2,
        traits: ["hanhDong", "dinhKy", "nguHanh"],
        skillCheck:
            "Kỹ năng Thương Nghiệp để chỉnh sửa, đóng gói, trình bày hoặc hoàn thiện một thương phẩm do mình hoặc đồng minh chế tác.",
        difficulty: "3",
        primaryEffect:
            "<p><strong>Thành công:</strong> Món thương phẩm dễ dàng được đón nhận hơn, nó được tính là có Độ Hiếm thấp hơn 1 bậc khi tìm kiếm nguồn cầu (người mua).</p>",
        sincerityEffects: [
            {
                cost: "2",
                element: "hoa",
                text: "Món phần đóng gói của Thương phẩm có thêm tính trạng “Lễ Trọng” hoặc “Hoành Tráng”. Nhân vật tham gia tổ chức sự kiện phát hành thương phẩm ra thị trường được tăng thêm 1 tiểu cấp Danh Tiếng.",
            },
            {
                cost: "2",
                element: "kim",
                text: "Nếu thương phẩm có thành phần là cấm phẩm, bản chất của nó được ẩn giấu. Trừ trường hợp hậu quả rõ ràng, người nghi ngờ phải thực hiện xét kỹ năng phù hợp với Độ Khó bằng với cấp bậc Thương Nghiệp hoặc Hắc Nghiệp của nhân vật để phát hiện bản chất này.",
            },
            {
                cost: "2",
                element: "tho",
                text: "Thương phẩm có thiết kế vững chắc và phù hợp với quy chuẩn của luật pháp Đại Việt giảm chi phí vận chuyển, thất thoát, và tồn trữ thương phẩm. Nếu bài Xét được sử dụng, giảm Độ Khó -1.",
            },
            {
                cost: "2",
                element: "moc",
                text: "Quy mô của thương vụ này được tích hợp qua tiến độ của một Dự Án đang được tiến hành, thưởng Tiến Độ cho một Dự Án của nhân vật hoặc đồng minh một lượng điểm bằng với Giá Trị của thương phẩm, thay vì đóng góp vào Tài Phú của nhân vật.",
            },
            {
                cost: "2",
                element: "thuy",
                text: "Thương phẩm có thiết kế hài hòa tự nhiên, một lần mỗi cảnh, loại thương phẩm này có thể được sử dụng như một tế phẩm cho Linh Chú Thuật hoặc Nghi Thức sử dụng Thần Học.",
            },
        ],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "nhatHanhThienKhi",
        name: "Nhất Hành Thiện Khí",
        category: "kyNghe",
        level: 2,
        traits: ["hanhDong", "dinhKy", "nguHanh"],
        skillCheck: "Kỹ năng Rèn Đúc",
        range: "1 vũ khí hoặc bộ giáp trụ",
        difficulty: "3",
        duration: "Đến khi kết thúc cảnh tiếp theo.",
        primaryEffect:
            "<p><strong>Thành công:</strong> Nhân vật chuẩn bị quân trang của mình, sẵn sàng cho chiến trận sắp đến. Áp dụng một trong những hiệu ứng sau, tùy theo Hành phương được sử dụng:</p>" +
            "<ul>" +
            "<li><strong>Mộc Hành:</strong> Nhân vật đổi một tính trạng tích cực với một tính trạng tích cực khác, hoặc đổi một tính tính trạng tiêu cực với một tính trạng tiêu cực khác trên vật phẩm. Quản Trò quyết định tính hợp lý của sự đề xuất này.</li>" +
            "<li><strong>Hỏa Hành:</strong> Thêm một tính trạng hợp lý cho vật phẩm. Quản Trò quyết định tính khả năng của tính trạng được đề xuất.</li>" +
            "<li><strong>Thổ Hành:</strong> Giải bỏ trạng thái “Hư Hại” trên vật phẩm. Nếu không bị “Hư Hại”, thêm tính trạng “Bền Bỉ” cho vật phẩm.</li>" +
            "<li><strong>Kim Hành:</strong> Với vũ khí, tăng Sát Lực +1 điểm, Với giáp trụ, tăng chỉ số Kháng Lực vật lý hoặc siêu nhân +1 điểm.</li>" +
            "<li><strong>Thủy Hành:</strong> Bài Xét kế tiếp sử dụng vật phẩm này có Độ Khó giảm -1.</li>" +
            "</ul>",
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "tacPhamChamBiem",
        name: "Tác Phẩm Châm Biếm",
        category: "kyNghe",
        level: 2,
        element: "hoa",
        traits: ["chiThanh", "hoaHanh"],
        condition:
            "kỹ năng nhóm Nghệ Đạo (Hỏa) hoặc Văn Tự (Hỏa) để chế tác một nghệ phẩm",
        sincerityEffects: [
            {
                cost: "1+",
                element: "hoa",
                text: "lần đầu tiên khi đối tượng châm biếm đối diện với tác phẩm này, hắn bị giảm một lượng Tâm Lực bằng với lượng chí thành được sử dụng. Nếu điều này khiến đối tượng rơi vào trạng thái “Loạn Tâm”, đối tượng đó đồng thời rơi vào một trong bốn trạng thái sau: “Cuồng nộ”, “Lạc Hướng”, “Choáng Váng”, hoặc “Câm lặng” (Do nhân vật quyết định đi chế tác nghệ phẩm này). Tất cả những ai thấy tác phẩm này đều nhận ra tính xúc phạm, công kích cá nhân của nó.",
            },
        ],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "pheBinhTinhGia",
        name: "Phê Bình Tinh Gia",
        category: "kyNghe",
        level: 2,
        element: "kim",
        traits: ["chiThanh", "kimHanh"],
        condition:
            "Kỹ năng trong nhóm Nghệ Đạo (Kim) hoặc Văn Tự (Kim) để đánh giá một tác phẩm nghệ thuật",
        sincerityEffects: [
            {
                cost: "2+",
                element: "kim",
                text: "Với mỗi 2 điểm chí thành sử dụng theo cách này, nhân vật đoán được giá trị của một Hành của tác giả, hoặc người trình diễn. ( và ưu nhược điểm có tính trạng tinh thần nếu có)",
            },
            {
                cost: "2+",
                element: "kim",
                text: "Nếu tác giả hoặc người trình diễn là một NPC, nhân vật đoán biết được thái độ hành xử của họ.",
            },
        ],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "soCuu",
        name: "Sơ Cứu",
        category: "kyNghe",
        level: 1,
        traits: ["hanhDong", "hoTro", "nguHanh"],
        condition: "Yêu cầu: Nhân vật có trang bị dụng cụ y tế.",
        skillCheck: "Y Dược",
        difficulty: "3",
        range: "Tiếp xúc, 1 đối tượng trong trạng thái “Tổn Thương [Hành]”",
        primaryEffect:
            "<p>Nhân vật sơ cứu đối tượng bằng Y Dược của mình, sử dụng Hành mẫu sinh của Hành tổn thương trên đối tượng.</p>" +
            "<p><strong>Thành công:</strong> Hành bị tổn thương trở nên “ổn định”</p>",
        sincerityEffects: [
            {
                cost: "2",
                text: "Nhân vật giải trừ thêm trạng thái “Nhiễm ma” của Hành được sơ cứu.",
            },
            {
                cost: "2+",
                text: "Với mỗi 2 chí thành sử dụng theo phương thức này, nhân vật có thể cùng lúc sơ cứu thêm một đối tượng trong phạm vi.",
            },
            {
                cost: "2+",
                text: "Với mỗi 2 chí thành sử dụng theo phương thức này, nhân vật ổn định thêm Hành bị tổn thương kế tiếp theo chiều sinh của đối tượng. (Hỏa-> Thổ->Kim->Thủy->Mộc->Hỏa)",
            },
        ],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "dieuDuong",
        name: "Điều Dưỡng",
        category: "kyNghe",
        level: 2,
        element: "moc",
        traits: ["hanhDong", "dinhKy", "mocHanh"],
        condition: "Yêu cầu: Nhân vật có trang bị dụng cụ y tế.",
        skillCheck: "Y Dược",
        difficulty: "4",
        range: "Tiếp xúc, 1 đối tượng",
        primaryEffect:
            "<p><strong>Thành công:</strong> Đối tượng phục hồi Sức Lực gấp hai lần bình thường sau khi nghỉ dưỡng, và có Độ Khó của các bài xét năng lực để giải trừ trạng thái từ việc nghỉ dưỡng giảm -2. Hiệu quả đến khi kết thúc cảnh tiếp theo.</p>",
        sincerityEffects: [
            {
                cost: "2+",
                text: "Với mỗi 2 chí thành sử dụng theo phương thức này, nhân vật có thể cùng lúc điều dưỡng thêm một đối tượng trong phạm vi.",
            },
            {
                cost: "1+",
                text: "Kéo dài hiệu quả thêm 1 cảnh.",
            },
        ],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
];
