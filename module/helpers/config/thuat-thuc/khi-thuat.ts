import type { ThuatThuc } from "../../../../types/thuatThuc";

/** Luyện Khí Thuật (Khí Thuật) — Cấp-1 & Cấp-2. Source: specs/rule_book_v0.8.4.md */
export const KHI_THUAT: ThuatThuc[] = [
    // ── Hỏa Khí Thuật ──────────────────────────────────────────────
    {
        id: "hoaKhiQuyen",
        name: "Hỏa Khí Quyền",
        category: "khiThuat",
        level: 1,
        element: "hoa",
        traits: ["hanhDong", "congKich", "hoTro", "hoaHanh", "hoaTinh"],
        skillCheck: "Võ Thuật",
        difficulty: "2",
        range: "1-bộ, 1 đối tượng",
        duration: "Kết thúc cảnh hiện tại (Hoặc kích hoạt Khí thuật khác)",
        primaryEffect:
            "<p><strong>Nội Lưu:</strong> Cường hóa quyền cước với Hỏa khí. Võ thuật Hình thể bằng tay và chân của nhân vật được có Sát Lực chuyển thành tính chất siêu nhiên, và Sát Thương tăng thêm một lượng bằng với cấp bậc Ngũ Hợp</p>" +
            "<p><strong>Ngoại Phá:</strong> 3 Hỏa chí thành: Gây sát thương vật lý bằng cấp bậc Hỏa hành lên một đối tượng trong phạm vị 1-bộ, và đối tượng đó phải thực hiện kiểm tra Thể thuật ĐK 4 (Kim 5, Thủy 2) để không rơi vào trạng thái “Hoa mắt”</p>",
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "hoaLienBaoToa",
        name: "Hỏa Liên Bạo Tỏa",
        category: "khiThuat",
        level: 1,
        element: "hoa",
        traits: ["hanhDong", "congKich", "hoTro", "hoaHanh", "hoaTinh"],
        skillCheck: "Võ Thuật",
        difficulty: "2",
        range: "1-bộ, 1 vật phẩm",
        duration: "Kết thúc cảnh hiện tại (Hoặc kích hoạt Khí thuật khác)",
        primaryEffect:
            "<p><strong>Nội Lưu:</strong> Hỏa khí lưu chuyển và kích nổ tại yếu điểm của vật phẩm. Khi nhân vật thực hiện thành công Xét kỹ năng Võ Thuật (Hình thể) lên một mục tiêu, nhân vật có thể chọn một vật phẩm đương dụng đối của tượng, khiến nó bị “Hư hại” trừ khi đối tượng kháng lại bằng 2 điểm Khí lực.</p>" +
            "<p><strong>Ngoại Phá:</strong><br>3 Hỏa chí thành: Khiến 1 vật phẩm trong phạm vi bị “Hư hại”.<br>5 Hỏa chí thành: Khiến 1 vật phẩm trong phạm vi vị “Vỡ nát”.</p>",
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "luuTinhPhiBo",
        name: "Lưu Tinh Phi Bộ",
        category: "khiThuat",
        level: 2,
        element: "hoa",
        traits: ["hanhDong", "congKich", "hoTro", "diChuyen", "hoaHanh", "hoaTinh"],
        skillCheck: "Võ Thuật",
        difficulty: "2",
        range: "5-bộ, 1 đối tượng",
        duration: "Kết thúc cảnh hiện tại (Hoặc kích hoạt Khí thuật khác)",
        primaryEffect:
            "<p><strong>Nội Lưu:</strong> Hỏa khí bùng phát ở hai chân. Khi thực hiện Công Kích bằng Võ Thuật (Hình thể) một mục tiêu, nhân vật có thể lập tức di chuyển 2-bộ về phía đối tượng.</p>" +
            "<p><strong>Ngoại Phá:</strong> 3 Hỏa chí thành: Nhân vật lập tức di chuyển tối đa 5-bộ hướng về phía đối tượng và gây sát thương vật lý bằng với cấp độ Hỏa hành. Đối tượng đó phải thực hiện kiểm tra Thể thuật ĐK 4 (Kim 5, Thủy 2) để không rơi vào trạng thái “Hoa mắt”.</p>",
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "hoaLongCong",
        name: "Hỏa Long Công",
        category: "khiThuat",
        level: 2,
        element: "hoa",
        traits: ["hanhDong", "congKich", "hoTro", "hoaHanh", "hoaTinh"],
        skillCheck: "Thiền Định",
        difficulty: "3",
        range: "1-bộ, bất kỳ cá thể tùy chọn trọn trong phạm vi",
        duration: "Kết thúc cảnh hiện tại (Hoặc kích hoạt Khí thuật khác)",
        primaryEffect:
            "<p><strong>Nội Lưu:</strong> Hỏa khí như hỏa long lưu chuyển trong thân thể. Nhân vật tự động thành công kiểm tra năng lực để kháng lại thời tiết nóng lạnh khắc nghiệt và thêm một lượng điểm chí thành bằng với cấp độ Hỏa hành. Ngoài ra, khi nhân vật nhận Sát Lực hỏa tính vật lý hoặc siêu nhiên, nhân vật có thể tiêu hao một điểm Ngũ Hợp chi lực để chuyển lượng Sát Lực đó thành phục hồi Khí lực.</p>" +
            "<p><strong>Ngoại Phá:</strong> 3 Hỏa chí thành: Hỏa long khí xuất thể gây sát thương vật lý bằng với cấp độ Hỏa hành và trạng thái “Cháy bỏng” lên đối tượng tùy chọn bất kỳ trong phạm vi 1-bộ. Vật thể dễ cháy trong phạm vi bị bốc cháy, trở thành địa hình Nguy Hiểm (Quản Trò quyết định).</p>",
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },

    // ── Thổ Khí Thuật ──────────────────────────────────────────────
    {
        id: "thoKhiQuyen",
        name: "Thổ Khí Quyền",
        category: "khiThuat",
        level: 1,
        element: "tho",
        traits: ["hanhDong", "congKich", "hoTro", "thoHanh", "thoTinh"],
        skillCheck: "Võ Thuật",
        difficulty: "2",
        range: "1-bộ, 1 đối tượng",
        duration: "Kết thúc cảnh hiện tại (Hoặc kích hoạt Khí thuật khác)",
        primaryEffect:
            "<p><strong>Nội Lưu:</strong> Cường hóa quyền cước với Thổ khí. Nhân vật có Kháng Lực vật lý tăng thêm một lượng bằng với cấp bậc Ngũ Hợp.</p>" +
            "<p><strong>Ngoại Phá:</strong> 3 Thổ chí thành: Gây sát thương vật lý bằng cấp bậc Thổ hành lên một đối tượng trong phạm vị 1-bộ, và đối tượng đó phải thực hiện kiểm tra Thể thuật ĐK 4 (Thủy 5, Mộc 2) để không rơi vào trạng thái “Thất thế”</p>",
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "ngocTheTinhThanCong",
        name: "Ngọc Thể Tịnh Thân Công",
        category: "khiThuat",
        level: 1,
        element: "tho",
        traits: ["hanhDong", "hoTro", "thoHanh", "thoTinh"],
        skillCheck: "Thiền Định",
        difficulty: "2",
        range: "1-bộ, 1 đối tượng",
        duration: "Kết thúc cảnh hiện tại (Hoặc kích hoạt Khí thuật khác)",
        primaryEffect:
            "<p><strong>Nội Lưu:</strong> Thổ Khí lưu chuyển tăng cường tính kiên cường của cơ thể cùng các hoạt động sinh lý. Khi nhân vật thực hiện Xét năng lực để kháng lại độc tố, bệnh dịch, Ma khí, Ma thuật, Ma vật, các năng lực của Sinh linh có Ma tính (Ma chủng), giảm Độ Khó một lượng bằng với cấp bậc Thổ Hành (xuống tối thiểu ĐK = 1)</p>" +
            "<p><strong>Ngoại Phá:</strong> 3 Thổ chí thành: Giải trừ một trong các trạng thái sau trên người đối tượng: Chảy máu, Hóa mắt, Lạc hướng, Suy nhược, Say xỉn, Cận tử và Nhiễm Ma.</p>",
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "diaChanThachNhiCong",
        name: "Địa Chấn Thạch Nhĩ Công",
        category: "khiThuat",
        level: 1,
        element: "tho",
        traits: ["hanhDong", "hoTro", "thoHanh", "thoTinh"],
        skillCheck: "Thiền Định",
        difficulty: "2",
        range: "1-bộ, 1 đối tượng",
        duration: "Kết thúc cảnh hiện tại (Hoặc kích hoạt Khí thuật khác)",
        primaryEffect:
            "<p><strong>Nội Lưu:</strong> Thổ Khí nội lưu kết nối với mặt đất. Nhân vật có giác quan tinh chuẩn để cảm nhận sự rung động mặt đất trong phạm vi xung quanh bán kính bằng với bình phương của cấp bậc Thổ Hành (Hoặc 2-bộ với mỗi cấp bậc Thổ hành), và độ Cảnh Giác được tăng một lượng bằng với cấp độ Thổ Hành</p>" +
            "<p><strong>Ngoại Phá:</strong> 3 Thổ chí thành: Nhân vật lập tức cảm nhận được tất cả vật thể kết nối với mặt đất trong phạm vi xung quanh, bán kính bằng với bình phương của (Thổ hành + chí thành), hoặc 3-bộ với mỗi cấp bậc Thổ hành và chí thành.</p>",
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "diaLongCong",
        name: "Địa Long Công",
        category: "khiThuat",
        level: 2,
        element: "tho",
        traits: ["hanhDong", "hoTro", "diChuyen", "thoHanh", "thoTinh"],
        skillCheck: "Thiền Định",
        difficulty: "3",
        range: "Bản thân",
        duration: "Kết thúc cảnh hiện tại (Hoặc kích hoạt Khí thuật khác)",
        primaryEffect:
            "<p><strong>Nội Lưu:</strong> Thổ khí xuất mạch nhập vi bì cốt, khiến cho cơ thể vững chắc như núi. Sát Lực vật lý lên nhân vật không thể chuyển hoá thành Sát Thương. Ngoài ra, sau khi một đối tượng trong phạm vi Công Kích hình thể thực hiện hành động Công kích lên nhân vật, nhân vật có thể lập tức tiêu hao 1 điểm Ngũ Hợp để khiến đối tượng đó nhận sát thương vật lý Thổ tính bằng với cấp độ Thể thuật của nhân vật.</p>" +
            "<p><strong>Ngoại Phá:</strong> 3 Thổ chí thành: Giảm tất cả sát lực vật lý nhân vật phải nhận xuống thành 1. Bất kỳ đối tượng trong phạm vi Công kích hình thể rơi vào trạng thái “Thất thế” sau khi gây sát thương vật lý lên nhân vật. Các hiệu quả này có tác dụng tới khi kết thúc lượt sau của nhân vật.</p>",
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        // No body in rulebook v0.8.4
        id: "thaiSonBatDongThan",
        name: "Thái Sơn Bất Động Thân",
        category: "khiThuat",
        level: 2,
        element: "tho",
        traits: [],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },

    // ── Kim Khí Thuật ──────────────────────────────────────────────
    {
        id: "kimKhiQuyen",
        name: "Kim Khí Quyền",
        category: "khiThuat",
        level: 1,
        element: "kim",
        traits: ["hanhDong", "congKich", "hoTro", "kimHanh", "kimTinh"],
        skillCheck: "Võ Thuật Hình Thể (Kim hành)",
        difficulty: "2",
        range: "1-bộ, 1 đối tượng",
        duration: "Kết thúc cảnh hiện tại (Hoặc kích hoạt Khí thuật khác)",
        primaryEffect:
            "<p><strong>Nội Lưu:</strong> Cường hóa quyền cước với Kim khí. Võ thuật Hình thể bằng tay và chân của nhân vật được có Sát Lực tăng thêm một lượng bằng với cấp bậc Ngũ Hợp</p>" +
            "<p><strong>Ngoại Phá:</strong> 3 Hỏa chí thành: Gây sát thương vật lý bằng cấp bậc Kim hành lên một đối tượng trong phạm vị 1-bộ, và đối tượng đó phải thực hiện kiểm tra Thể thuật ĐK 4 (Mộc 5, Hỏa 2) để không rơi vào trạng thái “Lạc Hướng”</p>",
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "niemThanhTinhAmCong",
        name: "Niêm Thanh Tịnh Âm Công",
        category: "khiThuat",
        level: 1,
        element: "kim",
        traits: ["hanhDong", "muuKe", "hoTro", "kimHanh", "kimTinh"],
        skillCheck: "Thiền Định",
        difficulty: "2",
        range: "Bản thân",
        duration: "Kết thúc cảnh hiện tại (Hoặc kích hoạt Khí thuật khác)",
        primaryEffect:
            "<p><strong>Nội Lưu:</strong> Kim khí cuốn hút sự lan tỏa của âm thanh cùng với ý niệm trong đó. Các hành động Mưu Kế tác động lên nhân vật có Độ Khó tăng thêm một lượng bằng với cấp độ Kim hành của nhân vật.</p>" +
            "<p><strong>Ngoại Phá:</strong> 3 Kim chí thành: Tất cả đối tượng trong phạm vi bán kính 3-bộ rơi vào trạng thái “Câm lặng” và không thể cảm nhận được âm thanh trong cho tới bắt đầu lượt sau của nhân vật.</p>",
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "kimThanBatHoaiCong",
        name: "Kim Thân Bất Hoại Công",
        category: "khiThuat",
        level: 2,
        element: "kim",
        traits: ["hanhDong", "congKich", "hoTro", "kimHanh", "kimTinh"],
        skillCheck: "Thiền Định",
        difficulty: "3",
        range: "1-bộ, bất kỳ cá thể tùy chọn trọn trong phạm vi",
        duration: "Kết thúc cảnh hiện tại (Hoặc kích hoạt Khí thuật khác)",
        primaryEffect:
            "<p><strong>Nội Lưu:</strong> Kim khí hội tụ như Kim long tiềm tàng nội ẩn trong cơ thể. Nhân vật tự động thành công khí kiểm tra năng lực để kháng lại hiệu ứng Độc tính, Độc Dược, và Đề kháng với sát thương độc tính bằng cấp độ Kim Hành. Ngoài ra, khi nhận sát thương, nhân vật có thể tiêu hao 1 điểm Ngũ Hợp chi lực để giảm sát thương một lượng bằng với cấp độ Kim Hành và lập tức thực hiện hành động Di Chuyển.</p>" +
            "<p><strong>Ngoại Phá:</strong> 3 Kim chí thành: Các cá thể trong phạm vi 2-bộ bị trạng thái “Lạc hướng” đối với nhân vật.</p>",
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        // No body in rulebook v0.8.4
        id: "diemHuyetThietChi",
        name: "Điểm Huyệt Thiết Chỉ",
        category: "khiThuat",
        level: 2,
        element: "kim",
        traits: [],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },

    // ── Thủy Khí Thuật ─────────────────────────────────────────────
    {
        id: "thuyKhiQuyen",
        name: "Thủy Khí Quyền",
        category: "khiThuat",
        level: 1,
        element: "thuy",
        traits: ["hanhDong", "congKich", "hoTro", "thuyHanh", "thuyTinh"],
        skillCheck: "Võ Thuật Hình Thể",
        difficulty: "2",
        range: "Bản thân",
        duration: "Kết thúc cảnh hiện tại (Hoặc kích hoạt Khí thuật khác)",
        primaryEffect:
            "<p><strong>Nội Lưu:</strong> Thủy khí lưu chuyển làm lắng đọng kết nối không gian. Võ thuật Hình thể bằng tay và chân của nhân vật có phạm vi thêm số bộ bằng với cấp bậc Ngũ Hợp. Ngoài ra, Nhân vật có thể tiêu hao 1 điểm Ngũ Hợp có thể tác động lên đối tượng với Võ thuật Hình Thể bằng tay và chân của mình trong khoảng cách số bộ bằng với cấp bậc Thủy hành, miễn là hai bên cùng tiếp xúc một với một thể nước hoặc gỗ (tính Thủy hoặc Mộc, ví dụ như dưới nước, tường gỗ, sàn gỗ).</p>" +
            "<p><strong>Ngoại Phá:</strong> 3 Thủy chí thành: Gây sát thương vật lý bằng cấp bậc Thủy hành lên một đối tượng trong phạm vị 3-bộ, nếu đối tượng đó có kích cỡ 3 hoặc nhỏ hơn, dịch chuyển vị trí của đối tượng đó tối đa số bộ bằng với cấp bậc Thủy hành.</p>",
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "thuyThuongPhi",
        name: "Thủy Thượng Phi",
        category: "khiThuat",
        level: 1,
        element: "thuy",
        traits: ["hanhDong", "diChuyen", "hoTro", "thuyHanh", "thuyTinh"],
        skillCheck: "Thiền Định",
        difficulty: "2",
        range: "Bản thân",
        duration: "Kết thúc cảnh hiện tại (Hoặc kích hoạt Khí thuật khác)",
        primaryEffect:
            "<p><strong>Nội Lưu:</strong> Thủy khí lưu động hòa với môi trường nước xung quanh. Nhân vật có thể di chuyển trên mặt nước như thể di chuyển trên mặt đất.</p>" +
            "<p><strong>Ngoại Phá:</strong> 3 Thủy chí thành: Nhân vật lập tức loại bỏ trạng thái “Thất thế” và “Định thân”, sau đó di chuyển đến một vị trí trong phạm vi 3-bộ.</p>",
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "thanhTamTinhThanCong",
        name: "Thanh Tâm Tịnh Thần Công",
        category: "khiThuat",
        level: 2,
        element: "thuy",
        traits: ["hanhDong", "diChuyen", "hoTro", "thuyHanh", "thuyTinh"],
        skillCheck: "Thiền Định",
        difficulty: "2",
        range: "Bản thân",
        duration: "Kết thúc cảnh hiện tại (Hoặc kích hoạt Khí thuật khác)",
        primaryEffect:
            "<p><strong>Nội Lưu:</strong> Thủy khí lưu động nội thể như thủy long âm thầm điều hòa nước non. Tăng Độ Khó của các Linh thuật, Ma Thuật và Khí Thuật tác động lên nhân vật một lượng bằng với cấp bậc Thiền Định của nhân vật. Một lần mỗi lượt, khi một cá thể trong phạm vi Công kích hình thể của nhân vật nhận sát thương siêu nhiên, nhân vật có thể tiêu hao 1 điểm Ngũ Hợp để giảm lượng sát thương đó đi một lượng bằng với cấp độ Thiền Định của nhân vật.</p>" +
            "<p><strong>Ngoại Phá:</strong><br>3 Thủy chí thành: Nhân vật lập tức loại bỏ các hiệu ứng tiếp diễn siêu nhiên khỏi bản thân.<br>6 Thủy chí thành: Nhân vật lập tức loại bỏ các hiệu ứng tiếp diễn siêu nhiên khỏi tất cả cá thể trong phạm vi 2-bộ.</p>",
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        // No body in rulebook v0.8.4
        id: "khiMachNghichLuuChi",
        name: "Khí Mạch Nghịch Lưu Chỉ",
        category: "khiThuat",
        level: 2,
        element: "thuy",
        traits: [],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },

    // ── Mộc Khí Thuật ──────────────────────────────────────────────
    {
        id: "mocKhiQuyen",
        name: "Mộc Khí Quyền",
        category: "khiThuat",
        level: 1,
        element: "moc",
        traits: ["hanhDong", "congKich", "hoTro", "mocHanh", "mocTinh"],
        skillCheck: "Võ Thuật Hình Thể",
        difficulty: "2",
        range: "1-bộ, 1 đối tượng",
        duration: "Kết thúc cảnh hiện tại (Hoặc kích hoạt Khí thuật khác)",
        primaryEffect:
            "<p><strong>Nội Lưu:</strong> Mộc khí như rễ cây biến hóa len lỏi xuyên qua vật chắn. Võ thuật Hình thể bằng tay và chân của nhân vật bỏ qua Kháng Lực vật lý một lượng bằng với cấp bậc Ngũ Hợp</p>" +
            "<p><strong>Ngoại Phá:</strong> 3 Mộc chí thành: Gây sát thương vật lý bằng cấp bậc Mộc hành lên một đối tượng trong phạm vị 1-bộ, và đối tượng đó phải thực hiện kiểm tra Thể thuật ĐK 4 (Thổ 5, Hỏa 2) để không rơi vào trạng thái “Chảy máu”.</p>",
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        // No body in rulebook v0.8.4
        id: "hungKhiVinhXuanThu",
        name: "Hưng Khí Vĩnh Xuân Thủ",
        category: "khiThuat",
        level: 1,
        element: "moc",
        traits: [],
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "daiThuTruongXuanCong",
        name: "Đại Thụ Trường Xuân Công",
        category: "khiThuat",
        level: 2,
        element: "moc",
        traits: ["hanhDong", "diChuyen", "hoTro", "mocHanh", "mocTinh"],
        skillCheck: "Thiền Định",
        difficulty: "2",
        range: "1-bộ, 1 đối tượng",
        duration: "Kết thúc cảnh hiện tại (Hoặc kích hoạt Khí thuật khác)",
        primaryEffect:
            "<p><strong>Nội Lưu:</strong> Mộc khí lưu chuyển tăng cường tốc độ hồi phục khí lực của cơ thể. Khi nhân vật thực hiện hành động Điều Tức, phục hồi 2 điểm Khí lực thay vì 1 điểm. Và một lần trong lượt của mình, sau khi nhân vật thực hiện một hành động, có thể lập tức tiêu hao 1 điểm Ngũ Hợp để hồi phục Khí lực cho một cá thể khác không phải bản thân trong phạm vi 1-bộ bằng cấp bậc kỹ năng Y Dược.</p>" +
            "<p><strong>Ngoại Phá:</strong> 3 Mộc chí thành: Một cá thể khác ngoại trừ bản thân trong phạm vi 1-bộ hồi phục Khí lực bằng kỹ năng Y Dược và cấp bậc chí thành. Mỗi đối tượng chỉ có thể được tác động bởi hiệu ứng này một lần mỗi cảnh.</p>",
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
    {
        id: "khiDaoLoanLuuChi",
        name: "Khí Đạo Loạn Lưu Chỉ",
        category: "khiThuat",
        level: 2,
        element: "moc",
        traits: ["hanhDong", "congKich", "hoTro", "mocHanh", "mocTinh"],
        skillCheck: "Võ Thuật Hình Thể",
        difficulty: "3",
        range: "1-bộ, 1 đối tượng",
        duration: "Kết thúc cảnh hiện tại (Hoặc kích hoạt Khí thuật khác)",
        primaryEffect:
            "<p><strong>Nội Lưu:</strong> Mộc khí lưu nhập theo đòn thế mà khiến khí lưu nội thể của đối phương náo loạn. Công kích bằng Võ thuật Hình thể bằng tay và chân của nhân vật khiến đối tượng rơi vào trạng thái “Định thân” hoặc gây thêm 3 Sát Lực (Đối phương lựa chọn).</p>" +
            "<p><strong>Ngoại Phá:</strong><br>3 Mộc chí thành: Gây sát thương siêu nhiên bằng cấp bậc Mộc hành lên một đối tượng trong phạm vị 1-bộ, và đối tượng đó lập tức rơi vào trạng thái “Định Thân”<br>6 Mộc chí thành: Gây sát thương vật lý bằng cấp bậc (Mộc hành + Y Dược + 1/chí thành) lên một đối tượng trong phạm vị 1-bộ, và đối tượng đó lập tức rơi vào trạng thái “Định Thân”</p>",
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },

    // ── Ngũ Hành Khí Thuật ─────────────────────────────────────────
    {
        id: "theVanTung",
        name: "Thế Vân Tung",
        category: "khiThuat",
        level: 2,
        traits: ["hanhDong", "diChuyen", "hoTro", "nguHanh"],
        skillCheck: "Thiền Định",
        difficulty: "3",
        range: "Bản thân",
        duration: "Kết thúc cảnh hiện tại (Hoặc kích hoạt Khí thuật khác)",
        primaryEffect:
            "<p><strong>Nội Lưu:</strong> Chân Khí lưu chuyển nội thể, khiến cho cơ thể trở nên nhẹ nhàng, bộ cước lượn mây lướt sóng. Tăng Tốc Độ của nhân vật +2-bộ. Khi di chuyển, nhân vật có thể vượt qua rào cản và tính chất địa hình có độ cao 1-bộ hoặc thấp hơn.</p>" +
            "<p><strong>Ngoại Phá:</strong> 1+ Chí thành: Nhân vật lập tức di chuyển khoảng cách 1-bộ ngang hoặc dọc với mỗi điểm chí thành sử dụng theo cách này, và miễn nhiễm với các tính chất địa hình trong khoảng cách di chuyển này.</p>",
        usage: { frequency: "unlimited", maxUses: 1 },
        xpCost: 3,
    },
];
