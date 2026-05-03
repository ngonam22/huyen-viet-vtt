# Repository Guidelines

## Project Structure & Module Organization

This repository is a Foundry VTT v13 game system for Huyen Viet VTT. Runtime source lives in `module/`: `module/boilerplate.ts` is the Vite entry point, `module/data/` contains DataModel schemas, `module/documents/` actor/item classes, `module/sheets/` ApplicationV2 sheets, `module/helpers/` shared game logic, `module/hooks/` Foundry hooks, and `module/chat/` chat rendering.

Templates are in `templates/`, SCSS source in `scss/`, compiled CSS in `css/`, media in `assets/`, localization in `lang/`, types in `types/`, and rules/design docs in `specs/`. Build output is generated under `build/huyen-viet-vtt/`. Avoid adding new code to `src/`; it contains legacy boilerplate scripts and old SCSS.

## Build, Test, and Development Commands

- `npm install`: install Node dependencies.
- `npm run build`: run Vite, compile TypeScript/MJS imports, process SCSS/PostCSS, and copy Foundry files into `build/huyen-viet-vtt/`.
- `npm run watch`: rebuild on file changes during Foundry development.
- `npm run createSymlinks`: create Foundry development symlinks using `foundry-config.yaml`.

There is no configured `npm test` or lint script at present. Run `npm run build` before handing off changes.

## Coding Style & Naming Conventions

Use TypeScript for new modules when practical; older `.mjs` files remain valid during migration. Keep strict TypeScript compatibility with `tsconfig.json` (`ES2022`, `moduleResolution: Bundler`, `strict: true`). Follow existing Foundry conventions: lower camelCase functions and fields, kebab-case template names, and domain identifiers such as `thuatThuc`, `thiToc`, and `boiCanh`.

Edit SCSS in `scss/`, not generated CSS unless the change is explicitly build-output only. Keep Handlebars partials small and colocated under `templates/actor`, `templates/item`, `templates/apps`, or `templates/components`.

## Testing Guidelines

No automated test framework is currently configured. Validate changes with `npm run build` and, for UI or rules behavior, load the generated system in Foundry. When changing mechanics, consult the relevant files in `specs/`, especially `specs/rule_overview.md` and feature-specific specs.

## Commit & Pull Request Guidelines

Recent commits use short imperative summaries, for example `update css`, `Add upgrade rules`, and `Refactor the module/helpers/config.ts`. Keep commits focused and describe the affected feature or subsystem.

Pull requests should include a concise description, validation steps (`npm run build`, Foundry checks), linked issues when applicable, and screenshots or short recordings for sheet, modal, inventory, or visual changes. Note any required spec updates or state that no spec updates are needed.

## Agent-Specific Instructions

Respect existing uncommitted work. Do not overwrite generated assets or user edits unless asked. For rules, data schema, or UI behavior changes, check `specs/` and keep documentation aligned with implementation.
