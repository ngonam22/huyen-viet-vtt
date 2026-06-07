import { calculateFromRolls, calculateDuongBinhAm, type Roll as HvDieRoll } from "../helpers/rollDice";
import { SKILL_LABELS } from "../helpers/config";

type HvRollType = "normal" | "advantage" | "disadvantage";

interface CreateHvRollCardOptions {
    /** Tiêu đề hiển thị trên chat card. Mặc định: "Gieo Thiên Mệnh" */
    title?: string;
    /** Loại roll: bình thường, ưu thế (roll thêm 1 dice giữ cao nhất), bất lợi (giữ thấp nhất). Mặc định: "normal" */
    rollType?: HvRollType;
    /** Phạm vi hiển thị chat message theo Foundry API: "publicroll" | "gmroll" | "blindroll" | "selfroll".
     *  Nếu không truyền, đọc từ game.settings "core.rollMode" (setting toàn cục của Foundry). */
    chatMode?: string;
    /** Skill kích hoạt Roll này ở dạng String */
    skill?: string;
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

    const rollType = options.rollType ?? "normal";
    const skillKey = options.skill ?? null;
    const skillLabel = skillKey ? (SKILL_LABELS[skillKey as keyof typeof SKILL_LABELS] ?? null) : null;
    const skillIcon = skillKey ? `/systems/huyen-viet-vtt/assets/icons/ky-nang/${skillKey}.png` : null;

    const content = await renderTemplate(
        "systems/huyen-viet-vtt/templates/chat/hv-roll-card.hbs",
        {
            title: options.title ?? "Gieo Thiên Mệnh",
            actorName: actor.name,
            time: formatTime(new Date()),
            diceCount: `${diceData.length}d10`,
            skillLabel,
            skillIcon,
            duongResult: result.duongResult,
            binhResult: result.binhResult,
            amResult: result.amResult,
            total: result.total,
            rollType,
            isAdvantage: rollType === "advantage",
            isDisadvantage: rollType === "disadvantage",
            modeLabel: rollType === "advantage"
                ? "Thuận lợi"
                : rollType === "disadvantage"
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
                rollType
            }
        }
    };

    const resolvedMode = options.chatMode ?? (game.settings?.get("core", "rollMode") as string) ?? "publicroll";
    if (resolvedMode === "gmroll" || resolvedMode === "blindroll") {
        chatData.whisper = (game.users?.filter((u: any) => u.isGM && u.active) ?? [])
            .map((u: any) => u.id);
    } else if (resolvedMode === "selfroll") {
        chatData.whisper = [(game as any).user?.id].filter(Boolean);
    }
    if (resolvedMode === "blindroll") {
        chatData.blind = true;
    }
    return ChatMessage.create(chatData);
}
