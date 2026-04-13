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
