/**
 * Progression System — Business Logic
 * See specs/spec_character_progression.md
 *
 * Handles:
 *  - Element upgrade (XP purchase)
 *  - Skill upgrade (XP purchase)
 *  - Technique purchase (XP + hard-check prerequisites)
 *  - Sect auto-leveling (Đặc Kỹ Môn Phái)
 *  - Manual XP adjustment
 *  - Changelog management
 */

import type { ChangelogEntry, ChangelogEventType } from "../../types/actor-character";
import type { HvElementKey, HvSkillKey } from "./config";
import {
    ELEMENT_UPGRADE_COST,
    SKILL_UPGRADE_COST,
    ELEMENT_MAX_LEVEL,
    SKILL_MAX_LEVEL,
    MON_PHAI,
    getSectLevelFromTotalXp,
    THUAT_THUC_XP_COST_DEFAULT,
    isElementKey,
    isSkillKey,
} from "./config";
import { getThuatThucById, learnThuatThuc } from "./thuatThuc";

/* ------------------------------------------------------------------ */
/*  Changelog                                                         */
/* ------------------------------------------------------------------ */

/**
 * Tạo một UUID đơn giản cho changelog entry.
 * Dùng randomID của Foundry nếu có, fallback sang crypto.
 */
function generateId(): string {
    if (typeof foundry !== "undefined" && foundry.utils?.randomID) {
        return foundry.utils.randomID();
    }
    return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Ghi thêm 1 entry vào `system.changelog` (append-only).
 */
export async function addChangelogEntry(
    actor: Actor,
    partial: Omit<ChangelogEntry, "id" | "timestamp">
): Promise<void> {
    const entry: ChangelogEntry = {
        id: generateId(),
        timestamp: Date.now(),
        ...partial,
    };

    const current: ChangelogEntry[] = (actor as any).system?.changelog ?? [];
    await actor.update({
        "system.changelog": [...current, entry],
    });
}

/* ------------------------------------------------------------------ */
/*  Element Upgrade                                                   */
/* ------------------------------------------------------------------ */

/**
 * Nâng cấp 1 Ngũ Hành bằng XP.
 *
 * - Tra bảng `ELEMENT_UPGRADE_COST` cho chi phí.
 * - Hard-update `system.elements.<key>.value` trong DB.
 * - Trừ `currentXp` (totalXp giữ nguyên).
 * - KHÔNG thay đổi `sucLuc.value` / `tamLuc.value`.
 * - Ghi changelog.
 *
 * @returns `true` nếu thành công, ném lỗi nếu thất bại.
 */
export async function upgradeElement(actor: Actor, elementKey: HvElementKey): Promise<boolean> {
    if (!isElementKey(elementKey)) {
        throw new Error(`Hành không hợp lệ: "${elementKey}"`);
    }

    const system = (actor as any).system;
    const currentLevel: number = system.elements[elementKey].value;
    const targetLevel = currentLevel + 1;

    // Validate max level
    if (targetLevel > ELEMENT_MAX_LEVEL) {
        ui.notifications?.warn(`${elementKey} đã đạt cấp tối đa (${ELEMENT_MAX_LEVEL}).`);
        return false;
    }

    // Lookup cost
    const cost = ELEMENT_UPGRADE_COST[targetLevel];
    if (cost === undefined) {
        throw new Error(`Không tìm thấy chi phí cho cấp ${targetLevel} trong ELEMENT_UPGRADE_COST.`);
    }

    // Validate XP
    const currentXp: number = system.progression.currentXp;
    if (currentXp < cost) {
        ui.notifications?.warn(`Không đủ Tu Vi. Cần ${cost} XP, hiện có ${currentXp} XP.`);
        return false;
    }

    // Execute: hard-update element value + deduct currentXp
    await actor.update({
        [`system.elements.${elementKey}.value`]: targetLevel,
        "system.progression.currentXp": currentXp - cost,
    });

    // Log
    await addChangelogEntry(actor, {
        type: "element_upgrade",
        label: `${elementKey}: ${currentLevel} → ${targetLevel}`,
        field: `elements.${elementKey}`,
        from: currentLevel,
        to: targetLevel,
        xpCost: cost,
    });

    // Post-effect: check sect upgrade (element changes don't affect skill-based sect reqs,
    // but we call anyway for consistency — it's a no-op if nothing qualifies)
    await checkSectUpgrade(actor);

    return true;
}

/* ------------------------------------------------------------------ */
/*  Skill Upgrade                                                     */
/* ------------------------------------------------------------------ */

/**
 * Nâng cấp 1 Kỹ Năng bằng XP.
 *
 * - Tra bảng `SKILL_UPGRADE_COST` cho chi phí.
 * - Hard-update `system.skills.<key>` trong DB.
 * - Trừ `currentXp` (totalXp giữ nguyên).
 * - Ghi changelog.
 * - Trigger `checkSectUpgrade()` (nâng kỹ năng có thể thỏa mãn yêu cầu Pending).
 */
export async function upgradeSkill(actor: Actor, skillKey: HvSkillKey): Promise<boolean> {
    if (!isSkillKey(skillKey)) {
        throw new Error(`Kỹ năng không hợp lệ: "${skillKey}"`);
    }

    const system = (actor as any).system;
    const currentLevel: number = system.skills[skillKey];
    const targetLevel = currentLevel + 1;

    // Validate max level
    if (targetLevel > SKILL_MAX_LEVEL) {
        ui.notifications?.warn(`${skillKey} đã đạt cấp tối đa (${SKILL_MAX_LEVEL}).`);
        return false;
    }

    // Lookup cost
    const cost = SKILL_UPGRADE_COST[targetLevel];
    if (cost === undefined) {
        throw new Error(`Không tìm thấy chi phí cho cấp ${targetLevel} trong SKILL_UPGRADE_COST.`);
    }

    // Validate XP
    const currentXp: number = system.progression.currentXp;
    if (currentXp < cost) {
        ui.notifications?.warn(`Không đủ Tu Vi. Cần ${cost} XP, hiện có ${currentXp} XP.`);
        return false;
    }

    // Execute: hard-update skill value + deduct currentXp
    await actor.update({
        [`system.skills.${skillKey}`]: targetLevel,
        "system.progression.currentXp": currentXp - cost,
    });

    // Log
    await addChangelogEntry(actor, {
        type: "skill_upgrade",
        label: `${skillKey}: ${currentLevel} → ${targetLevel}`,
        field: `skills.${skillKey}`,
        from: currentLevel,
        to: targetLevel,
        xpCost: cost,
    });

    // Post-effect: skill upgrade may satisfy pending sect requirements
    await checkSectUpgrade(actor);

    return true;
}

/* ------------------------------------------------------------------ */
/*  Thuật Thức — XP Purchase                                          */
/* ------------------------------------------------------------------ */

/**
 * Mua Thuật Thức bằng XP (HARD CHECK prerequisites).
 *
 * - Kiểm tra prerequisites (element + skill requirements).
 * - Trừ 3 XP → tạo item `source='xp'`.
 * - Ghi changelog.
 */
export async function learnThuatThucWithXp(
    actor: Actor,
    techniqueId: string
): Promise<boolean> {
    const entry = getThuatThucById(techniqueId);
    if (!entry) {
        throw new Error(`Không tìm thấy Thuật Thức với id="${techniqueId}"`);
    }

    const system = (actor as any).system;
    const cost = entry.xpCost ?? THUAT_THUC_XP_COST_DEFAULT;

    // Validate XP
    const currentXp: number = system.progression.currentXp;
    if (currentXp < cost) {
        ui.notifications?.warn(`Không đủ Tu Vi. Cần ${cost} XP, hiện có ${currentXp} XP.`);
        return false;
    }

    // HARD CHECK: Prerequisites
    if (entry.prerequisites) {
        // Check element requirements
        if (entry.prerequisites.elements) {
            for (const [elemKey, requiredLevel] of Object.entries(entry.prerequisites.elements)) {
                const actorLevel = system.elements[elemKey]?.value ?? 0;
                if (actorLevel < (requiredLevel as number)) {
                    ui.notifications?.warn(
                        `Chưa đủ yêu cầu: ${elemKey} cần cấp ${requiredLevel}, hiện có cấp ${actorLevel}.`
                    );
                    return false;
                }
            }
        }
        // Check skill requirements
        if (entry.prerequisites.skills) {
            for (const [skillKey, requiredLevel] of Object.entries(entry.prerequisites.skills)) {
                const actorLevel = system.skills[skillKey] ?? 0;
                if (actorLevel < (requiredLevel as number)) {
                    ui.notifications?.warn(
                        `Chưa đủ yêu cầu: ${skillKey} cần cấp ${requiredLevel}, hiện có cấp ${actorLevel}.`
                    );
                    return false;
                }
            }
        }
    }

    // Check duplicate: đã có technique này chưa?
    const existing = actor.items.find(
        (i) =>
            (i.type as string) === "thuatThuc" &&
            (i as any).system?.techniqueId === techniqueId
    );
    if (existing) {
        ui.notifications?.warn(`Nhân vật đã có Thuật Thức "${techniqueId}".`);
        return false;
    }

    // Execute: deduct XP
    await actor.update({
        "system.progression.currentXp": currentXp - cost,
    });

    // Create technique item with source='xp'
    await learnThuatThuc(actor, techniqueId, "xp");

    // Log
    await addChangelogEntry(actor, {
        type: "technique_learned",
        label: `Lĩnh Ngộ: ${entry.name}`,
        field: `thuatThuc.${techniqueId}`,
        from: null,
        to: techniqueId,
        xpCost: cost,
    });

    return true;
}

/* ------------------------------------------------------------------ */
/*  Sect Auto-Leveling (Đặc Kỹ Môn Phái)                             */
/* ------------------------------------------------------------------ */

/**
 * Kiểm tra và tự động thăng cấp Đặc Kỹ Môn Phái.
 *
 * Flow:
 * 1. Đọc monPhaiId từ identity
 * 2. Tính targetLevel từ totalXp
 * 3. So sánh với currentSectLevel
 * 4. Check progressionReqs (kỹ năng requirements)
 * 5. Auto-upgrade nếu đủ
 */
export async function checkSectUpgrade(actor: Actor): Promise<void> {
    const system = (actor as any).system;

    // 1. Đọc monPhaiId
    const monPhaiId: string = system.identity?.monPhai;
    if (!monPhaiId || !MON_PHAI[monPhaiId]) {
        return; // Nhân vật chưa có Môn Phái hoặc Môn Phái không tồn tại trong config
    }

    const sect = MON_PHAI[monPhaiId];

    // 2. Tính targetLevel từ totalXp
    const totalXp: number = system.progression?.totalXp ?? 0;
    const targetLevel = getSectLevelFromTotalXp(totalXp);

    // 3. Đọc currentSectLevel
    const currentSectLevel: number = system.attributes?.level?.value ?? 1;
    if (targetLevel <= currentSectLevel) {
        return; // Chưa đủ XP để lên cấp mới
    }

    // 4. Lấy requirements cho targetLevel
    const requirements = sect.progressionReqs[targetLevel];
    if (!requirements) {
        return; // Không có yêu cầu cho cấp này
    }

    // 5. Kiểm tra từng kỹ năng
    for (const [skillKey, requiredLevel] of Object.entries(requirements)) {
        const actorSkillLevel: number = system.skills[skillKey] ?? 0;
        if (actorSkillLevel < (requiredLevel as number)) {
            // FAIL — Pending. Sẽ re-check khi player nâng kỹ năng hoặc nhận XP
            console.log(
                `[HuyenViet] Sect upgrade pending: ${monPhaiId} cấp ${targetLevel} — ` +
                `${skillKey} cần ${requiredLevel}, hiện có ${actorSkillLevel}`
            );
            return;
        }
    }

    // 6. TẤT CẢ kỹ năng ĐỦ → Auto-upgrade
    const oldLevel = currentSectLevel;
    await actor.update({
        "system.attributes.level.value": targetLevel,
    });

    // Log
    await addChangelogEntry(actor, {
        type: "sect_upgrade",
        label: `Đặc Kỹ ${sect.ten}: ${oldLevel} → ${targetLevel}`,
        field: "attributes.level",
        from: oldLevel,
        to: targetLevel,
        xpCost: 0,
    });

    ui.notifications?.info(`🏛️ Đặc Kỹ Môn Phái thăng cấp lên ${targetLevel}!`);
}

/* ------------------------------------------------------------------ */
/*  Manual XP Adjustment                                              */
/* ------------------------------------------------------------------ */

/**
 * Chỉnh XP thủ công (GM trao / hiệu đính).
 *
 * - `amount > 0`: thêm XP (cả currentXp và totalXp).
 * - `amount < 0`: trừ XP (cả currentXp và totalXp).
 * - Trigger checkSectUpgrade() nếu amount > 0 (totalXp tăng).
 */
export async function updateXpManual(actor: Actor, amount: number): Promise<void> {
    if (amount === 0) return;

    const system = (actor as any).system;
    const currentXp: number = system.progression.currentXp;
    const totalXp: number = system.progression.totalXp;

    const newCurrentXp = Math.max(0, currentXp + amount);
    const newTotalXp = Math.max(0, totalXp + amount);

    await actor.update({
        "system.progression.currentXp": newCurrentXp,
        "system.progression.totalXp": newTotalXp,
    });

    // Log
    const logType: ChangelogEventType = amount > 0 ? "xp_gain" : "xp_adjust";
    await addChangelogEntry(actor, {
        type: logType,
        label: amount > 0 ? `+${amount} Tu Vi` : `${amount} Tu Vi (hiệu chỉnh)`,
        field: "progression",
        from: { currentXp, totalXp },
        to: { currentXp: newCurrentXp, totalXp: newTotalXp },
        xpCost: 0,
    });

    // Nếu thêm XP → totalXp tăng → có thể chạm ngưỡng Môn Phái mới
    if (amount > 0) {
        await checkSectUpgrade(actor);
    }
}
