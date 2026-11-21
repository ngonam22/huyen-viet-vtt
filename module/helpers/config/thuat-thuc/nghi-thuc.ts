import type { ThuatThuc } from "../../../../types/thuatThuc";

export const NGHI_THUC: ThuatThuc[] = [
    {
        id: "nghiThucTruTa",
        name: "Nghi Thức Trừ Tà",
        category: "nghiThuc",
        level: 1,
        traits: ["hanhDong", "dinhKy", "nguHanh"],
        skillCheck: "Thần Học",
        difficulty: "4",
        range: "Số lượng cá thể tối đa bằng với cấp bậc Hành sử dụng trong phạm vi tiếp xúc",
        primaryEffect:
            "<p><strong>Thành công:</strong> Nhân vật giải trừ một trạng thái “Nhiễm Ma” trên cơ thể của đối tượng</p>",
        sincerityEffects: [
            {
                cost: "1",
                text: "Nếu một trong các đối tượng là thực thể “Ngoại giới”, nhân vật nhận ra điều này, nhưng không biết cụ thể là ai.",
            },
            {
                cost: "1+",
                text: "Tăng +1 số lượng đối tượng với mỗi chí thành sử dụng theo cách này.",
            },
            {
                cost: "1+",
                text: "Chuyển phạm vi thành hình cầu có bán kính bằng 2-bộ. Tăng bán kính thêm +2-bộ với mỗi Chí thành sử dụng theo cách này. Loại bỏ tính trạng “Nhiễm Tà” của địa hình trong phạm vi này trong thời hạn 1 ngày, (+1 ngày với mỗi Chí thành)",
            },
        ],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "nghiThucCauLinh",
        name: "Nghi Thức Cầu Linh",
        category: "nghiThuc",
        level: 1,
        traits: ["hanhDong", "dinhKy", "nguHanh"],
        skillCheck: "Thần Học",
        difficulty: "2",
        range: "Bản thân",
        duration: "Đến khi kết thúc cảnh hiện tại",
        primaryEffect:
            "<p><strong>Thành công:</strong> Nhân vật chọn một trong những lợi ích sau:</p>" +
            "<ul>" +
            "<li>Cảm Ứng Khí Linh: Nhân vật cảm nhận được hoạt động của Khí Linh và hiệu ứng của Linh Chú Thuật đang hoạt động trong phạm vi 10-bộ với mỗi cấp bậc Hành sử dụng.</li>" +
            "<li>Thông Linh Cầu Cơ: Khí Linh cung cấp một thông tin hữu ích cho nhân vật với tình cảnh xung quanh</li>" +
            "<li>Phước Lành Linh Giới: Khí Linh cung cấp nguyên liệu thô cho nhân vật tùy thuộc vào loại Khí Linh</li>" +
            "</ul>",
        sincerityEffects: [
            {
                cost: "2+",
                text: "Nhân vật nhận được thêm một lợi ích với mỗi 2 điểm chí thành (Tối đa 3 lợi ích).",
            },
        ],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "nghiThucToanMenh",
        name: "Nghi Thức Toán Mệnh",
        category: "nghiThuc",
        level: 1,
        traits: ["hanhDong", "dinhKy", "nguHanh"],
        skillCheck: "Thần Học",
        difficulty: "3",
        range: "1 đối tượng (1 lần mỗi buổi chơi)",
        primaryEffect:
            "<p><strong>Thành công:</strong> Nhân vật bói được một trong những tương lai sau. Tùy thuộc vào Hành được sử dụng, lần tiếp đối tượng thực xét năng lực thuộc một nhóm Kỹ năng được bói, đối tượng có thể tiêu hao 1 điểm Tâm Lực để thêm +1 chí thành vào kết quả:</p>" +
            "<ul>" +
            "<li><strong>Thanh Long (Mộc):</strong> Văn Đạo</li>" +
            "<li><strong>Chu Tước (Hỏa):</strong> Nghệ Đạo</li>" +
            "<li><strong>Hoàng Lân (Thổ):</strong> Sinh Đạo</li>" +
            "<li><strong>Bạch Hổ (Kim):</strong> Võ Đạo</li>" +
            "<li><strong>Huyền Vũ (Thủy):</strong> Tu Đạo</li>" +
            "</ul>" +
            "<p><strong>Thất bại:</strong> Quản Trò chọn một trong những kết quả trên.</p>",
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "nghiThucKetGioi",
        name: "Nghi Thức Kết Giới",
        category: "nghiThuc",
        level: 1,
        traits: ["hanhDong", "dinhKy", "nguHanh"],
        skillCheck: "Thần Học",
        difficulty: "3",
        range: "Tiếp xúc, 1 cánh cửa/cổng",
        duration: "1 canh giờ (+1/chí thành)",
        primaryEffect:
            "<p><strong>Thành công:</strong> Cánh cổng ngăn chặn sự xâm nhập của một nhóm thực thể nhất định, tùy thuộc vào Hành được sử dụng. Cá thể thuộc nhóm được chỉ định phải thực hiện xét năng lực (Hành khắc nhập) của Hành nghi thức với Độ Khó 4 để có vượt qua kết giới này. Nhân vật nhận thức được sự xâm nhập của cá thể đó, bất kể kết quả thành công hay thất bại.</p>" +
            "<ul>" +
            "<li><strong>(Mộc):</strong> Yêu tộc, Muông thú</li>" +
            "<li><strong>(Hỏa):</strong> Tử vật như xác sống, cương thi</li>" +
            "<li><strong>(Thổ):</strong> Nhân loại</li>" +
            "<li><strong>(Kim):</strong> Thực thể vô hình như linh hồn, anh linh</li>" +
            "<li><strong>(Thủy):</strong> Thực thể có “Ma tính”, hoặc “Ma hóa”</li>" +
            "</ul>",
        sincerityEffects: [
            {
                cost: "1+",
                text: "Chuyển phạm vi thành hình cầu lan tỏa từ nhân vật có bán kính bằng 2-bộ. Tăng bán kính thêm +2-bộ với mỗi Chí thành sử dụng theo cách này.",
            },
            {
                cost: "1",
                text: "Nhân vật nhận biết được nếu đã có cá thể trong nhóm được chỉ định đã vượt qua được kết giới trong trong 12 canh giờ trước.",
            },
        ],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "nghiThucCauPhuc",
        name: "Nghi Thức Cầu Phúc",
        category: "nghiThuc",
        level: 1,
        element: "tho",
        traits: ["hanhDong", "dinhKy", "thoHanh"],
        skillCheck: "Thần Học hoặc Sinh Tồn (Thổ)",
        difficulty: "3",
        range: "Ruộng đồng xung quanh một nơi cư trú",
        duration: "Đến mùa gặt tiếp theo",
        primaryEffect:
            "<p><strong>Thành công:</strong> Ruộng đồng xung quanh được bảo hộ bởi các bệnh dịch, côn trùng gây hại thông thường.</p>",
        sincerityEffects: [
            {
                cost: "2",
                text: "Ruộng đồng phì nhiêu, sản lượng gấp đôi thông thường ở mùa gặt tiếp theo",
            },
            {
                cost: "3",
                text: "Ruộng đồng đất đai trong phạm vi 10 dặm, có tính trạng “Thánh Địa (Thổ)” cho tới mùa gặt tiếp theo.",
            },
        ],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "nghiThucThienKhi",
        name: "Nghi Thức Thiện Khí",
        category: "nghiThuc",
        level: 2,
        traits: [],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "nghiThucTraDao",
        name: "Nghi Thức Trà Đạo",
        category: "nghiThuc",
        level: 2,
        traits: ["hanhDong", "dinhKy", "nguHop"],
        skillCheck: "Biểu Diễn/Xã Hội (có thể được hỗ trợ tối đa bởi 1 người khác)",
        difficulty: "3",
        range: "Bản thân, và thêm số lượng đối tượng = Cấp bậc Xã Hội Học",
        primaryEffect:
            "<p><strong>Thành công:</strong> Mỗi đối tượng hồi phục 3 điểm Tâm Lực (+1/chí thành)</p>",
        sincerityEffects: [
            {
                cost: "1+",
                text: "Mỗi đối tượng hồi phục 1 điểm Sức Lực với mỗi chí thành theo cách này.",
            },
            {
                cost: "2",
                text: "Lần tiếp theo mỗi nhân vật thực hiện xét năng lực, giảm Độ Khó -1.",
            },
            {
                cost: "2",
                text: "Mỗi đối tượng hồi phục 1 điểm Ngũ Hợp",
            },
        ],
        usage: { frequency: "perSession", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "nghiThucLapUoc",
        name: "Nghi Thức Lập Ước",
        category: "nghiThuc",
        level: 2,
        traits: [],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "nghiThucHoThi",
        name: "Nghi Thức Hộ Thi",
        category: "nghiThuc",
        level: 2,
        traits: ["hanhDong", "dinhKy", "nguHop"],
        skillCheck: "Thần Học",
        difficulty: "2",
        range: "Tiếp xúc, 1 thi thể",
        primaryEffect:
            "<p><strong>Thành công:</strong> Thi thể đó nhận tính trạng “Thiêng liêng” trong thời gian số ngày bằng với cấp bậc Ngũ Hợp (+1/chí thành). Thực thể có tính trạng “Ma tính”, hoặc “Ma hóa” nếu tiếp xúc hoặc tác động lên thi thể bị giảm 5 điểm Tâm Lực.</p>",
        sincerityEffects: [
            {
                cost: "2",
                text: "Nhân vật giữ cho thi thể một cách đoan chính nhất có thể (gắn chi, lau máu, chỉnh sửa trang phục v.v.)",
            },
            {
                cost: "3",
                text: "Nhân vật nhận thức được ý nghĩ bề mặt nhất của thi thể một khắc trước khi qua đời.",
            },
        ],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "nghiThucTamDao",
        name: "Nghi Thức Tầm Đạo",
        category: "nghiThuc",
        level: 2,
        traits: [],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
];
