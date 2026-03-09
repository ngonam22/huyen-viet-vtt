

export interface Effect {
    name: string
    value: number
}

// Rule để đưa vào he thong để tính toán các thay đổi thong so của nhân vật
// ví dụ: chọn tộc này thì có benefit gì
export interface UpgradeRule {
    target: "element" | "skill"

    // Loại cua upgrade
    // Add là điểm cộng thêm hoặc trừ đi
    // Set là set cứng giá trị vào
    // Multiply là nhân theo hệ số
    mode: "add" | "set" | "multiply"

    // Danh sách các Modifier được chọn
    effects: Effect[]

    // choose để báo là được chọn 1 hay nhiều các effects để apply vào
    choose?: number
}