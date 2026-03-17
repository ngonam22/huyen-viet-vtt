

export interface Effect {
    name: string
    value: number
}

// Rule để đưa vào he thong để tính toán các thay đổi thong so của nhân vật
// ví dụ: chọn tộc này thì có benefit gì
// @example:  them 1 diem ngu hanh
// [
//   type: element
//   mode: add
//   effects: [
//      {name: 'thuy', value: 1}
//   ]
//   choose: 1
// ]
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

/**
 * Interface để lưu trữ một bản ghi nâng cấp đã được áp dụng vào nhân vật
 * Giúp việc tính toán lại (re-calculate) trở nên dễ dàng khi thay đổi nguồn (ví dụ: đổi Thị Tộc)
 */
export interface AppliedUpgrade {
    /** ID duy nhất cho nguồn nâng cấp (ví dụ: 'thi-toc', 'clan', 'level-up-4') */
    sourceId: string;
    
    /** Rule gốc được áp dụng */
    rule: UpgradeRule;
    
    /** Danh sách các index của effects đã được chọn (nếu rule có 'choose') */
    selectedIndices?: number[];
}