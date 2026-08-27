/**
 * Progression Modal — "Thăng Cấp" ApplicationV2
 *
 * Two-tab layout:
 *   Tab 1 (Lĩnh Ngộ): 3 category cards → drill-down upgrade lists
 *   Tab 2 (Nhật Ký):  Horizontal timeline with Prev/Next + detail panel
 */
import {
    ELEMENT_UPGRADE_COST,
    SKILL_UPGRADE_COST,
    ELEMENT_MAX_LEVEL,
    SKILL_MAX_LEVEL,
    CHANGELOG_TYPES,
    MON_PHAI,
    getSectLevelFromTotalXp,
} from '../helpers/config.ts';

import {
    upgradeElement,
    upgradeSkill,
    updateXpManual,
} from '../helpers/progression.ts';

import { ThuatThucPicker } from './thuat-thuc-picker.mjs';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

/* ---------- i18n-safe element/skill labels ---------- */
const ELEMENT_LABELS = {
    hoa:  'Hỏa',
    tho:  'Thổ',
    kim:  'Kim',
    thuy: 'Thủy',
    moc:  'Mộc',
};

const SKILL_LABELS = {
    chinhTri:     'Chính Trị',
    khoaHoc:      'Khoa Học',
    thanHoc:      'Thần Học',
    xaHoi:        'Xã Hội',
    yHoc:         'Y Học',
    myThuat:      'Mỹ Thuật',
    vanTu:        'Văn Tự',
    thoiTrang:    'Thời Trang',
    chienCu:      'Chiến Cụ',
    laoDong:      'Lao Động',
    thuongNghiep: 'Thương Nghiệp',
    haiNghiep:    'Hải Nghiệp',
    hacNghiep:    'Hắc Nghiệp',
    sinhTon:      'Sinh Tồn',
    lanhDao:      'Lãnh Đạo',
    leDao:        'Lễ Đạo',
    bieuDien:     'Biểu Diễn',
    tamY:         'Tâm Ý',
    theThuat:     'Thể Thuật',
    voThuat:      'Võ Thuật',
    binhPhap:     'Binh Pháp',
    thienDinh:    'Thiền Định',
};

