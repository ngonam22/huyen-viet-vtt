import type { ThiToc } from "../../types/thiToc";
import { THI_TOC } from "./config";
import {
    grantClanStarterTechniques,
    removeClanGrantedTechniques,
} from "./thuatThuc";

const THI_TOC_ITEM_TYPE = "thiToc";

export function getThiTocById(clanId: string): ThiToc | undefined {
    return THI_TOC.find((c) => c.linhGiap === clanId);
}

/**
 * Set Thị Tộc cho actor:
 * - xóa thị tộc cũ nếu có
 * - add thị tộc mới dưới dạng Item(type="thiToc")
 */
export async function setThiTocForActor(actor: Actor, clanId: string): Promise<void> {
    const clan = getThiTocById(clanId);
    if (!clan) {
        throw new Error(`Không tìm thấy Thị Tộc với clanId="${clanId}"`);
    }

    // 1) Xóa thị tộc cũ + các Thuật Thức do clan cũ cấp
    const oldThiTocItems = actor.items.filter((i) => i.type === THI_TOC_ITEM_TYPE);
    if (oldThiTocItems.length > 0) {
        await actor.deleteEmbeddedDocuments(
            "Item",
            oldThiTocItems.map((i) => i.id)
        );
    }
    await removeClanGrantedTechniques(actor);

    // 2) Add thị tộc mới
    await actor.createEmbeddedDocuments("Item", [
        {
            name: clan.ten,
            type: THI_TOC_ITEM_TYPE,
            system: {
                clanId: clan.linhGiap
            }
        }
    ]);

    await actor.update({
        "system.identity.thiToc": clan.linhGiap
    });

    // 3) Grant starter Thuật Thức (semi-auto, spec §8.1)
    await grantClanStarterTechniques(actor, clan.linhGiap);
}

/**
 * Remove Thị Tộc hiện tại khỏi actor
 */
export async function removeThiTocFromActor(actor: Actor): Promise<void> {
    const thiTocItems = actor.items.filter((i) => i.type === THI_TOC_ITEM_TYPE);

    await actor.update({
        "system.identity.thiToc": ""
    });

    await removeClanGrantedTechniques(actor);

    if (thiTocItems.length === 0) return;

    await actor.deleteEmbeddedDocuments(
        "Item",
        thiTocItems.map((i) => i.id)
    );
}