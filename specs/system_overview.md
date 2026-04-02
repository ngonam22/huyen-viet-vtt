# Huyền Việt VTT — System Overview

## What This Is

**Huyền Việt Đại Lục** is a FoundryVTT game system for the Vietnamese-themed tabletop RPG of the same name. It replaces Western stat blocks (STR/DEX/INT) with **Ngũ Hành** (Five Elements) as the core character engine. All stats — combat, social, and derived — flow from the five elements.

Built on the Foundry boilerplate system, targeting FoundryVTT v13.339+.

---

## Ngũ Hành — The Five Elements

Every character is defined by five elemental scores (range 1–5), collectively called **Ngũ Hành**:

| Key    | Element | Thematic meaning                         |
|--------|---------|------------------------------------------|
| `hoa`  | Hỏa 🔥 | Fire — creativity, aggression, boldness  |
| `tho`  | Thổ 🌍 | Earth — endurance, conservatism, defense |
| `kim`  | Kim ⚔️  | Metal — discipline, precision, technique |
| `thuy` | Thủy 💧 | Water — intuition, flexibility, flow     |
| `moc`  | Mộc 🌿 | Wood — growth, transformation, empathy   |

These are the **only base stats a player directly manipulates**. Everything else is derived.

---

## Derived Abilities — Ngũ Hành Phát Nguyên

Six abilities are computed automatically from the five elements every time the actor is updated:

| Ability            | Formula                                          | Notes                              |
|--------------------|--------------------------------------------------|------------------------------------|
| **Sức Lực** (HP)   | `5 + Mộc + Hỏa + Thổ`                           | Stamina / hit points. Has `base` (formula max) and `value` (current, depleted by damage). |
| **Tâm Lực** (MP)   | `Thổ + Kim + Thủy`                               | Mental resource; 0 = Loạn Tâm. Has `base` (formula max) and `value` (current, spent by player). |
| **Cảnh Giác**      | `⌈(Hỏa + Thổ + Kim) / 3⌉`                       | Passive defense threshold          |
| **Chú Tâm**        | `Kim + Thủy + Mộc`                               | Initiative                         |
| **Tốc Độ**         | `(Thủy + Mộc + Hỏa) / 2`                         | Speed in "bộ" (steps)              |
| **Ngũ Hợp**        | `min(Sức Lực.base, Tâm Lực.base, Cảnh Giác, Chú Tâm, Tốc Độ)` | Meta-currency / fate resource. Uses `base` (max) values of Sức Lực and Tâm Lực. |

Sức Lực and Tâm Lực are **resource abilities**: the formula computes their maximum (`base`), which is recalculated on every stat update. The current value (`value`) is stored separately in the DB and is only changed by player actions (taking damage, spending MP). The other four abilities are pure roll modifiers with a single `value`.

Implementation: `module/documents/actor.ts` → `computeAbilities()`

---

## Stat Recalculation Pipeline

`huyenvietvttActor.prepareDerivedData()` runs on every actor update:

1. **Reset** — elements reset to base value (1), skills reset to 0
2. **Apply Thị Tộc (Clan)** — each grants +1 to an element and +1 to a skill
3. **Apply Bối Cảnh (Background)** — each grants +1 to an element and +1 to a skill
4. **Apply Gia Cảnh (Family Background)** — additional element/skill bonuses; deferred rules (no selection yet) are skipped
5. **Recalculate abilities** — run the six formulas above
6. **Apply equipped item effects** — `passiveEffects` (target:`ability` only) from all equipped `vuKhi`, `giapTru`, and `trangBi` items are applied on top of the computed ability values. Unequipped inventory items are fully ignored.

This means **element scores are never stored raw**; they are rebuilt from scratch on every update from bonuses layered on top of the base value.

---

## Character Creation Initialization

When a character actor is first created, both `sucLuc.value` and `tamLuc.value` default to `0` in the DB (schema default). The `_onCreate` lifecycle hook handles the one-time initialization:

1. Foundry creates the actor → `prepareData()` runs → `sucLuc.base` and `tamLuc.base` are calculated from the formulas
2. `_onCreate` fires on all connected clients — only the **creating user** proceeds (guarded by `game.user.id === userId`)
3. `actor.update()` is called to write `sucLuc.value = sucLuc.base` and `tamLuc.value = tamLuc.base`
4. Foundry persists to DB → `prepareData()` runs again → character now shows correct `current / max`

After this point, `value` is never touched by the recalc pipeline — only by explicit player actions (taking damage, spending MP, reset MP/HP, heal MP/HP).

Implementation: `huyenvietvttActor._onCreate()` in `module/documents/actor.ts`

---

## Character Identity Layers

A character is assembled from several stacked identity items, each contributing element and skill bonuses:

| Layer               | Type      | Source key   | Bonus structure                      |
|---------------------|-----------|--------------|--------------------------------------|
| **Thị Tộc** (Clan)  | Item      | `linhGiap`   | +1 element, +1 skill (12 clans, one per zodiac) |
| **Bối Cảnh** (Background) | Item | `id`        | +1 element, +1 skill (10 backgrounds) |
| **Gia Cảnh** (Family) | Item   | `id`         | +1–2 elements (choose 1), +2 skills  |

