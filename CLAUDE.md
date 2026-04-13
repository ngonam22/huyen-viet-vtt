# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **FoundryVTT Game System** called "Huyền Việt Đại Lục" — a Vietnamese-themed tabletop RPG built on the Foundry boilerplate system. Compatible with FoundryVTT v13.339+.

## Commands

```bash
npm install             # Install dependencies
npm run build           # Full build: compiles TS, bundles CSS, copies all static files
npm run watch           # Same as build but re-runs on file changes (dev mode)
npm run createSymlinks  # Create symlinks for FoundryVTT dev setup
```

Build output goes to `build/huyen-viet-vtt/` — symlink this into FoundryVTT's `Data/systems/` directory for development.

## Build System

Everything goes through **Vite** (`vite.config.ts`). There is no separate generate step.

A single `npm run build` does all of the following:
1. Compiles `module/boilerplate.ts` (and all imports) → `build/huyen-viet-vtt/module/huyen-viet-vtt.mjs`
2. Processes `scss/` via Tailwind/PostCSS → `build/huyen-viet-vtt/css/huyen-viet-vtt.css`
3. Copies static dirs: `templates/`, `lang/`, `assets/`, `packs/`, `lib/`
4. Copies static files: `system.json`, `template.json`, `character-creation-config.json`

**After any code change**, run `npm run build` to update the build output. Use `npm run watch` during active development so Foundry hot-reloads on each save.

The `src/` folder is no longer part of the build — it contains the old boilerplate generator script and abandoned SCSS (migrated to `scss/`). Do not add new code there.

## Game Rules & Specifications

The `specs/` folder contains markdown files that document the game rules and system design. Always consult these before implementing any game mechanic.

- **`specs/rule_overview.md`** — Single source of truth for the rulebook. Read this first when working on anything rules-related (stats, abilities, skills, clans, backgrounds, dice mechanics, etc.).
- **`specs/ui-patterns.md`** — UX rationale for UI components and interaction patterns (inventory toggle, checkbox behaviour, visual language). Read this before modifying inventory UI or shared components (`hv-toggle`, `hv-checkbox`).

When in doubt about intended behavior, the spec files take precedence over the current code.

### Spec Sync Rule (strictly enforced)

After making any code change unless is specified that is allowed to skip the spec check:

1. **Re-read the relevant spec files** — check whether the change affects anything documented there (rules, data structures, formulas, schemas, etc.).
2. **Suggest spec updates if needed** — if the code change introduces, modifies, or removes something that the specs document or should document, propose the exact edits to keep the specs current.
3. **Confirm if no update is needed** — if no spec file needs changing, explicitly state that ("No spec updates needed — [brief reason]"). Do not silently skip this step.

This applies to all spec files, not just `rule_overview.md`. Some changes affect only technical specs (schema shape, data flow, module structure), not the rulebook — that's fine, but still check and confirm either way.

## Architecture

### Entry Point
`module/boilerplate.ts` — Vite entry point. Registers DataModels, Actor/Item document classes, ApplicationV2 sheets, and Handlebars helpers on Foundry's `init` hook. Imports `boilerplate.mjs` which holds most of the legacy logic.

### Stat Recalculation Pipeline
The core mechanic: `huyenvietvttActor.prepareDerivedData()` in `module/documents/actor.ts` runs on every actor update:

1. **Reset** elements to 1, skills to 0
2. **Apply** clan (Thị Tộc) item bonuses — each grants +1 element, +1 skill
3. **Apply** background (Bối Cảnh) item bonuses — each grants +1 element, +1 skill
4. **Apply** upgrade rules (add/set/multiply modifiers)
5. **Compute** 6 derived abilities from the 5 elements

### Element → Ability Formulas
Defined in `module/helpers/ability.ts`:
- **Sức Lực** = 5 + Mộc + Hỏa + Thổ
- **Tâm Lực** = Thủy + Thổ + Kim
- **Cảnh Giác** = ⌈(Hỏa + Kim + Thổ) / 3⌉
- **Chú Tâm** = Kim + Thủy + Mộc
- **Tốc Độ** = (Thủy + Mộc + Hỏa) / 2
- **Ngụ Hợp** = min(all other abilities)

### Key Modules
- `module/data/` — DataModel schemas for all actor/item types (`.mjs` files)
- `module/helpers/config.ts` — System constants: 5 elements, 22 skills (4 categories), clan/background configs, upgrade rules
- `module/helpers/thiToc.ts` / `boiCanh.ts` — Clan and background bonus application logic
- `module/helpers/rollDice.ts` — Dice rolling with Dice So Nice module integration
- `module/sheets/` — ApplicationV2 sheet classes for actors and items
- `module/chat/` — Chat message hooks and roll card rendering

### Data Flow
- Actor base stats live in `system.*` DataModel fields
- Items (thiToc, boiCanh) carry `clanId` / `id` that reference configs in `config.ts`
- `character-creation-config.json` maps the UI for character creation selections
- The `_module.mjs` file in `module/data/` is the central export for all DataModels and system constants

### TypeScript vs MJS
The project is mid-migration: newer files are `.ts`, older ones are `.mjs`. Both compile into the same build output. Keep new code in `.ts`.

### Required External Module
`dice-so-nice` — declared as a required module in `system.json`. The dice system assumes it's installed.
