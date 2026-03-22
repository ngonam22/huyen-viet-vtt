export function registerChatHooks(): void {
    Hooks.on("renderChatMessageHTML", (message, html, context) => {
        const cardType = message.getFlag("huyen-viet-vtt", "cardType");
        if (cardType !== "hv-roll") return;

        // Tìm phần roll mặc định của Foundry
        const diceRoll = html.querySelector(".dice-roll");
        if (!diceRoll) return;

        // Thêm class riêng để CSS target
        diceRoll.classList.add("hv-roll-card");

        // Ẩn công thức nếu không muốn hiện kiểu "3d10"
        const formula = diceRoll.querySelector(".dice-formula");
        if (formula) formula.remove();

        // Đổi tiêu đề / chèn layout riêng
        const flavor = html.querySelector(".message-content .dice-flavor");
        if (flavor) {
            flavor.insertAdjacentHTML(
                "afterend",
                `<div class="hv-roll-subtitle">Thiên Mệnh đang chuyển động</div>`
            );
        }

        // Có thể đổi label của total
        const total = diceRoll.querySelector(".dice-total");
        if (total) {
            total.insertAdjacentHTML(
                "beforebegin",
                `<div class="hv-roll-total-label">Kết quả!!!</div>`
            );
        }
    });
}