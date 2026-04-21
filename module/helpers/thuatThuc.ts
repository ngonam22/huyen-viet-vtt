import type { ThuatThuc, ThuatThucSource, UsageFrequency } from "../../types/thuatThuc";
import { THUAT_THUC, THUAT_THUC_BY_ID } from "./config";
import { getThiTocById } from "./thiToc";

const THUAT_THUC_ITEM_TYPE = "thuatThuc";

/** Catalog lookup by id. Returns undefined if the id is not in the seed catalog. */
export function getThuatThucById(id: string): ThuatThuc | undefined {
    return THUAT_THUC_BY_ID[id];
}

/** All catalog entries (for picker / filters). */
export function getAllThuatThuc(): ThuatThuc[] {
    return THUAT_THUC;
}

/**
 * Add a Thuật Thức item to an actor. Does not check prerequisites and does
 * not charge XP — callers decide policy (see spec §8).
 */
export async function learnThuatThuc(
    actor: Actor,
    techniqueId: string,
    source: ThuatThucSource
): Promise<void> {
    const entry = getThuatThucById(techniqueId);
    if (!entry) {
        throw new Error(`Không tìm thấy Thuật Thức với id="${techniqueId}"`);
    }

    await actor.createEmbeddedDocuments("Item", [
        {
            name: entry.name,
            type: THUAT_THUC_ITEM_TYPE,
            system: {
                techniqueId,
                source,
                usesRemaining: entry.usage.maxUses,
                lastResetAt: null,
                notes: "",
            },
        },
    ]);
}

/** Remove a single Thuật Thức item by id from the actor. */
export async function removeThuatThuc(actor: Actor, itemId: string): Promise<void> {
    await actor.deleteEmbeddedDocuments("Item", [itemId]);
}

/**
 * Grant all starter techniques for the actor's current clan.
 * Called after setThiTocForActor. No-op if the clan has no starters.
 */
export async function grantClanStarterTechniques(
    actor: Actor,
    clanId: string
): Promise<void> {
    const clan = getThiTocById(clanId);
    if (!clan || !clan.starterTechniques || clan.starterTechniques.length === 0) {
        return;
    }

    const docs = clan.starterTechniques
        .map((id) => {
            const entry = getThuatThucById(id);
            if (!entry) {
                console.warn(
                    `[HuyenViet] Clan "${clanId}" references unknown Thuật Thức "${id}"`
                );
                return null;
            }
            return {
                name: entry.name,
                type: THUAT_THUC_ITEM_TYPE,
                system: {
                    techniqueId: id,
                    source: "clan" as ThuatThucSource,
                    usesRemaining: entry.usage.maxUses,
                    lastResetAt: null,
                    notes: "",
                },
            };
        })
        .filter((d): d is NonNullable<typeof d> => d !== null);

    if (docs.length > 0) {
        await actor.createEmbeddedDocuments("Item", docs);
    }
}

/** Remove every clan-granted Thuật Thức from the actor (called on clan change/removal). */
export async function removeClanGrantedTechniques(actor: Actor): Promise<void> {
    const ids = actor.items
        .filter(
            (i) =>
                i.type === THUAT_THUC_ITEM_TYPE &&
                (i as any).system?.source === "clan"
        )
        .map((i) => i.id)
        .filter((id): id is string => !!id);

    if (ids.length > 0) {
        await actor.deleteEmbeddedDocuments("Item", ids);
    }
}

/**
 * Use a Thuật Thức: decrement usesRemaining and post a chat card.
 * Returns true if used, false if blocked (no uses remaining).
 */
export async function useThuatThuc(actor: Actor, itemId: string): Promise<boolean> {
    const item = actor.items.get(itemId);
    if (!item || item.type !== THUAT_THUC_ITEM_TYPE) return false;

    const sys = (item as any).system;
    const entry = getThuatThucById(sys.techniqueId);
    if (!entry) return false;

    const unlimited = entry.usage.frequency === "unlimited";
    if (!unlimited && sys.usesRemaining <= 0) return false;

    if (!unlimited) {
        await item.update({ "system.usesRemaining": sys.usesRemaining - 1 });
    }

    await postThuatThucChatCard(actor, item as any, entry);
    return true;
}

/**
 * Reset all Thuật Thức items on the actor whose catalog frequency matches.
 * Pass multiple frequencies to reset several tiers at once (§6.3).
 */
export async function resetByFrequency(
    actor: Actor,
    frequencies: UsageFrequency[]
): Promise<void> {
    const set = new Set(frequencies);
    const updates: { _id: string; "system.usesRemaining": number; "system.lastResetAt": number }[] = [];
    const now = Date.now();

    for (const item of actor.items) {
        if (item.type !== THUAT_THUC_ITEM_TYPE) continue;
        const sys = (item as any).system;
        const entry = getThuatThucById(sys.techniqueId);
        if (!entry) continue;
        if (!set.has(entry.usage.frequency)) continue;
        if (sys.usesRemaining === entry.usage.maxUses) continue;

        updates.push({
            _id: item.id as string,
            "system.usesRemaining": entry.usage.maxUses,
            "system.lastResetAt": now,
        });
    }

    if (updates.length > 0) {
        await actor.updateEmbeddedDocuments("Item", updates);
    }
}

export async function restScene(actor: Actor): Promise<void> {
    await resetByFrequency(actor, ["perTurn", "perRound", "perScene"]);
}

export async function restSession(actor: Actor): Promise<void> {
    await resetByFrequency(actor, ["perTurn", "perRound", "perScene", "perSession"]);
}

export async function restLong(actor: Actor): Promise<void> {
    await resetByFrequency(actor, [
        "perTurn",
        "perRound",
        "perScene",
        "perSession",
        "perDay",
        "perWeek",
    ]);
}

/** Manually reset a single Thuật Thức (for perCampaign / perOpportunity). */
export async function manualResetThuatThuc(
    actor: Actor,
    itemId: string
): Promise<void> {
    const item = actor.items.get(itemId);
    if (!item || item.type !== THUAT_THUC_ITEM_TYPE) return;
    const sys = (item as any).system;
    const entry = getThuatThucById(sys.techniqueId);
    if (!entry) return;

    await item.update({
        "system.usesRemaining": entry.usage.maxUses,
        "system.lastResetAt": Date.now(),
    });
}

/** Post a chat card with the rules text for a Thuật Thức (DM-facing display). */
export async function postThuatThucChatCard(
    actor: Actor,
    item: Item,
    entry: ThuatThuc
): Promise<void> {
    const content = await renderTemplate(
        "systems/huyen-viet-vtt/templates/chat/thuat-thuc-card.hbs",
        { actor, item, entry }
    );

    await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor }),
        content,
    });
}
