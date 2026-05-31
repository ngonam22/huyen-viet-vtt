import BoilerplateActorBase from './base-actor.mjs';
import { recalculateCharacterStats } from '../helpers/upgrade.ts';

/** @typedef {import("../../types/actor-character").CharacterSchema} CharacterSchema */

const intField = (initial = 0, min = 0, max = 999) => new foundry.data.fields.NumberField({
  required: true,
  integer: true,
  initial,
  min,
  max
})

const statField = (initial = 0, min = 0, max = 999) =>
    new foundry.data.fields.SchemaField({
      base: intField(initial, min, max),
      value: intField(initial, min, max)
    });

export default class BoilerplateCharacter extends BoilerplateActorBase {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    'BOILERPLATE.Actor.Character',
  ];

  /**
   * @override
   * @returns {CharacterSchema}
   */
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.attributes = new fields.SchemaField({
      level: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 1 }),
      }),
    });

    // Iterate over ability names and create a new SchemaField for each.
    schema.abilities = new fields.SchemaField(
      Object.keys(CONFIG.BOILERPLATE.abilities).reduce((obj, ability) => {
        obj[ability] = new fields.SchemaField({
          value: new fields.NumberField({
            ...requiredInteger,
            initial: 10,
            min: 0,
          }),
        });
        return obj;
      }, {})
    );

    console.log(`GAME SCHEMA`)
    console.log(schema)
    // return schema;

    return {

      identity: new fields.SchemaField({
        giaToc: new fields.StringField({ initial: "" }),
        monPhai: new fields.StringField({ initial: "" }),
        thiToc: new fields.StringField({ initial: "" }),
        ngheNghiep: new fields.StringField({ initial: "" }),
        tinhCach: new fields.StringField({ initial: "" }),
        boiCanh: new fields.StringField({ initial: "" }),
        giaCanh: new fields.StringField({ initial: "" }),
        thienTu: new fields.StringField({ initial: "" }),
        uuDiemTitle: new fields.StringField({ initial: "" }),
        uuDiemDesc: new fields.StringField({ initial: "" }),
        khuyetDiemTitle: new fields.StringField({ initial: "" }),
        khuyetDiemDesc: new fields.StringField({ initial: "" }),
        niemVuiTitle: new fields.StringField({ initial: "" }),
        niemVuiDesc: new fields.StringField({ initial: "" }),
        noiSoTitle: new fields.StringField({ initial: "" }),
        noiSoDesc: new fields.StringField({ initial: "" }),
        tamNguyenTitle: new fields.StringField({ initial: "" }),
        tamNguyenDesc: new fields.StringField({ initial: "" }),
        nghiaVuTitle: new fields.StringField({ initial: "" }),
        nghiaVuDesc: new fields.StringField({ initial: "" }),
      }),

      elements: new fields.SchemaField({
        hoa: new fields.SchemaField({ value: intField(1, 1, 6) }),
        tho: new fields.SchemaField({ value: intField(1, 1, 6) }),
        kim: new fields.SchemaField({ value: intField(1, 1, 6) }),
        thuy: new fields.SchemaField({ value: intField(1, 1, 6) }),
        moc: new fields.SchemaField({ value: intField(1, 1, 6) })
      }),

      skills: new fields.SchemaField({
        // Hoc Dao Skills
        chinhTri: intField(0, 0, 6),
        khoaHoc: intField(0, 0, 6),
        thanHoc: intField(0, 0, 6),
        xaHoi: intField(0, 0, 6),
        yHoc: intField(0, 0, 6),

        // Nghe Dao Skills
        myThuat: intField(0, 0, 6),
        vanTu: intField(0, 0, 6),
        thoiTrang: intField(0, 0, 6),
        chienCu: intField(0, 0, 6),

        // Sinh Dao Skills
        laoDong: intField(0, 0, 6),
        thuongNghiep: intField(0, 0, 6),
        haiNghiep: intField(0, 0, 6),
        hacNghiep: intField(0, 0, 6),
        sinhTon: intField(0, 0, 6),


        // Tam Dao Skills
        lanhDao: intField(0, 0, 6),
        leDao: intField(0, 0, 6),
        bieuDien: intField(0, 0, 6),
        tamY: intField(0, 0, 6),

        // Vo Dao Skills
        theThuat: intField(0, 0, 6),
        voThuat: intField(0, 0, 6),
        binhPhap: intField(0, 0, 6),
        thienDinh: intField(0, 0, 6),

      }),

      abilities: new fields.SchemaField({
        sucLuc: new fields.SchemaField({
          base: intField(),
          value: intField()
        }),
        tamLuc: new fields.SchemaField({
          base: intField(),
          value: intField()
        }),
        canhGiac: new fields.SchemaField({
          value: intField()
        }),
        chuTam: new fields.SchemaField({
          value: intField()
        }),
        tocDo: new fields.SchemaField({
          value: intField()
        }),
        nguHop: new fields.SchemaField({
          value: intField()
        }),
        khangLuc: new fields.SchemaField({
          value: intField()
        }),
      }),

      attributes: new fields.SchemaField({
        level: new fields.SchemaField({
          value: intField(1)
        })
      }),

      currency: new fields.SchemaField({
        quan: intField(0, 0, 999999),
        tien: intField(0, 0, 999999),
        dong: intField(0, 0, 999999),
      }),

      progression: new fields.SchemaField({
        currentXp: intField(0, 0, 999999),  // spendable; decreases on upgrade
        totalXp:   intField(0, 0, 999999),  // cumulative; never decreases; drives sect auto-leveling
      }),

      // Active XP-purchased modifiers consumed by recalculateCharacterStats().
      // Item-sourced bonuses (thiToc, boiCanh, giaCanh) live on Item documents instead.
      upgrades: new fields.ArrayField(new fields.ObjectField()),

      // Append-only event log for UI timeline.
      // Each entry: { id, type, timestamp, label, field, from, to, xpCost }
      // Types: "element_upgrade" | "skill_upgrade" | "technique_learned" | "sect_upgrade" | "xp_gain" | "xp_adjust" | "identity_change"
      // See CHANGELOG_TYPES in config.ts for display labels, colors, and icons.
      changelog: new fields.ArrayField(new fields.ObjectField()),

    }
  }

  prepareDerivedData() {
    // 1. Áp dụng lịch sử nâng cấp (upgrades) lên các chỉ số cơ bản
    const derived = recalculateCharacterStats(this, this.upgrades);
    
    // Cập nhật lại elements và skills với các giá trị đã qua modifier
    // Lưu ý: Ta chỉ gán lại các giá trị này vào instance hiện tại để hiển thị, 
    // không làm thay đổi dữ liệu gốc trong database (source data)
    foundry.utils.mergeObject(this.elements, derived.elements);
    foundry.utils.mergeObject(this.skills, derived.skills);
    foundry.utils.mergeObject(this.abilities, derived.abilities);

    // Loop through ability scores, and add their modifiers to our sheet output.
    for (const key in this.abilities) {
      // Calculate the modifier using d20 rules.
      this.abilities[key].mod = Math.floor(
        (this.abilities[key].value - 10) / 2
      );
      // Handle ability label localization.
      this.abilities[key].label =
        game.i18n.localize(CONFIG.BOILERPLATE.abilities[key]) ?? key;
    }
  }

  getRollData() {
    const data = {};

    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    if (this.abilities) {
      for (let [k, v] of Object.entries(this.abilities)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    data.lvl = this.attributes.level.value;

    return data;
  }
}
