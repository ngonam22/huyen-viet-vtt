import { CharacterSchema } from "../../types/actor-character";
import { UpgradeRule, AppliedUpgrade } from "../../types/upgrade";

/**
 * Hàm tính toán lại toàn bộ chỉ số nhân vật dựa trên lịch sử nâng cấp (upgrades history)
 * @param baseCharacter Chỉ số cơ bản của nhân vật (chưa áp dụng modifier)
 * @param upgrades Danh sách các nâng cấp đã áp dụng từ các nguồn khác nhau
 * @returns CharacterSchema mới với các chỉ số đã được cập nhật
 */
export function recalculateCharacterStats(baseCharacter: CharacterSchema, upgrades: AppliedUpgrade[]): CharacterSchema {
    // Deep clone base character
    const finalCharacter: CharacterSchema = JSON.parse(JSON.stringify(baseCharacter));
    
    // Đảm bảo upgrades tồn tại
    if (!upgrades || !Array.isArray(upgrades)) return finalCharacter;

    for (const applied of upgrades) {
        const { rule, selectedIndices } = applied;
        let effectsToApply = rule.effects;

        // Xử lý logic 'choose' dựa trên lịch sử đã chọn
        if (rule.choose !== undefined && rule.choose > 0) {
            if (selectedIndices && selectedIndices.length > 0) {
                // Lấy các effect theo index đã lưu trong lịch sử
                effectsToApply = selectedIndices.map(idx => rule.effects[idx]).filter(e => !!e);
            } else {
                // Nếu không có lịch sử chọn, mặc định lấy các phần tử đầu tiên
                effectsToApply = rule.effects.slice(0, rule.choose);
            }
        }

        for (const effect of effectsToApply) {
            const { name, value } = effect;

            if (rule.target === "element") {
                const elementKey = name as keyof typeof finalCharacter.elements;
                const target = finalCharacter.elements[elementKey];
                
                if (target !== undefined) {
                    const isObject = typeof target === 'object' && target !== null && 'value' in target;
                    const currentVal = isObject ? (target as any).value : (target as unknown as number);
                    
                    let newVal = currentVal;
                    switch (rule.mode) {
                        case "add": newVal = currentVal + value; break;
                        case "set": newVal = value; break;
                        case "multiply": newVal = Math.floor(currentVal * value); break;
                    }

                    if (isObject) (finalCharacter.elements[elementKey] as any).value = newVal;
                    else (finalCharacter.elements as any)[elementKey] = newVal;
                }
            } else if (rule.target === "skill") {
                const skillKey = name as keyof typeof finalCharacter.skills;
                if (skillKey in finalCharacter.skills) {
                    const currentVal = finalCharacter.skills[skillKey];
                    let newVal = currentVal;
                    switch (rule.mode) {
                        case "add": newVal = currentVal + value; break;
                        case "set": newVal = value; break;
                        case "multiply": newVal = Math.floor(currentVal * value); break;
                    }
                    finalCharacter.skills[skillKey] = newVal;
                }
            }
        }
    }

    return finalCharacter;
}

/**
 * Hàm helper để áp dụng một rule mới vào lịch sử nâng cấp
 * Nếu sourceId đã tồn tại, nó sẽ thay thế rule cũ
 */
export function applyUpgradeRule(upgrades: AppliedUpgrade[], sourceId: string, rule: UpgradeRule, selectedIndices?: number[]): AppliedUpgrade[] {
    const newUpgrades = [...upgrades];
    const index = newUpgrades.findIndex(u => u.sourceId === sourceId);
    
    const newApplied: AppliedUpgrade = { sourceId, rule, selectedIndices };
    
    if (index !== -1) newUpgrades[index] = newApplied;
    else newUpgrades.push(newApplied);
    
    return newUpgrades;
}

/**
 * Hàm helper để xóa một nguồn nâng cấp khỏi lịch sử
 * Hỗ trợ xóa theo prefix (ví dụ: xóa tất cả 'thi-toc-*')
 */
export function removeUpgradeSource(upgrades: AppliedUpgrade[], sourceIdOrPrefix: string): AppliedUpgrade[] {
    return upgrades.filter(u => !u.sourceId.startsWith(sourceIdOrPrefix));
}

export function upgrade(rules: UpgradeRule[], character: CharacterSchema): CharacterSchema {
    // Để giữ tương thích với code cũ, ta có thể dùng recalculate
    const tempUpgrades: AppliedUpgrade[] = rules.map((r, i) => ({
        sourceId: `temp-${i}`,
        rule: r
    }));
    return recalculateCharacterStats(character, tempUpgrades);
}
