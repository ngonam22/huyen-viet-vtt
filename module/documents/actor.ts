import {calculateAbility} from "../helpers/ability";
import {calculateFromRolls, type Roll} from "../helpers/rollDice";
import {hasDiceSoNice} from "../../utils/diceSoNice";
import {getThiTocById} from "../helpers/thiToc";
import {UpgradeRule} from "../../types/upgrade";
import {HvCharacterSystemData, HvComputedTotals, isElementKey, isSkillKey, SKILL_KEYS} from "../helpers/config";

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

        // Lấy mặt xúc xắc thực tế từ Foundry Roll
        const dice = roll.dice?.[0];
        const rolls: Roll[] = (dice?.results ?? [])
            .filter((r: any) => r.active)
            .map((r: any): Roll => ({
                value: Number(r.result),
                rerollFrom: null
            }));

        const result = calculateFromRolls(rolls);

        await roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this }),
            flavor: `
                <strong>Gieo Thiên Mệnh</strong><br>
                DSN active: ${hasDiceSoNice() ? "yes" : "no"}
            `,
            flags: {
                "huyen-viet-vtt": {
                    cardType: "hv-roll"
                }
            }
        });
    }


    /** @override */
    prepareBaseData() {
        // Data modifications in this step occur before processing embedded
        // documents or derived data.
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

        // 3) tính abilities từ totals đã được cộng bonus
        this.computeAbilities(system, totals);

        // const actorData = this;
        // const flags = actorData.flags.huyenvietvtt || {};

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

        const thiTocItems = actor.items.filter((item) => item.type === "thiToc");

        for (const item of thiTocItems) {
            const clanId = item.system?.clanId as string | undefined;
            if (!clanId) continue;

            const clan = getThiTocById(clanId);
            if (!clan) continue;

            this.applyUpgradeRules(totals, clan.upgrade);
        }
    }

    applyUpgradeRules(totals: HvComputedTotals, rules: UpgradeRule[]): void {

        for (const rule of rules) {
            // tạm thời: nếu choose có tồn tại thì auto lấy N effect đầu tiên
            // sau này nếu có UI chọn option riêng thì thay logic chỗ này
            const selectedEffects = rule.choose
                ? rule.effects.slice(0, rule.choose)
                : rule.effects;

            console.log('+++++')
            console.log(selectedEffects)
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
        system.abilities.sucLuc.value = 5 + moc + hoa + tho;
        system.abilities.tamLuc.value = 5 + hoa + tho + kim;
        system.abilities.canhGiac.value = Math.floor((tho + kim + thuy) / 3);
        system.abilities.chuTam.value = Math.floor((hoa + tho + kim) / 3);
        system.abilities.tocDo.value = moc + hoa;
        system.abilities.nguHop.value = system.attributes.level.value + kim;

        // update skills vao lai trong system
        for (let skill of SKILL_KEYS) {
            if (!system.skills.hasOwnProperty(skill) || !(skill in totals.skills)) {
                return
            }

            system.skills[skill] = totals.skills?.[skill]
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

    async rollCheck({} = {}) {
        let diceCount = 2
        const roll = await (new Roll(`${diceCount}d10`)).evaluate();

        const diceResults: number[] = []
        const diceData: Roll[] = roll.dice[0].results.map((r) => {
            diceResults.push(r.result)
            return {
                value: r.result,
                rerollFrom: null
            }
        });

        await ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor: this}),
            content: `${diceCount}d10 <==== ${diceResults.join(",")}`,
        })

        console.log(`---You rolled the dice`)
        return calculateFromRolls(diceData)
    }
}
