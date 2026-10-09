import type { ThiToc } from "../../types/thiToc";
import { THI_TOC } from "./config";
import {
    grantClanStarterTechniques,
    removeClanGrantedTechniques,
} from "./thuatThuc";

const THI_TOC_ITEM_TYPE = "thiToc";
// Thị Tộc và Bối Cảnh loại trừ nhau, cùng lưu ID ở system.identity.thiToc
const XUAT_THAN_ITEM_TYPES = [THI_TOC_ITEM_TYPE, "boiCanh"];

export function getThiTocById(clanId: string): ThiToc | undefined {
    return THI_TOC.find((c) => c.linhGiap === clanId);
}

/**
 * Xóa toàn bộ item Thị Tộc / Bối Cảnh + các Thuật Thức do clan cấp
 */
export async function removeXuatThanItems(actor: Actor): Promise<void> {
    const ids = actor.items
        .filter((i) => XUAT_THAN_ITEM_TYPES.includes(i.type as string))
        .map((i) => i.id);
    if (ids.length > 0) {
        await actor.deleteEmbeddedDocuments("Item", ids);
    }
    await removeClanGrantedTechniques(actor);
}

/**
 * Set Thị Tộc cho actor:
 * - xóa thị tộc / bối cảnh cũ nếu có
 * - add thị tộc mới dưới dạng Item(type="thiToc")
 */
export async function setThiTocForActor(actor: Actor, clanId: string): Promise<void> {
    const clan = getThiTocById(clanId);
    if (!clan) {
        throw new Error(`Không tìm thấy Thị Tộc với clanId="${clanId}"`);
    }

    // 1) Xóa thị tộc / bối cảnh cũ + các Thuật Thức do clan cũ cấp
    await removeXuatThanItems(actor);

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
 * Remove Thị Tộc / Bối Cảnh hiện tại khỏi actor
 */
export async function removeThiTocFromActor(actor: Actor): Promise<void> {
    await actor.update({
        "system.identity.thiToc": ""
    });

    await removeXuatThanItems(actor);
}
