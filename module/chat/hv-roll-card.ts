import { calculateFromRolls, calculateDuongBinhAm, type Roll as HvDieRoll } from "../helpers/rollDice";

type HvRollMode = "normal" | "advantage" | "disadvantage";

interface CreateHvRollCardOptions {
    title?: string;
    mode?: HvRollMode;
}

function classifyDie(value: number): { category: string; count: number; label: string } {
    const { duongCount, binhCount, amCount } = calculateDuongBinhAm(value);

    if (duongCount) return { category: "duong", count: duongCount, label: `Dương x${duongCount}` };
    if (binhCount) return { category: "binh", count: binhCount, label: `Bình x${binhCount}` };
    return { category: "am", count: amCount, label: `Âm x${amCount}` };
}

// Mặt D10 sẽ hiển thị là 0
function normalizeD10Face(value: number): number {
    return value === 10 ? 0 : value;
}

function formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export async function createHvRollCard(
    actor: Actor,
    roll: foundry.dice.Roll,
    options: CreateHvRollCardOptions = {}
): Promise<ChatMessage | undefined> {
    const diceTerm = roll.dice?.[0];
    const diceData: HvDieRoll[] = (diceTerm?.results ?? [])
        .filter((result: any) => result.active)
        .map((result: any) => ({
            value: normalizeD10Face(Number(result.result)),
            rerollFrom: null
        }));

    const result = calculateFromRolls(diceData);
    const diceRows = result.rolls.map((die, index) => ({
        index: index + 1,
        value: die.value,
        rerollFrom: die.rerollFrom,
        ...classifyDie(die.value)
    }));

    const rollMode = options.mode ?? "normal";
    const content = await renderTemplate(
        "systems/huyen-viet-vtt/templates/chat/hv-roll-card.hbs",
        {
            title: options.title ?? "Gieo Thiên Mệnh",
            actorName: actor.name,
            time: formatTime(new Date()),
            diceCount: `${diceData.length}d10`,
            duongResult: result.duongResult,
            binhResult: result.binhResult,
            amResult: result.amResult,
            total: result.total,
            rollMode,
            isAdvantage: rollMode === "advantage",
            isDisadvantage: rollMode === "disadvantage",
            modeLabel: rollMode === "advantage"
                ? "Thuận lợi"
                : rollMode === "disadvantage"
                    ? "Bất lợi"
                    : "Bình thường",
            diceRows
        }
    );

    const chatData: any = {
        speaker: ChatMessage.getSpeaker({ actor }),
        content,
        rolls: [roll],
        flags: {
            "huyen-viet-vtt": {
                cardType: "hv-roll",
                rollMode
            }
        }
    };

    const rollModeSetting = game.settings?.get("core", "rollMode") ?? "publicroll";
    (ChatMessage as any).applyRollMode(chatData, rollModeSetting);
    return ChatMessage.create(chatData);
}
