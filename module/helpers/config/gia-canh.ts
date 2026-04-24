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
  }
];
