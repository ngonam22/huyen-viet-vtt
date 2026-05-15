export function registerChatHooks(): void {
    Hooks.on("renderChatMessageHTML", (message, html) => {
        const cardType = (message as any).getFlag("huyen-viet-vtt", "cardType");
        if (cardType !== "hv-roll") return;

        const card = html.querySelector(".hv-roll-card");
        const toggle = card?.querySelector<HTMLButtonElement>("[data-action='toggle-hv-roll-details']");
        const details = card?.querySelector<HTMLElement>(".hv-roll-card__details");
        if (!card || !toggle || !details) return;

        toggle.setAttribute("aria-expanded", "false");
        details.hidden = true;
        card.classList.remove("is-expanded");

        toggle.addEventListener("click", () => {
            const isExpanded = toggle.getAttribute("aria-expanded") === "true";
            toggle.setAttribute("aria-expanded", String(!isExpanded));
            details.hidden = isExpanded;
            card.classList.toggle("is-expanded", !isExpanded);
        });
    });
}
