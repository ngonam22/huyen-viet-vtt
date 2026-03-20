
export function hasDiceSoNice(): boolean {
    return !!game.modules.get("dice-so-nice")?.active && !!(game as any).dice3d;
}