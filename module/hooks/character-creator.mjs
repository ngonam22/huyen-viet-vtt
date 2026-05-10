import { CharacterCreatorPanel } from '../sheets/character-creator-panel.mjs';

const PENDING_CREATOR_ACTORS = new Set();

export function registerCharacterCreatorHooks() {
  Hooks.on('preCreateActor', (actor, _data, options, userId) => {
    if (userId !== game.user.id || actor.type !== 'character') return;
    options.renderSheet = false;
  });

  Hooks.on('createActor', (actor, _options, userId) => {
    if (userId !== game.user.id || actor.type !== 'character') return;
    PENDING_CREATOR_ACTORS.add(actor.id);

    setTimeout(() => {
      actor.sheet?.close?.();
      CharacterCreatorPanel.show(actor, { mode: 'create', initialStep: 'boiCanh' });
      PENDING_CREATOR_ACTORS.delete(actor.id);
    }, 50);
  });

  Hooks.on('renderActorSheet', (app) => {
    const actor = app.actor ?? app.document;
    if (!actor || !PENDING_CREATOR_ACTORS.has(actor.id)) return;
    app.close?.();
  });
}
