import type { MonPhai } from "../../types/monPhai";
import type { AppliedUpgrade } from "../../types/upgrade";
import { MON_PHAI } from "./config";

const MON_PHAI_ITEM_TYPE = "monPhai";

export function getMonPhaiById(id: string): MonPhai | undefined {
  return MON_PHAI[id];
}

export async function setMonPhaiForActor(
  actor: Actor,
  monPhaiId: string,
  selectedIndicesByRule: Record<number, number[]> = {}
): Promise<void> {
  const monPhai = getMonPhaiById(monPhaiId);
  if (!monPhai) {
    throw new Error(`Không tìm thấy Môn Phái với id="${monPhaiId}"`);
  }

  const appliedUpgrades: AppliedUpgrade[] = monPhai.upgrade.map((rule, ruleIndex) => ({
    sourceId: `${monPhai.id}:${ruleIndex}`,
    rule,
    selectedIndices: rule.choose
      ? [...(selectedIndicesByRule[ruleIndex] ?? [])]
      : undefined,
  }));

  await removeMonPhaiFromActor(actor);

  await actor.createEmbeddedDocuments("Item", [
    {
      name: monPhai.ten,
      type: MON_PHAI_ITEM_TYPE,
      system: { monPhaiId: monPhai.id, appliedUpgrades },
    },
  ]);

  await actor.update({ "system.identity.monPhai": monPhai.id });
}

export async function removeMonPhaiFromActor(actor: Actor): Promise<void> {
  const monPhaiItems = actor.items.filter((i) => i.type === MON_PHAI_ITEM_TYPE);
  const ids = monPhaiItems
    .map((i) => i.id)
    .filter((id): id is string => Boolean(id));

  await actor.update({ "system.identity.monPhai": "" });

  if (ids.length === 0) return;
  await actor.deleteEmbeddedDocuments("Item", ids);
}
