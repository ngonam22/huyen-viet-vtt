import { resetByFrequency } from "../helpers/thuatThuc";

/**
 * Foundry combat hooks that reset Thuật Thức usage counters.
 * See specs/spec_thuat_thuc.md §6.3.
 *
 * - `combatTurn`: fires when the active combatant changes within a round.
 *   Reset `perTurn` on the actor whose turn just started.
 * - `combatRound`: fires when the round counter advances.
 *   Reset `perRound` on all combatants.
 */
export function registerCombatResetHooks(): void {
    Hooks.on("combatTurn", async (combat: any, updateData: any, _opts: any) => {
        const nextTurn = updateData?.turn ?? combat.turn;
        const combatant = combat?.turns?.[nextTurn];
        const actor = combatant?.actor;
        if (actor) {
            await resetByFrequency(actor, ["perTurn"]);
        }
    });

    Hooks.on("combatRound", async (combat: any, _updateData: any, _opts: any) => {
        const actors = new Set<any>();
        for (const c of combat?.combatants ?? []) {
            if (c.actor) actors.add(c.actor);
        }
        await Promise.all(
            Array.from(actors).map((a) => resetByFrequency(a, ["perRound"]))
        );
    });
}
