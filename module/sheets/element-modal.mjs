import { ELEMENTS, SKILL_KEYS, SKILL_LABELS } from '../helpers/config'

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class ElementModal extends HandlebarsApplicationMixin(ApplicationV2)
{
    static DEFAULT_OPTIONS = {
        id: "hv-element-modal",
        tag: "section",
        classes: ["huyen-viet-vtt", "element-modal"],
        position: {
            width: 520,
            height: "auto",
        },
        window: {
            title: "Bảng Tung Xúc Xắc",
            resizable: true,
        },
    };

    static PARTS = {
        main: {
            template: "systems/huyen-viet-vtt/templates/apps/element-modal.hbs",
        },
    };

    constructor(actor, skillKey = null, options = {}) {
        super(options);

        this.actor = actor;
        this.skillKey = skillKey;
        this._selectedElement = "kim";
        this._selectedSkillKey = skillKey ?? null;
        this._selectedWeaponId = null;
        this._rollType = "normal";
        this._chatMode = game.settings?.get("core", "rollMode") ?? "publicroll";
    }

    static show(actor, skillKey = null) {
        return new this(actor, skillKey).render(true);
    }

    async _onRender(_context, _options) {
        await super._onRender(_context, _options);

        const el = this.element;

        // Element tablet selection
        const $tablets = el.querySelectorAll('.elemental-tablet');
        $tablets.forEach(btn => {
            if (btn.dataset.elementKey === this._selectedElement) {
                btn.classList.add('is-active');
            }
            btn.addEventListener('click', () => {
                if (btn.classList.contains('is-active')) {
                    btn.classList.remove('is-active');
                    this._selectedElement = null;
                    return;
                }
                $tablets.forEach(b => b.classList.remove('is-active'));
                btn.classList.add('is-active');
                this._selectedElement = btn.dataset.elementKey;
            });
        });

        // Skill select
        const $skillSelect = el.querySelector('#skillSelect');
        if ($skillSelect) {
            $skillSelect.addEventListener('change', () => {
                this._selectedSkillKey = $skillSelect.value || null;
            });
        }

        // Weapon select
        const $weaponSelect = el.querySelector('#weaponSelect');
        if ($weaponSelect) {
            $weaponSelect.addEventListener('change', () => {
                this._selectedWeaponId = $weaponSelect.value || null;
            });
        }

        // Roll type selection (advantage / normal / disadvantage)
        const $rollOptionBtns = el.querySelectorAll('.roll-option-btn');
        $rollOptionBtns.forEach(btn => {
            if (btn.dataset.rollType === this._rollType) btn.classList.add('is-active');
            btn.addEventListener('click', () => {
                $rollOptionBtns.forEach(b => b.classList.remove('is-active'));
                btn.classList.add('is-active');
                this._rollType = btn.dataset.rollType;
            });
        });

        // Advanced accordion toggle
        const $advancedToggle = el.querySelector('#advancedToggle');
        const $advancedBody = el.querySelector('#advancedBody');
        const $accordion = el.querySelector('.hv-em__accordion');
        if ($advancedToggle && $advancedBody && $accordion) {
            $advancedToggle.addEventListener('click', () => {
                const isOpen = $advancedBody.classList.toggle('is-open');
                $accordion.classList.toggle('is-open', isOpen);
            });
        }

        // Roll mode selection (publicroll / gmroll / blindroll / selfroll)
        const $rollModeBtns = el.querySelectorAll('.roll-mode-btn');
        $rollModeBtns.forEach(btn => {
            if (btn.dataset.rollMode === this._chatMode) {
                btn.classList.add('is-active');
            }
            btn.addEventListener('click', () => {
                $rollModeBtns.forEach(b => b.classList.remove('is-active'));
                btn.classList.add('is-active');
                this._chatMode = btn.dataset.rollMode;
            });
        });
    }

    async _prepareContext(_options) {
        const skillOptions = SKILL_KEYS.map(key => ({
            key,
            label: SKILL_LABELS[key] ?? key,
            value: this.actor.system.skills[key] ?? 0,
            isSelected: key === this._selectedSkillKey,
        }));

        const equippedWeapons = this.actor.items
            .filter(i => i.type === 'vuKhi' && i.system.isEquipped && i.system.condition !== 'vo-nat')
            .map(i => ({
                id: i.id,
                name: i.name,
                effectiveDamage: i.system.effectiveDamage,
                isSelected: i.id === this._selectedWeaponId,
            }));

        return {
            system: this.actor.system,
            skillOptions,
            equippedWeapons,
        };
    }

    async _onClickAction(event, target) {
        const action = target.dataset.action;

        if (action === 'roll-dice') {
            const skillValue = this._selectedSkillKey
                ? (this.actor.system.skills[this._selectedSkillKey] ?? 0)
                : 0;
            const elementValue = this._selectedElement
                ? (this.actor.system.elements[this._selectedElement]?.value ?? 0)
                : 0;
            const numDice = Math.max(1, skillValue + elementValue);

            const selectedWeapon = this._selectedWeaponId
                ? this.actor.items.get(this._selectedWeaponId)
                : null;

            const title = selectedWeapon
                ? `Tấn công — ${selectedWeapon.name}`
                : this._selectedSkillKey
                    ? (SKILL_LABELS[this._selectedSkillKey] ? SKILL_LABELS[this._selectedSkillKey] + ` (+${skillValue})` : 'Gieo Thiên Mệnh')
                    : 'Gieo Thiên Mệnh';

            await this.actor.testDiceSoNice(numDice, this._rollType, this._chatMode, title, this._selectedSkillKey ?? undefined);
            this.close();
        }
    }
}
