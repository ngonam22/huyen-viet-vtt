/**
 * Progression System configuration.
 * See specs/spec_character_progression.md
 */

/**
 * Bảng giá XP nâng cấp Ngũ Hành.
 * Key = cấp mục tiêu, Value = chi phí XP.
 * Có thể chỉnh sửa linh hoạt cho từng cấp.
 */
export const ELEMENT_UPGRADE_COST: Record<number, number> = {
    2: 6,   // lên cấp 2 tốn 6 XP
    3: 9,   // lên cấp 3 tốn 9 XP
    4: 12,  // lên cấp 4 tốn 12 XP
    5: 15,  // lên cấp 5 tốn 15 XP
    6: 18,  // lên cấp 6 tốn 18 XP
};

/**
 * Bảng giá XP nâng cấp Kỹ Năng.
 * Key = cấp mục tiêu, Value = chi phí XP.
 * Có thể chỉnh sửa linh hoạt cho từng cấp.
 */
export const SKILL_UPGRADE_COST: Record<number, number> = {
    1: 2,   // lên cấp 1 tốn 2 XP
    2: 4,   // lên cấp 2 tốn 4 XP
    3: 6,   // lên cấp 3 tốn 6 XP
    4: 8,   // lên cấp 4 tốn 8 XP
    5: 10,  // lên cấp 5 tốn 10 XP
    6: 12,  // lên cấp 6 tốn 12 XP
};

/** Giới hạn cấp tối đa cho Ngũ Hành (1–6) */
export const ELEMENT_MAX_LEVEL = 6;

/** Giới hạn cấp tối đa cho Kỹ Năng (0–6) */
export const SKILL_MAX_LEVEL = 6;

/**
 * Bảng ngưỡng XP → cấp Đặc Kỹ Môn Phái.
 * Sắp xếp tăng dần theo minXp.
 */
export const SECT_XP_LEVELS: { level: number; minXp: number }[] = [
    { level: 1, minXp: 0 },
    { level: 2, minXp: 20 },
    { level: 3, minXp: 50 },
    { level: 4, minXp: 90 },
    { level: 5, minXp: 140 },
    { level: 6, minXp: 201 },
];

/**
 * Tính cấp Đặc Kỹ Môn Phái dựa trên tổng XP tích lũy.
 */
export function getSectLevelFromTotalXp(totalXp: number): number {
    for (let i = SECT_XP_LEVELS.length - 1; i >= 0; i--) {
        if (totalXp >= SECT_XP_LEVELS[i].minXp) return SECT_XP_LEVELS[i].level;
    }
    return 1;
}

/**
 * Danh sách các loại sự kiện changelog.
 * UI timeline tra cứu để render màu sắc, icon, label cho mỗi node.
 */
export const CHANGELOG_TYPES = {
    element_upgrade:    { label: 'Nâng Hành',       color: '#e74c3c', icon: '🔥' },
    skill_upgrade:      { label: 'Nâng Kỹ Năng',    color: '#3498db', icon: '📘' },
    technique_learned:  { label: 'Lĩnh Ngộ Thuật',  color: '#9b59b6', icon: '⚡' },
    sect_upgrade:       { label: 'Thăng Cấp Phái',  color: '#f1c40f', icon: '🏛️' },
    xp_gain:            { label: 'Nhận Tu Vi',       color: '#2ecc71', icon: '✨' },
    xp_adjust:          { label: 'Hiệu Chỉnh XP',   color: '#95a5a6', icon: '🔧' },
    identity_change:    { label: 'Thay Đổi Danh',   color: '#1abc9c', icon: '🔄' },
} as const;

export type ChangelogType = keyof typeof CHANGELOG_TYPES;
