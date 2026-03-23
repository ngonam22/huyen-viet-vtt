import type { ThiToc } from "../../types/thiToc";
import { BOI_CANH } from "./config";

const BOI_CANH_ITEM_TYPE = "boiCanh";

export function getBoiCanhById(id: string): ThiToc | undefined {
    return BOI_CANH.find((c) => c.id === id);
}

/**
 * Set Bối Cảnh cho actor:
 * - xóa bối cảnh cũ nếu có
 * - add bối cảnh mới dưới dạng Item(type="boiCanh")
 */
export async function setBoiCanhForActor(actor: Actor, id: string): Promise<void> {
    const boiCanh = getBoiCanhById(id);
    if (!boiCanh) {
        throw new Error(`Không tìm thấy Bối Cảnh với Id="${id}"`);
    }

    // 1) Xóa Bối cẢNH cũ
    removeBoiCanhFromActor(actor)

    // 2) Add thị tộc mới
    await actor.createEmbeddedDocuments("Item", [
        {
            name: boiCanh.ten,
            type: BOI_CANH_ITEM_TYPE,
            system: {
                id: boiCanh.id
            }
        }
    ]);

    await actor.update({
        "system.identity.boiCanh": boiCanh.id
    });
}

/**
 * Remove Boi Canh hiện tại khỏi actor
 */
export async function removeBoiCanhFromActor(actor: Actor): Promise<void> {
    // store all ids of Boi Canh (if any) into an array, then we can remove it later
    const oldBoiCanhIds: string[] = []
    const oldBoiCanhItems = actor.items.filter((i) => {
        if (i.type === BOI_CANH_ITEM_TYPE) {
            oldBoiCanhIds.push(i.id);
            return true;
        }

        return false;
    });

    await actor.update({
        "system.identity.boiCanh": ""
    });

    if (oldBoiCanhItems.length === 0) return;

    await actor.deleteEmbeddedDocuments(
        "Item",
        oldBoiCanhIds
    );

}