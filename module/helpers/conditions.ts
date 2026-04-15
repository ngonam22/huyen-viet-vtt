/** Foundry flag namespace for this system */
const NS = 'huyen-viet-vtt';

// ─── Condition definitions ─────────────────────────────────────────────────

export const CONDITIONS = [
    {
        id: 'xuatHuyet',
        label: 'Xuất Huyết',
        faIcon: 'fa-droplet',
        description: 'Mất 3 Tâm Lực mỗi khi đổ xúc xắc. Cuối lượt nhận 3 sát thương vật lý (bỏ qua Kháng Lực). Sát thương cộng dồn +3 sau mỗi vòng.',
        hasSideEffect: false,
    },
    {
        id: 'choanVang',
        label: 'Choáng Váng',
        faIcon: 'fa-face-dizzy',
        description: 'Hành động Công Kích hoặc Mưu Kế bị tăng +2 Độ Khó.',
        hasSideEffect: false,
    },
    {
        id: 'batTinh',
        label: 'Bất Tỉnh',
        faIcon: 'fa-person-falling',
        description: 'Không thể dùng khí lực để đỡ đòn. Sát thương nhận vào nhân đôi.',
        hasSideEffect: false,
    },
    {
        id: 'tonThuongNguHanh',
        label: 'Tổn Thương Ngũ Hành',
        faIcon: 'fa-star-of-life',
        description: 'Hành bị thương khi có bài xét sẽ có Độ Khó +2, nhưng Độ Khó của Hành bị Khắc tương ứng giảm 1.',
        hasSideEffect: false,
    },
    {
        id: 'loanTam',
        label: 'Loạn Tâm',
        faIcon: 'fa-brain',
        description: 'Chỉ số Cảnh Giác giảm xuống bằng 1.',
        hasSideEffect: true,  // Coded: sets canhGiac → 1 in prepareDerivedData()
    },
    {
        id: 'cuongNo',
        label: 'Cuồng Nộ',
        faIcon: 'fa-fire-flame-curved',
        description: 'Sát thương gây ra và nhận phải đều được cộng thêm +2.',
        hasSideEffect: false,
    },
    {
        id: 'camLang',
        label: 'Câm Lặng',
        faIcon: 'fa-comment-slash',
        description: 'Các hành động Mưu kế, đọc phép (Linh thuật, Ma thuật) bị tăng tới +5 Độ Khó.',
        hasSideEffect: false,
    },
] as const;

/** The 5 elements used for Tổn Thương Ngũ Hành wound tracking */
export const ELEMENTS_FOR_WOUND = [
    { id: 'kim',  label: 'Kim',  faIcon: 'fa-gear',     color: '#d4c9a8' },
    { id: 'thuy', label: 'Thủy', faIcon: 'fa-droplet',  color: '#5ba3d4' },
    { id: 'moc',  label: 'Mộc',  faIcon: 'fa-leaf',     color: '#6db87a' },
    { id: 'hoa',  label: 'Hỏa',  faIcon: 'fa-fire',     color: '#e07b4a' },
    { id: 'tho',  label: 'Thổ',  faIcon: 'fa-mountain', color: '#c49a5a' },
] as const;

// ─── Query API ─────────────────────────────────────────────────────────────

/**
 * Returns a Set of active conditionIds for the given actor.
 * Disabled ActiveEffects are excluded.
 * For Tổn Thương Ngũ Hành, the Set contains 'tonThuongNguHanh' if ≥1 elemental
 * wound effect exists — regardless of which element.
 */
export function getActiveConditions(actor: Actor): Set<string> {
    const ids = new Set<string>();
    for (const effect of actor.effects) {
        const id = (effect as any).flags?.[NS]?.conditionId;
        if (id && !(effect as any).disabled) ids.add(id);
    }
    return ids;
}

/** Returns true if the actor currently has the given condition active. */
export function hasCondition(actor: Actor, conditionId: string): boolean {
    return getActiveConditions(actor).has(conditionId);
}

/**
 * Returns the Set of wounded element ids (Tổn Thương Ngũ Hành only).
 * e.g. Set { 'hoa', 'kim' } if Hỏa and Kim are wounded.
 */
