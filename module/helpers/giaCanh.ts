import type { GiaCanh } from "../../types/giaCanh";
import type { AppliedUpgrade, UpgradeRule } from "../../types/upgrade";
import { GIA_CANH } from "./config";

const GIA_CANH_ITEM_TYPE = "giaCanh";

export function getGiaCanhById(giaCanhId: string): GiaCanh | undefined {
  return GIA_CANH.find((g) => g.id === giaCanhId);
}

function validateSelections(
  rules: UpgradeRule[],
  selectedIndicesByRule: Record<number, number[]>
): void {
  for (const [ruleIndex, rule] of rules.entries()) {
    if (!rule.choose) continue;

    const selected = selectedIndicesByRule[ruleIndex] ?? [];

    if (selected.length !== rule.choose) {
      throw new Error(
        `Gia Cảnh rule #${ruleIndex} yêu cầu chọn đúng ${rule.choose} effect, nhưng nhận ${selected.length}`
      );
    }

    const unique = new Set(selected);
    if (unique.size !== selected.length) {
      throw new Error(`Gia Cảnh rule #${ruleIndex} có selectedIndices bị trùng`);
    }

    for (const effectIndex of selected) {
      if (effectIndex < 0 || effectIndex >= rule.effects.length) {
        throw new Error(
          `Gia Cảnh rule #${ruleIndex} có effect index không hợp lệ: ${effectIndex}`
        );
      }
    }
  }
}

function buildAppliedUpgrades(
  sourceId: string,
  rules: UpgradeRule[],
  selectedIndicesByRule: Record<number, number[]>
): AppliedUpgrade[] {
  return rules.map((rule, ruleIndex) => ({
    sourceId: `${sourceId}:${ruleIndex}`,
    rule,
    selectedIndices: rule.choose
      ? [...(selectedIndicesByRule[ruleIndex] ?? [])]
      : undefined
  }));
}

/**
 * Set Gia Cảnh cho actor:
 * - xóa gia cảnh cũ nếu có
 * - add gia cảnh mới dưới dạng Item(type="giaCanh")
 * - lưu selectedIndices để prepareDerivedData có thể tính lại đúng lựa chọn của player
 *
 * @example
 * await setGiaCanhForActor(actor, "nong-dan", {
 *   0: [1] // rule đầu tiên chọn effect index 1 => "moc"
 * });
 */
export async function setGiaCanhForActor(
  actor: Actor,
  giaCanhId: string,
  selectedIndicesByRule: Record<number, number[]> = {}
): Promise<void> {
  const giaCanh = getGiaCanhById(giaCanhId);
  if (!giaCanh) {
    throw new Error(`Không tìm thấy Gia Cảnh với id="${giaCanhId}"`);
  }

  validateSelections(giaCanh.upgrade, selectedIndicesByRule);

  const appliedUpgrades = buildAppliedUpgrades(
    giaCanh.id,
    giaCanh.upgrade,
    selectedIndicesByRule
  );

  // 1) Xóa gia cảnh cũ
  async removeGiaCanhFromActor(actor)

  // 2) Add gia cảnh mới
  await actor.createEmbeddedDocuments("Item", [
    {
      name: giaCanh.ten,
      type: GIA_CANH_ITEM_TYPE,
      system: {
        giaCanhId: giaCanh.id,
        appliedUpgrades
      }
    }
  ]);

  // 3) update actor identity
  await actor.update({
    "system.identity.giaCanh": giaCanh.id
  });
}

/**
 * Remove Gia Cảnh hiện tại khỏi actor
 */
export async function removeGiaCanhFromActor(actor: Actor): Promise<void> {
  const giaCanhItems = actor.items.filter((i) => i.type === GIA_CANH_ITEM_TYPE);
  const ids = giaCanhItems
    .map((i) => i.id)
    .filter((id): id is string => Boolean(id));

  await actor.update({
    "system.identity.giaCanh": ""
  });

  if (ids.length === 0) return;

  await actor.deleteEmbeddedDocuments("Item", ids);
}