Clan animal signs (Thập Nhị Linh Giáp): Chuột, Trâu, Hổ, Mèo, Thìn, Rắn, Ngựa, Dê, Khỉ, Gà, Sói, Heo.

---

## Skills — Ngũ Đại Quốc Đạo

22 skills organized into 5 categories (scored 0–5):

| Category     | Skills                                                    |
|--------------|-----------------------------------------------------------|
| **Võ Đạo**   | Thể Thuật, Võ Thuật, Binh Pháp, Thiền Định               |
| **Văn Đạo**  | Lễ Đạo, Xã Hội, Chính Trị, Văn Tự                       |
| **Nghệ Đạo** | Mỹ Thuật, Thời Trang, Chiến Cụ, Biểu Diễn               |
| **Tu Đạo**   | Thần Học, Y Học, Lãnh Đạo, Tâm Ý                        |
| **Sinh/Hắc** | Lao Động, Thương Nghiệp, Hải Nghiệp, Hắc Nghiệp, Sinh Tồn |

---

## Equipment & Inventory

Three item types represent physical gear on a character:

| Type       | DataModel    | Purpose                                          |
|------------|--------------|--------------------------------------------------|
| `vuKhi`    | `HvVuKhi`    | Weapons — carries `baseDamage`, `range`, `passiveEffects`, `twoHandedEffects`, `traits` |
| `giapTru`  | `HvGiapTru`  | Armor — carries `baseResistance`, `resistance` (computed from condition), `passiveEffects`, `traits` |
| `trangBi`  | `HvTrangBi`  | Accessories / tools — carries `quantity`, `passiveEffects` |

All three share `isEquipped` (boolean). Items sit in the actor's embedded `items` collection. Equipping/unequipping is a toggle on the item that immediately re-triggers `prepareDerivedData`.

**Mechanical traits via `passiveEffects`:** Traits with stat consequences (e.g. Cồng Kềnh → `tocDo -1`) are encoded directly as `passiveEffects` entries rather than processing trait tag IDs. Display-only traits (Sắc Bén, Cầm Nã, etc.) live in the `traits` array and carry no mechanical processing.

**`twoHandedEffects`** on weapons: applied when `isTwoHanded === true`, but only `target:"damage"` rules inside this array are meaningful — they are intentionally skipped during `prepareDerivedData` and consumed at combat time only.

All game items are defined in `lib/items-config.json`. Use `addWeaponToActor` / `addArmorToActor` / `addAccessoryToActor` from `module/helpers/itemCatalog.ts` to add items to an actor's inventory (always unequipped).

---

## Character Progression Schema

Three fields on `system` track progression:

| Field | Type | Purpose |
|---|---|---|
| `progression.currentXp` | integer | Spendable XP — decreases on upgrade |
| `progression.totalXp` | integer | Cumulative XP — never decreases; drives Đặc Kỹ Môn Phái auto-leveling thresholds |
| `upgrades` | `AppliedUpgrade[]` | XP-purchased element/skill modifiers consumed by `recalculateCharacterStats()` |
| `changelog` | `ChangelogEntry[]` | Append-only event log for UI timeline; covers XP gains, upgrades, and identity changes |

See `specs/spec_character_progression.md` for XP cost formulas and sect auto-leveling thresholds.

---

## Dice Resolution

Rolls use a **d10 dice pool** (Gộp Xúc Xắc):

- **Pool size** = Skill rank + Elemental rank (Hành Phương)
- Each die reads as: `0` → 2 Bại | `1–3` → 1 Bại | `4–5` → 0 | `6–8` → 1 Thành | `9` → 2 Thành
- **Success** when total Thành ≥ Difficulty (ĐK)
- Surplus Thành = **Chí Thành** (crit success); shortfall = **Chí Bại** (crit failure)
- Spend 1 Tâm Lực to flip a neutral die (4 or 5) to Thành or Bại

---

## Key Source Files

| File | Purpose |
|------|---------|
| `module/helpers/config.ts` | Element/skill/ability keys; Thị Tộc, Bối Cảnh, Gia Cảnh data |
| `module/helpers/ability.ts` | `calculateAbility()` — formula math helper (not the runtime pipeline) |
| `module/helpers/thiToc.ts` | Applies clan bonuses to computed totals |
| `module/helpers/boiCanh.ts` | Applies background bonuses to computed totals |
| `module/helpers/giaCanh.ts` | `setGiaCanhForActor` / `removeGiaCanhFromActor` — manages family background item + deferred selections |
| `module/helpers/upgrade.ts` | `recalculateCharacterStats` — applies `AppliedUpgrade[]` to character stats |
| `module/helpers/itemCatalog.ts` | Catalog lookups + `addWeaponToActor` / `addArmorToActor` / `addAccessoryToActor` |
| `module/documents/actor.ts` | `prepareDerivedData()` — orchestrates the full recalc pipeline |
| `lib/items-config.json` | Static catalog of all weapons, armor, and accessories |
| `specs/rule_overview.md` | Full rulebook — source of truth for all game mechanics |
| `specs/spec_character_progression.md` | XP cost formulas, upgrade pipeline, sect auto-leveling |
| `specs/spec_equipment.md` | Weapon/armor attributes, traits, and combat pipeline |
