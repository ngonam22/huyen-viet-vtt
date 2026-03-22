export async function createHvRollCard(actor: Actor, roll: Roll) {
    const faces =
        roll.dice?.[0]?.results?.filter((r: any) => r.active).map((r: any) => r.result) ?? [];

    const content = await renderTemplate(
        "systems/huyen-viet-vtt/templates/chat/hv-roll-card.hbs",
        {
            actorName: actor.name,
            formula: roll.formula,
            total: roll.total,
            faces
        }
    );

    let chatData = await roll.toMessage(
        {
            speaker: ChatMessage.getSpeaker({ actor }),
            content,
            flags: {
                "huyen-viet-vtt": {
                    cardType: "hv-roll"
                }
            }
        },
        {
            create: false,
            rollMode: game.settings.get("core", "rollMode")
        }
    );

    await ChatMessage.create(chatData);
}