# UI Patterns & UX Rationale

This file documents **why** UI patterns are designed the way they are and **how** they are intended to feel to the player. Technical details (parameters, CSS class names) live in the component files themselves — see the references at the end of each section.

---

## Inventory View Toggle

### Intent

The inventory tab has two modes toggled via a segmented control in the toolbar:

| Mode | Label | Default? |
|------|-------|----------|
| Equipped | Đang Trang Bị | Yes |
| All items | Tất Cả | No |

The **equipped view** is the default because players most often interact with the inventory mid-session to quickly see what they have ready. It acts as an *action view*: every item shown is something the character is currently using, and the checkbox directly controls that.

The **all items view** is for browsing and managing the full bag — swapping gear, checking what's in reserve. It acts as a *browsing view*: the list is stable and comprehensive regardless of equip state.

### Checkbox behaviour per mode

**Equipped view** — the checkbox is an *action control*:
- All rows show a checked (danger-red) checkbox because only equipped items appear.
- Unchecking fires `toggle-equip`. The item's `isEquipped` flag flips to false.
- On the next render, the item is no longer in `equippedWeapons/Armor/Accessories`, so it disappears from the list.
- The disappearance is intentional and immediate — it's the core interaction: uncheck = unequip = gone from this view.

**All items view** — the checkbox is a *state indicator and equip toggle*:
- Checked (danger-red) = currently equipped. Unchecked (gray) = in bag, not equipped.
- Clicking still fires `toggle-equip` — it toggles equip state in the database.
- The item **stays in the list** either way, because this view shows everything.
- Equipped rows additionally show a teal left-border accent (`.hv-inv__row--equipped`) for a secondary visual signal.

### Visual language summary

| Signal | Meaning |
|--------|---------|
| Danger-red checkbox | Item is equipped / active |
| Gray checkbox | Item is in bag, not equipped |
| Teal left-border on row | Item is equipped (used in "all" view) |
| Toolbar toggle: active option | Currently displayed view mode |

---

## Item Condition Cycling

Weapons (`vuKhi`) and armor (`giapTru`) carry a `condition` field with three states (see `spec_equipment.md` §5.1 for mechanical effects):

| State | Value | Badge style |
|-------|-------|-------------|
| Bình thường | `"normal"` | Ghost/muted — border only, no fill |
| Hư hại | `"hu-hai"` | Amber |
| Vỡ nát | `"vo-nat"` | Red |

The condition badge is **always shown** on weapon/armor rows (including the normal state) and is clickable. Each click cycles forward: `normal → hu-hai → vo-nat → normal`. The tooltip describes the current state and previews the next step.

Accessories (`trangBi`) have no `condition` field and no badge — they don't degrade per spec.

The cycle is intentionally manual: condition changes happen in-fiction (item sacrifice, trait effects like `Sắc bén` losing sharpness) and the GM or player marks them here.

---

## Shared UI Components

### `hv-toggle` — Segmented binary toggle

A pill-style two-option control. Used to switch between mutually exclusive views or modes. Both options are always visible so the player understands the alternative without clicking.

Two visual variants:
- **Labeled** (default) — labels inside the pill. Use when the options need text to be understood.
- **Minimal** — dot-only pill, no labels. Use in space-constrained toolbars where the context makes the options self-evident.

Technical reference: `templates/components/hv-toggle.hbs` (params) · `scss/components/_ui-components.scss` (styles)

---

### `hv-checkbox` — Custom styled checkbox

Replaces the native browser checkbox with a styled element that fits the system's visual language.

- **Default** (gray): neutral, item is available but inactive.
- **Active** (danger-red): item is in an active/equipped state.

The danger color is intentionally strong — it signals that something is *in use*, which is a meaningful game state. The gray default is deliberately understated so the red stands out at a glance.

Technical reference: `templates/components/hv-checkbox.hbs` (params) · `scss/components/_ui-components.scss` (styles)

---

## Condition System

### Intent

Conditions (hiệu ứng) are status flags that affect a character in-fiction. They are tracked as FoundryVTT `ActiveEffect` documents on the actor — the same mechanism used for the Hành Thể (stance) flag.

The condition system has two layers:

1. **Coded side effects** — conditions that mechanically alter stats. Only **Loạn Tâm** is coded: when active, `prepareDerivedData()` overrides `canhGiac → 1` after the element formula runs.
2. **Flag-only conditions** — all other 6 conditions. They are stored as ActiveEffects so UI components (strips, future panels) can react to them, but their mechanical effects (difficulty modifiers, damage multipliers) are applied by the GM at the table.

### Storage: ActiveEffect flag pattern

Each condition = one `ActiveEffect` with a system flag:
```js
{ flags: { "huyen-viet-vtt": { conditionId: "loanTam" } } }
```

**Tổn Thương Ngũ Hành** is special — one `ActiveEffect` *per wounded element*:
```js
{ name: "Tổn Thương — Hỏa", flags: { "huyen-viet-vtt": { conditionId: "tonThuongNguHanh", woundedElement: "hoa" } } }
```
This keeps create/delete simple (no read-modify-write on an array) and lets each element be toggled independently.

### Query API

All condition queries go through `module/helpers/conditions.ts`:

| Function | Returns | Use case |
|---|---|---|
| `getActiveConditions(actor)` | `Set<string>` of conditionIds | Know which conditions are active |
| `hasCondition(actor, id)` | `boolean` | Guard logic (e.g. Loạn Tâm override) |
| `getWoundedElements(actor)` | `Set<string>` of element ids | Know which elements are wounded |
| `isElementWounded(actor, el)` | `boolean` | Future element-aware panels |
| `toggleCondition(actor, id)` | — | Add or remove a standard condition |
| `toggleElementWound(actor, el)` | — | Add or remove one elemental wound |

`getActiveConditions()` returns `'tonThuongNguHanh'` in the Set if *any* element is wounded.

### Condition picker (ConditionModal)

A 2-column grid of cards opened by clicking the "+" button in the condition strip. Double-click a card to toggle the condition. For Tổn Thương Ngũ Hành, the card expands to show 5 element buttons — double-click each to toggle independently.

- Active card: danger-red border + subtle glow.
- Inactive card: ghost border.
- Active element button: colored using the element's color variable (`--elem-color`).

Technical reference: `module/sheets/condition-modal.mjs` · `templates/apps/condition-modal.hbs` · `scss/global/_condition-modal.scss`

### Condition strip (character sheet header)

A compact icon row below the skills grid. Always visible. Shows one danger-red pill per active condition. Tổn Thương Ngũ Hành shows one colored pill per wounded element (element color via `--elem-color`). The "+" pill opens the picker.

When no conditions are active, only the "+" button is shown — the strip has a fixed min-height so the header layout doesn't shift.

Technical reference: `templates/actor/header.hbs` (strip markup) · `scss/components/_condition-strip.scss` (styles)