/* ---------- Helpers ---------- */
function timeAgo(timestamp) {
    const diff = Date.now() - timestamp;
    const mins = Math.floor(diff / 60_000);
    if (mins < 1) return 'Vừa xong';
    if (mins < 60) return `${mins} phút trước`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} giờ trước`;
    const days = Math.floor(hours / 24);
    return `${days} ngày trước`;
}

export class ProgressionModal extends HandlebarsApplicationMixin(ApplicationV2) {

    /* ── Foundry options ── */
    static DEFAULT_OPTIONS = {
        id: 'hv-progression-modal',
        tag: 'section',
        classes: ['huyen-viet-vtt', 'progression-modal'],
        position: {
            width: 760,
            height: 580,
        },
        window: {
            resizable: true,
        },
    };

    static PARTS = {
        main: {
            template: 'systems/huyen-viet-vtt/templates/apps/progression-modal.hbs',
        },
    };

    /* ── Construction ── */
    constructor(actor, options = {}) {
        super(options);
        this.actor = actor;
        this._activeTab = 'shop';
        this._shopView = 'categories'; // 'categories' | 'elements' | 'skills' | 'techniques'
        this._activeEventIndex = -1;    // timeline selection
    }

    get title() {
        return `✨ Thăng Cấp — ${this.actor.name}`;
    }

    static show(actor) {
        return new this(actor).render(true);
    }

    /* ── Context ── */
    async _prepareContext(_options) {
        const system = this.actor.system;
        const currentXp = system.progression?.currentXp ?? 0;
        const totalXp = system.progression?.totalXp ?? 0;

        // Sect info
        const monPhaiId = system.identity?.monPhai;
        const sect = monPhaiId ? MON_PHAI[monPhaiId] : null;
        const monPhaiLabel = sect ? game.i18n.localize(sect.ten) : '';
        const sectLevel = getSectLevelFromTotalXp(totalXp);

        // Build element upgrade rows
        const elementUpgrades = Object.entries(ELEMENT_LABELS).map(([key, label]) => {
            const currentLevel = system.elements?.[key]?.value ?? 1;
            const targetLevel = currentLevel + 1;
            const isMaxed = currentLevel >= ELEMENT_MAX_LEVEL;
            const cost = isMaxed ? 0 : (ELEMENT_UPGRADE_COST[targetLevel] ?? 999);
            return {
                key, label, currentLevel, targetLevel,
                isMaxed, cost,
                canAfford: !isMaxed && currentXp >= cost,
            };
        });

        // Build skill upgrade rows
        const skillUpgrades = Object.entries(SKILL_LABELS).map(([key, label]) => {
            const currentLevel = system.skills?.[key] ?? 0;
            const targetLevel = currentLevel + 1;
            const isMaxed = currentLevel >= SKILL_MAX_LEVEL;
            const cost = isMaxed ? 0 : (SKILL_UPGRADE_COST[targetLevel] ?? 999);
            return {
                key, label, currentLevel, targetLevel,
                isMaxed, cost,
                canAfford: !isMaxed && currentXp >= cost,
            };
        });

        // Check if any upgrades are purchasable (for badges)
        const canUpgradeElement = elementUpgrades.some(e => e.canAfford);
        const canUpgradeSkill = skillUpgrades.some(s => s.canAfford);
        const canAffordTechnique = currentXp >= 3;
        const canLearnTechnique = canAffordTechnique; // simplified — full check in progression.ts

        // Build changelog
        const rawChangelog = system.changelog ?? [];

        // Tổng XP đã dùng theo từng loại nâng cấp
        const totalXpSpentOnElements = rawChangelog
            .filter(e => e.type === 'element_upgrade')
            .reduce((sum, e) => sum + (e.xpCost ?? 0), 0);
        const totalXpSpentOnSkills = rawChangelog
            .filter(e => e.type === 'skill_upgrade')
            .reduce((sum, e) => sum + (e.xpCost ?? 0), 0);
        const totalXpSpentOnTechniques = rawChangelog
            .filter(e => e.type === 'technique_learned')
            .reduce((sum, e) => sum + (e.xpCost ?? 0), 0);
        const totalXpSpent = totalXpSpentOnElements + totalXpSpentOnSkills + totalXpSpentOnTechniques;

        const changelog = [...rawChangelog]
            // .sort((a, b) => b.timestamp - a.timestamp)
            .map((entry, idx) => {
                const meta = CHANGELOG_TYPES[entry.type] ?? { label: entry.type, color: '#666', icon: '📌' };
                return {
                    ...entry,
                    idx,
                    typeLabel: meta.label,
                    color: meta.color,
                    icon: meta.icon,
                    timeAgo: timeAgo(entry.timestamp),
                    isActive: idx === this._activeEventIndex,
                };
            });

        // Auto-select first event if none selected
        if (this._activeEventIndex < 0 && changelog.length > 0) {
            this._activeEventIndex = 0;
            changelog[0].isActive = true;
        }

        const activeEvent = changelog[this._activeEventIndex] ?? null;

        return {
            currentXp, totalXp,
            monPhaiLabel, sectLevel,
            activeTab: this._activeTab,
            shopView: this._shopView,
            elementUpgrades,
            skillUpgrades,
            canUpgradeElement,
            canUpgradeSkill,
            canLearnTechnique,
            canAffordTechnique,
            changelog,
            activeEvent,
            totalXpSpentOnElements,
            totalXpSpentOnSkills,
            totalXpSpentOnTechniques,
            totalXpSpent,
        };
    }

    /* ── Action handling ── */
    async _onClickAction(event, target) {
        const action = target.dataset.action;

        // Tab switching
        if (action === 'switch-tab') {
            const tab = target.dataset.tab;
            if (tab && tab !== this._activeTab) {
                this._activeTab = tab;
                this.render();
            }
            return;
        }

        // Shop sub-view navigation
        if (action === 'show-shop-detail') {
            const category = target.dataset.category;
            this._shopView = category;
            this.render();
            return;
        }

        // Element upgrade
        if (action === 'upgrade-element') {
            const key = target.dataset.key;
            const confirmed = await this._confirmUpgrade(
                'element', key, ELEMENT_LABELS[key],
                this.actor.system.elements[key].value,
                ELEMENT_UPGRADE_COST
            );
            if (confirmed) {
                await upgradeElement(this.actor, key);
                this.render();
            }
            return;
        }

        // Skill upgrade
        if (action === 'upgrade-skill') {
            const key = target.dataset.key;
            const confirmed = await this._confirmUpgrade(
                'skill', key, SKILL_LABELS[key],
                this.actor.system.skills[key],
                SKILL_UPGRADE_COST
            );
            if (confirmed) {
                await upgradeSkill(this.actor, key);
                this.render();
            }
            return;
        }

        // Technique picker
        if (action === 'open-technique-picker') {
            ThuatThucPicker.show(this.actor);
            return;
        }

        // Timeline navigation
        if (action === 'timeline-prev') {
            if (this._activeEventIndex > 0) {
                this._activeEventIndex--;
                this.render();
            }
            return;
        }
        if (action === 'timeline-next') {
            const total = (this.actor.system.changelog ?? []).length;
            if (this._activeEventIndex < total - 1) {
                this._activeEventIndex++;
                this.render();
            }
            return;
        }
        if (action === 'timeline-select') {
            const idx = parseInt(target.dataset.index);
            if (!isNaN(idx)) {
                this._activeEventIndex = idx;
                this.render();
            }
            return;
        }
    }

    /* ── Confirmation dialog ── */
    async _confirmUpgrade(type, key, label, currentLevel, costTable) {
        const targetLevel = currentLevel + 1;
        const cost = costTable[targetLevel] ?? 0;
        const currentXp = this.actor.system.progression.currentXp;
        const remaining = currentXp - cost;

        return Dialog.confirm({
            title: '🔄 Xác Nhận Nâng Cấp',
            content: `
                <div style="text-align:center; padding: 12px;">
                    <p style="font-size: 15px; margin-bottom: 8px;">
                        <strong>${label}</strong>: Cấp ${currentLevel} → Cấp ${targetLevel}
                    </p>
                    <p style="color: #e74c3c; font-weight: 600;">Chi phí: ${cost} XP</p>
                    <p style="color: #95a5a6; font-size: 13px;">Còn lại sau giao dịch: ${remaining} XP</p>
                </div>
            `,
        });
    }
}

/**
 * XP Adjust Popup — Simple dialog to manually add/subtract XP.
 * Single input: positive = add, negative = subtract.
 */
export class XpAdjustDialog {
    static async show(actor) {
        const currentXp = actor.system.progression?.currentXp ?? 0;
        const totalXp = actor.system.progression?.totalXp ?? 0;

        const content = `
            <div style="text-align: center; padding: 12px;">
                <p style="margin-bottom: 8px; font-size: 13px; color: #95a5a6;">
                    Hiện tại: ${currentXp} / ${totalXp} XP
                </p>
                <div style="margin-bottom: 12px;">
                    <label for="hv-xp-amount" style="font-weight: 600; display: block; margin-bottom: 4px;">
                        Số lượng (dương = thêm, âm = trừ):
                    </label>
                    <input id="hv-xp-amount" type="number" value="0"
                           style="width: 120px; text-align: center; font-size: 18px; font-weight: 700;"
                           autofocus />
                </div>
            </div>
        `;

        return Dialog.prompt({
            title: '✏️ Chỉnh Tu Vi',
            content,
            label: 'Xác nhận',
            callback: async (html) => {
                const amount = parseInt(html[0].querySelector('#hv-xp-amount')?.value) || 0;
                if (amount !== 0) {
                    await updateXpManual(actor, amount);
                }
            },
            rejectClose: false,
        });
    }
}
