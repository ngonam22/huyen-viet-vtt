import {ELEMENTS} from './config'

/**
 * Lấy Hành hiện tại từ ActiveEffect marker
 */
export function getActorCurrentElement(actor) {
    if (!actor) return null;

    const effect = actor.effects.find((e) =>
        Boolean(e.getFlag(game.system.id, ELEMENTS))
    );

    return effect?.getFlag(game.system.id, ELEMENTS) ?? null;
}