import {ELEMENTS, SKILL_LABELS} from './config'

/**
 * Lấy Hành hiện tại từ ActiveEffect marker
 */
export function layHanhThe(actor: Actor): string|null {

    const effect = actor.effects.find(
        e => (e.flags as any)["huyen-viet-vtt"]?.hanhThe
    );

    if (!effect) return null;

    const hanhThe = (effect?.flags as any)["huyen-viet-vtt"]?.hanhThe;

    return hanhThe || null;
}

const signed = (n: number) => `${n >= 0 ? '+' : ''}${n}`;

/**
 * Tiêu đề roll dùng chung giữa #hv-element-modal và roll trực tiếp trên sheet.
 */
export function buildRollTitle(
    elementKey?: string | null,
    elementValue: number = 0,
    skillKey?: string | null,
    skillValue: number = 0
): string {
    const elementLabel = elementKey ? game.i18n.localize(ELEMENTS[elementKey]?.label ?? '') : null;
    const skillLabel = skillKey ? SKILL_LABELS[skillKey] : null;

    if (elementLabel) return `${elementLabel} (${signed(elementValue)})`;
    if (skillLabel) return `${skillLabel} (${signed(skillValue)})`;
    return 'Gieo Thiên Mệnh';
}