export function getWoundedElements(actor: Actor): Set<string> {
    const elements = new Set<string>();
    for (const effect of actor.effects) {
        const flags = (effect as any).flags?.[NS];
        if (
            flags?.conditionId === 'tonThuongNguHanh' &&
            flags?.woundedElement &&
            !(effect as any).disabled
        ) {
            elements.add(flags.woundedElement);
        }
    }
    return elements;
}

/** Returns true if the given element is currently wounded on the actor. */
export function isElementWounded(actor: Actor, element: string): boolean {
    return getWoundedElements(actor).has(element);
}

// ─── Mutation API ──────────────────────────────────────────────────────────

/** Creates an ActiveEffect marking the condition as active on the actor. */
export async function addCondition(actor: Actor, conditionId: string): Promise<void> {
    const def = CONDITIONS.find(c => c.id === conditionId);
    if (!def) return;
    await (actor as any).createEmbeddedDocuments('ActiveEffect', [{
        name: def.label,
        disabled: false,
        transfer: false,
        changes: [],
        flags: { [NS]: { conditionId } },
    }]);
}

/**
 * Deletes all ActiveEffects with the given conditionId from the actor.
 * For Tổn Thương Ngũ Hành, use removeCondition to clear the flag-only entry;
 * elemental wound effects are separate and managed via toggleElementWound.
 */
export async function removeCondition(actor: Actor, conditionId: string): Promise<void> {
    const toDelete = Array.from(actor.effects)
        .filter((e: any) => {
            const flags = e.flags?.[NS];
            // Only remove non-elemental entries (elemental entries have woundedElement set)
            return flags?.conditionId === conditionId && !flags?.woundedElement;
        })
        .map((e: any) => e.id);
    if (toDelete.length) {
        await (actor as any).deleteEmbeddedDocuments('ActiveEffect', toDelete);
    }
}

/** Adds the condition if absent, removes it if present. */
export async function toggleCondition(actor: Actor, conditionId: string): Promise<void> {
    if (hasCondition(actor, conditionId)) {
        await removeCondition(actor, conditionId);
    } else {
        await addCondition(actor, conditionId);
    }
}

/**
 * Applies the next elemental wound following the canonical order:
 * kim → thuy → moc → hoa → tho.
 *
 * - All 5 wounded: no-op.
 * - 0 wounded:     picks one at random.
 * - 1–4 wounded:   finds the last wounded element by order index, then
 *                  advances forward (cycling) to the first unwounded slot.
 */
export async function applyNextElementalWound(actor: Actor): Promise<void> {
    const ORDER = ['kim', 'thuy', 'moc', 'hoa', 'tho'] as const;
    const wounded = getWoundedElements(actor);

    if (wounded.size >= 5) return;

    let target: string;

    if (wounded.size === 0) {
        target = ORDER[Math.floor(Math.random() * ORDER.length)];
    } else {
        // Find the last wounded element by sequence position
        let lastIdx = -1;
        for (let i = 0; i < ORDER.length; i++) {
            if (wounded.has(ORDER[i])) lastIdx = i;
        }
        // Cycle forward until an unwounded slot is found
        target = ORDER[0]; // fallback (unreachable if wounded.size < 5)
        for (let offset = 1; offset <= ORDER.length; offset++) {
            const candidate = ORDER[(lastIdx + offset) % ORDER.length];
            if (!wounded.has(candidate)) { target = candidate; break; }
        }
    }

    await toggleElementWound(actor, target);
}

/**
 * Toggles a single elemental wound for Tổn Thương Ngũ Hành.
 * Creates a separate ActiveEffect per element so each can be toggled independently.
 */
export async function toggleElementWound(actor: Actor, element: string): Promise<void> {
    const existing = Array.from(actor.effects).find((e: any) => {
        const flags = e.flags?.[NS];
        return flags?.conditionId === 'tonThuongNguHanh' && flags?.woundedElement === element;
    });

    if (existing) {
        await (actor as any).deleteEmbeddedDocuments('ActiveEffect', [(existing as any).id]);
    } else {
        const elemDef = ELEMENTS_FOR_WOUND.find(e => e.id === element);
        await (actor as any).createEmbeddedDocuments('ActiveEffect', [{
            name: `Tổn Thương — ${elemDef?.label ?? element}`,
            disabled: false,
            transfer: false,
            changes: [],
            flags: { [NS]: { conditionId: 'tonThuongNguHanh', woundedElement: element } },
        }]);
    }
}
