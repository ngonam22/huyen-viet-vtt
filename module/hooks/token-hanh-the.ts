import { layHanhThe } from "../helpers/element";

const EFFECT_NAME = "hv-hanh-the-effect";
const SYSTEM_ID = "huyen-viet-vtt";

function removeEffect(token: any): void {
    const effect = token.getChildByName(EFFECT_NAME);
    if (effect) {
        effect.video?.pause();
        effect.destroy({ children: true, texture: true });
    }
}

function syncEffect(token: any): void {
    const hanhThe = token.actor ? layHanhThe(token.actor) : null;
    const current = token.getChildByName(EFFECT_NAME);

    if (!hanhThe) {
        removeEffect(token);
        return;
    }
    if (current?.hanhThe === hanhThe) return;

    removeEffect(token);

    const video = document.createElement("video");
    video.src = `systems/${SYSTEM_ID}/assets/${hanhThe}-energy.webm`;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    const texture: any = PIXI.Texture.from(video);
    const effect: any = new PIXI.Sprite(texture);
    effect.name = EFFECT_NAME;
    effect.hanhThe = hanhThe;
    effect.video = video;
    effect.anchor.set(0.5);
    effect.position.set(token.w / 2, token.h / 2);
    effect.width = token.w * 2;
    effect.height = token.h * 1.4;
    effect.alpha = 0.85;
    effect.eventMode = "none";
    token.addChildAt(effect, 0);
    const renderFrame = () => {
        if (effect.destroyed || video.paused) return;
        texture.baseTexture.resource.update();
        const canvas = (globalThis as any).canvas;
        canvas?.app?.renderer.render(canvas.app.stage);
        (video as any).requestVideoFrameCallback(renderFrame);
    };
    video.addEventListener("canplay", () => (video as any).requestVideoFrameCallback(renderFrame), { once: true });
    void video.play().catch(() => undefined);
}

function syncActorTokens(actor: any): void {
    for (const token of (globalThis as any).canvas?.tokens?.placeables ?? []) {
        if (token.actor?.id === actor.id) syncEffect(token);
    }
}

export function registerTokenHanhTheHooks(): void {
    Hooks.on("drawToken", (token: any) => syncEffect(token));
    Hooks.on("canvasReady", () => {
        for (const token of (globalThis as any).canvas?.tokens?.placeables ?? []) syncEffect(token);
    });

    for (const hook of ["createActiveEffect", "updateActiveEffect", "deleteActiveEffect"]) {
        Hooks.on(hook as any, (effect: any) => {
            if (effect.parent?.documentName === "Actor" && effect.flags?.[SYSTEM_ID]?.hanhThe !== undefined) {
                // ActiveEffect hooks can fire before actor.effects reflects the new Hanh The.
                setTimeout(() => syncActorTokens(effect.parent));
            }
        });
    }
}
