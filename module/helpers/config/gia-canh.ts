/**
 * Gia Cảnh configuration.
 */
import { GiaCanh } from "../../../types/giaCanh";

export const GIA_CANH: GiaCanh[] = [
  {
    id: "nong-dan",
    ten: "BOILERPLATE.GiaCanh.nongDan.label",
    description: "Sản xuất lương thực, trồng trọt chăn nuôi",
    upgrade: [
      {
        target: "element",
        mode: "add",
        effects: [
          { name: "tho", value: 1 },
          { name: "moc", value: 1 }
        ],
        choose: 1
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "laoDong", value: 1 }]
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "theThuat", value: 1 }]
      }
    ]
  },
  {
    id: "nghe-nhan",
    ten: "Nghệ Nhân",
    description: "Sản xuất công cụ, vật dụng phổ biến trong đời sống",
    upgrade: [
      {
        target: "element",
        mode: "add",
        effects: [
          { name: "tho", value: 1 },
          { name: "kim", value: 1 }
        ],
        choose: 1
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "thoiTrang", value: 1 }]
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "xaHoi", value: 1 }]
      }
    ]
  },
  {
    id: "thuong-nhan",
    ten: "Thương nhân",
    description: "Trao đổi buôn bán, luân chuyển đồng tiền cũng như vật phẩm",
    upgrade: [
      {
        target: "element",
        mode: "add",
        effects: [
          { name: "kim", value: 1 },
          { name: "thuy", value: 1 }
        ],
        choose: 1
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "thuongNghiep", value: 1 }]
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "leDao", value: 1 }]
      }
    ]
  },
  {
    id: "ngu-phu",
    ten: "Ngư Phu",
    description: "Nuôi trồng, đánh bắt thủy sản",
    upgrade: [
      {
        target: "element",
        mode: "add",
        effects: [
          { name: "kim", value: 1 },
          { name: "tho", value: 1 }
        ],
        choose: 1
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "haiNghiep", value: 1 }]
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "sinhTon", value: 1 }]
      }
    ]
  },
  {
    id: "tieu-phu",
    ten: "Tiều Phu",
    description: "Săn bắn thú rừng, thu hoạch củi gỗ, hái nhặt thảo dược",
    upgrade: [
      {
        target: "element",
        mode: "add",
        effects: [
          { name: "moc", value: 1 },
          { name: "tho", value: 1 }
        ],
        choose: 1
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "laoDong", value: 1 }]
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "sinhTon", value: 1 }]
      }
    ]
  },
  {
    id: "tieu-phu",
    ten: "Tiều Phu",
    description: "Săn bắn thú rừng, thu hoạch củi gỗ, hái nhặt thảo dược",
    upgrade: [
      {
        target: "element",
        mode: "add",
        effects: [
          { name: "moc", value: 1 },
          { name: "tho", value: 1 }
        ],
        choose: 1
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "laoDong", value: 1 }]
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "sinhTon", value: 1 }]
      }
    ]
  },
  {
    id: "canh-phu",
    ten: "Cảnh Phu",
    description: "Bảo vệ an ninh cộng đồng, phục vụ triều đình",
    upgrade: [
      {
        target: "element",
        mode: "add",
        effects: [
          { name: "hoa", value: 1 },
          { name: "tho", value: 1 }
        ],
        choose: 1
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "lanhDao", value: 1 }]
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "chinhTri", value: 1 }]
      }
    ]
  },
  {
    id: "binh-phu",
    ten: "Binh Gia",
    description: "Luyện thể tập võ, sẵn sàng bảo vệ cộng đồng và Tổ quốc",
    upgrade: [
      {
        target: "element",
        mode: "add",
        effects: [
          { name: "hoa", value: 1 },
          { name: "tho", value: 1 }
        ],
        choose: 1
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "binhPhap", value: 1 }]
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "theThuat", value: 1 }]
      }
    ]
  },
  {
    id: "lang-y",
    ten: "Lang Y",
    description: "Bốc thuốc chữa trị, điều chế thảo dược",
    upgrade: [
      {
        target: "element",
        mode: "add",
        effects: [
          { name: "kim", value: 1 },
          { name: "moc", value: 1 }
        ],
        choose: 1
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "yThuat", value: 1 }]
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "thuongNghiep", value: 1 }]
      }
    ]
  },
  {
    id: "thanh-lau",
    ten: "Thanh Lâu",
    description: "Chốn ăn chơi thị phi, giải trí mua vui",
    upgrade: [
      {
        target: "element",
        mode: "add",
        effects: [
          { name: "kim", value: 1 },
          { name: "hoa", value: 1 }
        ],
        choose: 1
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "leDao", value: 1 }]
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "bieuDien", value: 1 }]
      }
    ]
  },
  {
    id: "ha-nhan",
    ten: "Hạ Nhân",
    description: "Kẻ hầu người hạ, làm việc dơ bẩn, sống nơi đáy xã hội",
    upgrade: [
      {
        target: "element",
        mode: "add",
        effects: [
          { name: "kim", value: 1 },
          { name: "moc", value: 1 }
        ],
        choose: 1
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "laoDong", value: 1 }]
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "leDao", value: 1 }]
      }
    ]
  },
  {
    id: "hac-hoi",
    ten: "Hắc Hội",
    description: "Băng đảng tội phạm, buôn lậu lừa đảo, chiếm đoạt, làm ăn bất chính",
    upgrade: [
      {
        target: "element",
        mode: "add",
        effects: [
          { name: "kim", value: 1 },
          { name: "moc", value: 1 }
        ],
        choose: 1
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "hacNghiep", value: 1 }]
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "thuongNghiep", value: 1 }]
      }
    ]
  },
  {
    id: "bui-doi",
    ten: "Bụi Đời",
    description: "Tứ cố vô thân, không nơi nương tự",
    upgrade: [
      {
        target: "element",
        mode: "add",
        effects: [
          { name: "kim", value: 1 },
          { name: "hoa", value: 1 }
        ],
        choose: 1
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "hacNghiep", value: 1 }]
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "laoDong", value: 1 }]
      }
    ]
  },
  {
    id: "den-chua",
    ten: "Đền Chùa",
    description: "Tịnh tu niệm kinh, truy cầu giác ngộ",
    upgrade: [
      {
        target: "element",
        mode: "add",
        effects: [
          { name: "tho", value: 1 },
          { name: "thuy", value: 1 }
        ],
        choose: 1
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "thanHoc", value: 1 }]
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "thienDinh", value: 1 }]
      }
    ]
  },
  {
    id: "thuong-dan-cuu-quy",
    ten: "Thường Dân Cựu Quý",
    description: "Quá khứ quý tộc, hiện tại thường dân",
    upgrade: [
      {
        target: "element",
        mode: "add",
        effects: [
          { name: "tho", value: 1 },
          { name: "thuy", value: 1 },
          { name: "kim", value: 1 },
          { name: "moc", value: 1 },
          { name: "hoa", value: 1 }
        ],
        choose: 1
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "thanHoc", value: 1 }]
      },
      {
        target: "skill",
        mode: "add",
        effects: [{ name: "thienDinh", value: 1 }]
      }
    ]
  },
];
