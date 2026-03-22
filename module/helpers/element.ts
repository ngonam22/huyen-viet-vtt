import {ELEMENTS} from './config'

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