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
| **Sức Lực** (HP)   | `5 + Mộc + Hỏa + Thổ`                           | Stamina / hit points               |
| **Tâm Lực** (MP)   | `Thổ + Kim + Thủy`                               | Mental resource; 0 = Loạn Tâm     |
| **Cảnh Giác**      | `⌈(Hỏa + Thổ + Kim) / 3⌉`                       | Passive defense threshold          |
| **Chú Tâm**        | `Kim + Thủy + Mộc`                               | Initiative                         |
| **Tốc Độ**         | `(Thủy + Mộc + Hỏa) / 2`                         | Speed in "bộ" (steps)              |
| **Ngũ Hợp**        | `min(Sức Lực, Tâm Lực, Cảnh Giác, Chú Tâm, Tốc Độ)` | Meta-currency / fate resource  |

Implementation: `module/helpers/ability.ts` → `calculateAbility()`

---

## Stat Recalculation Pipeline

`huyenvietvttActor.prepareDerivedData()` runs on every actor update:

1. **Reset** — elements reset to base value (1), skills reset to 0
2. **Apply Thị Tộc (Clan)** — each grants +1 to an element and +1 to a skill
3. **Apply Bối Cảnh (Background)** — each grants +1 to an element and +1 to a skill
4. **Apply Gia Cảnh (Family Background)** — additional element/skill bonuses
5. **Apply upgrade modifiers** — add / set / multiply operations
6. **Recalculate abilities** — run the six formulas above

This means **element scores are never stored raw**; they are rebuilt from scratch on every update from bonuses layered on top of the base value.

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
| `module/helpers/config.ts` | Element/skill/ability keys, Thị Tộc, Bối Cảnh, Gia Cảnh data |
| `module/helpers/ability.ts` | `calculateAbility()` — the six derived ability formulas |
| `module/helpers/thiToc.ts` | Applies clan bonuses to computed totals |
| `module/helpers/boiCanh.ts` | Applies background bonuses to computed totals |
| `module/documents/actor.ts` | `prepareDerivedData()` — orchestrates the full recalc pipeline |
| `specs/rule_overview.md` | Full rulebook — source of truth for all game mechanics |
