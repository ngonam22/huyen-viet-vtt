import type { HePhai } from "../../types/hePhai";
import type { AppliedUpgrade } from "../../types/upgrade";
import { HE_PHAI } from "./config";
import { getWeaponById, getArmorById, getAccessoryById, addWeaponToActor, addArmorToActor, addAccessoryToActor } from "./itemCatalog";

const HE_PHAI_ITEM_TYPE = "monPhai";

export function getHePhaiById(id: string): HePhai | undefined {
  return HE_PHAI[id];
}

export async function setHePhaiForActor(
  actor: Actor,
  monPhaiId: string,
  selectedIndicesByRule: Record<number, number[]> = {}
): Promise<void> {
  const monPhai = getHePhaiById(monPhaiId);
  if (!monPhai) {
    throw new Error(`Không tìm thấy Hệ Phái với id="${monPhaiId}"`);
  }

  const appliedUpgrades: AppliedUpgrade[] = monPhai.upgrade.map((rule, ruleIndex) => ({
    sourceId: `${monPhai.id}:${ruleIndex}`,
    rule,
    selectedIndices: rule.choose
      ? [...(selectedIndicesByRule[ruleIndex] ?? [])]
      : undefined,
  }));

  await removeHePhaiFromActor(actor);

  await actor.createEmbeddedDocuments("Item", [
    {
      name: monPhai.ten,
      type: HE_PHAI_ITEM_TYPE,
      system: { monPhaiId: monPhai.id, appliedUpgrades },
    },
  ]);

  await actor.update({ "system.identity.monPhai": monPhai.id });
}

export async function addHePhaiInitItemsToActor(actor: Actor, monPhaiId: string): Promise<void> {
  const monPhai = getHePhaiById(monPhaiId);
  if (!monPhai?.initItems?.length) return;

  for (const { id } of monPhai.initItems) {
    if (getWeaponById(id)) {
      await addWeaponToActor(actor, id);
    } else if (getArmorById(id)) {
      await addArmorToActor(actor, id);
    } else if (getAccessoryById(id)) {
      await addAccessoryToActor(actor, id);
    }
  }
}

export async function removeHePhaiFromActor(actor: Actor): Promise<void> {
  const monPhaiItems = actor.items.filter((i) => i.type === HE_PHAI_ITEM_TYPE);
  const ids = monPhaiItems
    .map((i) => i.id)
    .filter((id): id is string => Boolean(id));

  await actor.update({ "system.identity.monPhai": "" });

  if (ids.length === 0) return;
  await actor.deleteEmbeddedDocuments("Item", ids);
}
