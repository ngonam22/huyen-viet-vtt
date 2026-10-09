import type { ThiToc } from "../../types/thiToc";
import { BOI_CANH } from "./config";
import { removeXuatThanItems } from "./thiToc";

const BOI_CANH_ITEM_TYPE = "boiCanh";

export function getBoiCanhById(id: string): ThiToc | undefined {
    return BOI_CANH.find((c) => c.id === id);
}

/**
 * Set Bối Cảnh cho actor:
 * - xóa thị tộc / bối cảnh cũ nếu có
 * - add bối cảnh mới dưới dạng Item(type="boiCanh")
 * - ID lưu chung ở system.identity.thiToc
 */
export async function setBoiCanhForActor(actor: Actor, id: string): Promise<void> {
    const boiCanh = getBoiCanhById(id);
    if (!boiCanh) {
        throw new Error(`Không tìm thấy Bối Cảnh với Id="${id}"`);
    }

    // 1) Xóa thị tộc / bối cảnh cũ
    await removeXuatThanItems(actor);

    // 2) Add bối cảnh mới
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
        "system.identity.thiToc": boiCanh.id
    });
}
