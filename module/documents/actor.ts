import { calculateAbility } from "../helpers/ability";
import { calculateFromRolls, type Roll } from "../helpers/rollDice";
import { hasDiceSoNice } from "../../utils/diceSoNice";
import { getThiTocById } from "../helpers/thiToc";
import { AppliedUpgrade, UpgradeRule } from "../../types/upgrade";
import { HvCharacterSystemData, HvComputedTotals, isElementKey, isSkillKey, SKILL_KEYS } from "../helpers/config";
import { getBoiCanhById } from "../helpers/boiCanh";
import { getGiaCanhById } from "../helpers/giaCanh";
import { getMonPhaiById } from "../helpers/monPhai";
import { hasCondition } from "../helpers/conditions";
import { createHvRollCard } from "../chat/hv-roll-card";

/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class huyenvietvttActor extends Actor {

    /** @override */
    prepareData() {
        // Prepare data for the actors. Calling the super version of this executes
        // the following, in order: data reset (to clear active effects),
        // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
        // prepareDerivedData().
        super.prepareData();

        console.log("NEW FROM TS")
        const system = this.system

        // khoi tao thong so
        // system.abilities ??= calculateAbility()

    }

    async testDiceSoNice(numDice: number = 1): Promise<void> {
        const roll = await new Roll(`${numDice}d10`).evaluate();
        await createHvRollCard(this, roll, { mode: "normal" });
    }


    /** @override */
    prepareBaseData() {
        // Data modifications in this step occur before processing embedded
        // documents or derived data.
    }

    /**
     * Initialize sucLuc.value and tamLuc.value to their computed base on first creation.
     * After this point, value is only changed by explicit player actions (damage, spending MP).
     * @override
     */
    _onCreate(data: object, options: object, userId: string): void {
        // @ts-expect-error
        super._onCreate(data, options, userId);

        // @ts-expect-error TS2367
        if (this.type !== "character") return;

        // _onCreate fires on all connected clients — only the creating user should write
        if (game.user?.id !== userId) return;

        const system = this.system as unknown as HvCharacterSystemData;

        this.update({
            "system.abilities.sucLuc.value": system.abilities.sucLuc.base,
            "system.abilities.tamLuc.value": system.abilities.tamLuc.base,
        });
    }

    /**
     * @override
     * Augment the actors source data with additional dynamic data that isn't
     * handled by the actors's DataModel. Data calculated in this step should be
     * available both inside and outside of character sheets (such as if an actors
     * is queried and has a roll executed directly from it).
     */
    prepareDerivedData() {
        super.prepareDerivedData()

        // @ts-expect-error TS2367
        if (this.type !== "character") return;

        const system = this.system as unknown as HvCharacterSystemData

        // 1) clone base values từ actor.system ra object tạm
        this.resetPrimaryStats(system);
        const totals = this.buildComputedTotals(system)

        // 2) Apply tất cả item Thị Tộc đang có
        this.applyThiTocItems(this, totals);

        // Apply tat ca Boi Canh dang co
        this.applyBoiCanhItems(this, totals);

        this.applyGiaCanhItems(this, totals);

        this.applyMonPhaiItems(this, totals);

        this.applyXpUpgrades(system, totals);

        // 3) tính abilities từ totals đã được cộng bonus
        this.computeAbilities(system, totals);

        // 4) apply ability modifiers from equipped weapons and armor
        //    (runs after computeAbilities so formula values are already set)
        this.applyEquippedItemEffects(system);

        // 5) Loạn Tâm: mental breakdown overrides Cảnh Giác to 1
        //    Must run after computeAbilities() so the formula value is already set.
        if (hasCondition(this, 'loanTam')) {
            system.abilities.canhGiac.value = 1;
        }

        console.log('____ recalculated')
    }

    /**
     * Reset toan bo ngu hanh ve 1
     * Skills ve 0
     * @param system
     */
    resetPrimaryStats(system: HvCharacterSystemData): void {
        system.elements.hoa.value = 1;
        system.elements.tho.value = 1;
        system.elements.kim.value = 1;
        system.elements.thuy.value = 1;
        system.elements.moc.value = 1;

        system.skills.chinhTri = 0;
        system.skills.khoaHoc = 0;
        system.skills.thanHoc = 0;
        system.skills.xaHoi = 0;
        system.skills.yHoc = 0;
        system.skills.myThuat = 0;
        system.skills.vanTu = 0;
        system.skills.thoiTrang = 0;
        system.skills.chienCu = 0;
        system.skills.laoDong = 0;
        system.skills.thuongNghiep = 0;
        system.skills.haiNghiep = 0;
        system.skills.hacNghiep = 0;
        system.skills.sinhTon = 0;
        system.skills.lanhDao = 0;
        system.skills.leDao = 0;
        system.skills.bieuDien = 0;
        system.skills.tamY = 0;
        system.skills.theThuat = 0;
        system.skills.voThuat = 0;
        system.skills.binhPhap = 0;
        system.skills.thienDinh = 0;
    }

    buildComputedTotals(system: HvCharacterSystemData): HvComputedTotals {
        return {
            elements: {
                hoa: system.elements.hoa.value,
                tho: system.elements.tho.value,
                kim: system.elements.kim.value,
                thuy: system.elements.thuy.value,
                moc: system.elements.moc.value
            },
            skills: {
                chinhTri: system.skills.chinhTri,
                khoaHoc: system.skills.khoaHoc,
                thanHoc: system.skills.thanHoc,
                xaHoi: system.skills.xaHoi,
                yHoc: system.skills.yHoc,

                myThuat: system.skills.myThuat,
                vanTu: system.skills.vanTu,
                thoiTrang: system.skills.thoiTrang,
                chienCu: system.skills.chienCu,

                laoDong: system.skills.laoDong,
                thuongNghiep: system.skills.thuongNghiep,
                haiNghiep: system.skills.haiNghiep,
                hacNghiep: system.skills.hacNghiep,
                sinhTon: system.skills.sinhTon,

                lanhDao: system.skills.lanhDao,
                leDao: system.skills.leDao,
                bieuDien: system.skills.bieuDien,
                tamY: system.skills.tamY,

                theThuat: system.skills.theThuat,
                voThuat: system.skills.voThuat,
                binhPhap: system.skills.binhPhap,
                thienDinh: system.skills.thienDinh
            }
        };
    }

    applyThiTocItems(actor: Actor, totals: HvComputedTotals): void {

        const thiTocItems = actor.items.filter((item) => (item.type as string) === "thiToc");

        for (const item of thiTocItems) {
            const clanId = item.system?.clanId as string | undefined;
            if (!clanId) continue;

            const clan = getThiTocById(clanId);
            if (!clan) continue;

            this.applyUpgradeRules(totals, clan.upgrade);
        }
    }

    applyBoiCanhItems(actor: Actor, totals: HvComputedTotals): void {

        const thiTocItems = actor.items.filter((item) => (item.type as string) === "boiCanh");

        for (const item of thiTocItems) {
            const clanId = item.system?.id as string | undefined;
            if (!clanId) continue;

            const boiCanhById = getBoiCanhById(clanId);
            if (!boiCanhById) continue;

            this.applyUpgradeRules(totals, boiCanhById.upgrade);
        }
    }

    applyGiaCanhItems(actor: Actor, totals: HvComputedTotals): void {
        const giaCanhItems = actor.items.filter((i) => (i.type as string) === "giaCanh");

        for (const item of giaCanhItems) {
            const appliedUpgrades = (item.system as any)?.appliedUpgrades as AppliedUpgrade[] | undefined;
            if (!appliedUpgrades?.length) continue;

            for (const upgrade of appliedUpgrades) {
                const { rule, selectedIndices } = upgrade;

                // Rule requires player choice but none made yet → skip
                if (rule.choose && (!selectedIndices || selectedIndices.length === 0)) continue;

                const effectsToApply = rule.choose
                    ? selectedIndices!.map((i) => rule.effects[i]).filter(Boolean)
                    : rule.effects;

                for (const effect of effectsToApply) {
                    if (rule.target === "element") {
                        if (!isElementKey(effect.name)) continue;
                        this.applyNumericModifier(totals.elements, effect.name, rule.mode, effect.value);
                    }
                    if (rule.target === "skill") {
                        if (!isSkillKey(effect.name)) continue;
                        this.applyNumericModifier(totals.skills, effect.name, rule.mode, effect.value);
                    }
                }
            }
        }
    }

    applyMonPhaiItems(actor: Actor, totals: HvComputedTotals): void {
        const monPhaiItems = actor.items.filter((i) => (i.type as string) === "monPhai");

        for (const item of monPhaiItems) {
            const appliedUpgrades = (item.system as any)?.appliedUpgrades as AppliedUpgrade[] | undefined;
            if (!appliedUpgrades?.length) continue;

            for (const upgrade of appliedUpgrades) {
                const { rule, selectedIndices } = upgrade;

                if (rule.choose && (!selectedIndices || selectedIndices.length === 0)) continue;

                const effectsToApply = rule.choose
                    ? selectedIndices!.map((i) => rule.effects[i]).filter(Boolean)
                    : rule.effects;

                for (const effect of effectsToApply) {
                    if (rule.target === "element") {
                        if (!isElementKey(effect.name)) continue;
                        this.applyNumericModifier(totals.elements, effect.name, rule.mode, effect.value);
                    }
                }
            }
        }
    }

    applyXpUpgrades(system: HvCharacterSystemData, totals: HvComputedTotals): void {
        const appliedUpgrades = system.upgrades as AppliedUpgrade[] | undefined;
        if (!appliedUpgrades?.length) return;

        for (const upgrade of appliedUpgrades) {
            this.applyUpgradeRules(totals, [upgrade.rule]);
        }
    }

    applyUpgradeRules(totals: HvComputedTotals, rules: UpgradeRule[]): void {

        for (const rule of rules) {
            // tạm thời: nếu choose có tồn tại thì auto lấy N effect đầu tiên
            // sau này nếu có UI chọn option riêng thì thay logic chỗ này
            const selectedEffects = rule.choose
                ? rule.effects.slice(0, rule.choose)
                : rule.effects;

            for (const effect of selectedEffects) {
                if (rule.target === "element") {
                    if (!isElementKey(effect.name)) continue;
                    this.applyNumericModifier(totals.elements, effect.name, rule.mode, effect.value);
                }

                if (rule.target === "skill") {
                    if (!isSkillKey(effect.name)) continue;
                    this.applyNumericModifier(totals.skills, effect.name, rule.mode, effect.value);
                }
            }
        }

        console.log(totals)
    }

    applyNumericModifier<T extends string>(
        target: Record<T, number>,
        key: T,
        mode: "add" | "set" | "multiply",
        value: number
    ): void {
        switch (mode) {
            case "add":
                target[key] += value;
                break;

            case "set":
                target[key] = value;
                break;

            case "multiply":
                target[key] *= value;
                break;
        }
    }

    computeAbilities(system: HvCharacterSystemData, totals: HvComputedTotals): void {
        const hoa = totals.elements.hoa;
        const tho = totals.elements.tho;
        const kim = totals.elements.kim;
        const thuy = totals.elements.thuy;
        const moc = totals.elements.moc;

        // merge element vao lai trong system
        system.elements.hoa.value = hoa
        system.elements.tho.value = tho
        system.elements.kim.value = kim
        system.elements.thuy.value = thuy
        system.elements.moc.value = moc

        // thay bằng công thức rulebook
        system.abilities.sucLuc.base = 5 + moc + hoa + tho;
        system.abilities.tamLuc.base = thuy + tho + kim;
        system.abilities.canhGiac.value = Math.ceil((hoa + kim + tho) / 3);
        system.abilities.chuTam.value = kim + thuy + moc;
        system.abilities.tocDo.value = (thuy + moc + hoa) / 2;
        system.abilities.nguHop.value = Math.min(
            system.abilities.sucLuc.base,
            system.abilities.tamLuc.base,
            system.abilities.canhGiac.value,
            system.abilities.chuTam.value,
            system.abilities.tocDo.value
        );

        // update skills vao lai trong system
        for (let skill of SKILL_KEYS) {
            if (!system.skills.hasOwnProperty(skill) || !(skill in totals.skills)) {
                return
            }

            system.skills[skill] = totals.skills?.[skill]
        }
    }

    /**
     * Apply target:"ability" passiveEffects from all EQUIPPED items only.
     * Unequipped inventory items are ignored entirely.
     * Runs after computeAbilities() so formula values are already in place.
     * target:"damage" effects are intentionally skipped — handled at combat time.
     */
    applyEquippedItemEffects(system: HvCharacterSystemData): void {
        const weaponList: any[] = [];
        const armorList: any[] = [];
        const itemList: any[] = [];

        // only take equipped items and put it in weaponList, armorList, itemList to process later
        this.items.filter(i => (i.system as any).isEquipped).forEach(i => {
            if ((i.type as string) === 'vuKhi') {
                weaponList.push(i);
            } else if ((i.type as string) === 'giapTru') {
                armorList.push(i);
            } else if ((i.type as string) === 'phuKien') {
                itemList.push(i);
            }
        })

        for (const weapon of weaponList) {
            const ws = weapon.system as any;
            const rules = [...ws.passiveEffects];
            if (ws.isTwoHanded) rules.push(...ws.twoHandedEffects);
            this._applyAbilityRules(system, rules);
        }

        let totalResistance = 0;
        for (const armor of armorList) {
            totalResistance += (armor.system as any).resistance ?? 0;
            this._applyAbilityRules(system, (armor.system as any).passiveEffects);
        }
        system.abilities.khangLuc.value = totalResistance;

        for (const acc of itemList) {
            this._applyAbilityRules(system, (acc.system as any).passiveEffects ?? []);
        }
    }

    /**
     * Apply only target:"ability" rules directly onto system.abilities.
     * Other targets (element, skill, damage) are ignored here.
     */
    _applyAbilityRules(system: HvCharacterSystemData, rules: any[]): void {
        for (const rule of rules) {
            if (rule.target !== 'ability') continue;
            for (const effect of rule.effects) {
                const ability = (system.abilities as any)[effect.name];
                if (ability === undefined) continue;
                // use .value for computed abilities; use .base for resource abilities
                const field = 'base' in ability ? 'base' : 'value';
                switch (rule.mode) {
                    case 'add': ability[field] += effect.value; break;
                    case 'set': ability[field] = effect.value; break;
                    case 'multiply': ability[field] = Math.floor(ability[field] * effect.value); break;
                }
            }
        }
    }

    /**
     *
     * @override
     * Augment the actors's default getRollData() method by appending the data object
     * generated by the its DataModel's getRollData(), or null. This polymorphic
     * approach is useful when you have actors & items that share a parent Document,
     * but have slightly different data preparation needs.
     */
    getRollData() {
        return { ...super.getRollData(), ...(this.system.getRollData?.() ?? null) };
    }

    async rollCheck({ } = {}) {
        let diceCount = 2
        const roll = await (new Roll(`${diceCount}d10`)).evaluate();

        const diceResults: number[] = []
        const diceData: Roll[] = roll.dice[0].results.map((r) => {
            const value = r.result === 10 ? 0 : r.result;
            diceResults.push(value)
            return {
                value,
                rerollFrom: null
            }
        });

        await createHvRollCard(this, roll, { mode: "normal" });

        console.log(`---You rolled the dice`)
        return calculateFromRolls(diceData)
    }
}
