import { BOI_CANH, GIA_CANH, MON_PHAI, THI_TOC, ELEMENTS, SKILL_LABELS, ELEMENT_CLASS } from '../helpers/config.ts';
import { setBoiCanhForActor, removeBoiCanhFromActor } from '../helpers/boiCanh';
import { setGiaCanhForActor } from '../helpers/giaCanh';
import { setMonPhaiForActor } from '../helpers/monPhai';
import { setThiTocForActor, removeThiTocFromActor } from '../helpers/thiToc';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

const STEP_IDS = [
  'boiCanhThiToc',
  'giaCanh',
  'monPhai',
  'thienTu',
  'uuKhuyet',
  'niemVuiNoiSo',
  'tamNguyenNghiaVu',
  'thuatThuc',
];

const STEPS = [
  { id: 'boiCanhThiToc', label: 'Bối Cảnh / Thị Tộc', subtitle: 'Xuất thân của nhân vật' },
  { id: 'giaCanh', label: 'Gia Cảnh', subtitle: 'Thân thế và quá khứ' },
  { id: 'monPhai', label: 'Môn Phái', subtitle: 'Con đường tu luyện' },
  { id: 'thienTu', label: 'Thiên Tư', subtitle: 'Thiên bẩm ngũ hành' },
  { id: 'uuKhuyet', label: 'Tính Cách', subtitle: 'Ưu điểm & Khuyết điểm' },
  { id: 'niemVuiNoiSo', label: 'Niềm Vui & Nỗi Sợ', subtitle: 'Cảm xúc sâu thẳm' },
  { id: 'tamNguyenNghiaVu', label: 'Tâm Nguyện & Nghĩa Vụ', subtitle: 'Mục tiêu và trách nhiệm' },
  { id: 'thuatThuc', label: 'Thuật Thức', subtitle: 'Chọn thuật thức khởi đầu' },
];

const THIEN_TU_DESCRIPTIONS = {
  kim: 'Cứng rắn từ bên trong, khí chất như kim loại được tôi luyện qua muôn trận. Người mang Thiên Tư Kim Hành thiên về sức chịu đựng và ý chí kiên cường bất khuất trước mọi thử thách.',
  moc: 'Bén rễ sâu trong đất, vươn cành đón ánh sáng. Người mang Thiên Tư Mộc Hành gần gũi với sinh khí muôn loài, thấu cảm lẽ trời đất và sức mạnh của sự hồi sinh.',
  thuy: 'Chảy không ngừng, thấm qua mọi kẽ hở. Người mang Thiên Tư Thủy Hành sở hữu linh giác nhạy bén và khả năng thích nghi xuất sắc trước mọi biến cố khó lường.',
  hoa: 'Bùng cháy trong từng nhịp tim, nhiệt huyết chẳng bao giờ lụi tàn. Người mang Thiên Tư Hỏa Hành tỏa sáng nhất trong khoảnh khắc quyết định, sức mạnh bùng phát bất ngờ.',
  tho: 'Tựa núi vững, tựa đất rộng. Người mang Thiên Tư Thổ Hành là trụ cột vững chắc, sức nặng của họ chở che và giữ vững tất cả những người xung quanh.',
};


function kebabCase(value) {
  return String(value ?? '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

function localize(key) {
  return key ? game.i18n.localize(key) : '';
}

function firstEffect(upgrades, target) {
  return upgrades
    .find(rule => rule.target === target)
    ?.effects?.[0] ?? null;
}

function getBoiCanhRows(selectedId) {
  return BOI_CANH.map((entry) => {
    const elementEffect = firstEffect(entry.upgrade ?? [], 'element');
    const skillEffect = firstEffect(entry.upgrade ?? [], 'skill');
    const elementKey = elementEffect?.name;
    const skillKey = skillEffect?.name;

    return {
      id: entry.id,
      name: localize(entry.ten),
      description: localize(entry.description),
      thumbnail: `/systems/huyen-viet-vtt/assets/character-creation/boi-canh/${kebabCase(entry.id)}.png`,
      isSelected: entry.id === selectedId,
      element: elementKey ? {
        key: elementKey,
        label: localize(ELEMENTS[elementKey]?.label),
        value: elementEffect.value,
        icon: ELEMENTS[elementKey]?.icon,
        class: ELEMENT_CLASS[elementKey] ?? elementKey,
      } : null,
      skill: skillKey ? {
        key: skillKey,
        label: SKILL_LABELS[skillKey] ?? skillKey,
        value: skillEffect.value,
      } : null,
    };
  });
}

function getThiTocRows(selectedId) {
  return THI_TOC.map((entry) => {
    const elementEffect = firstEffect(entry.upgrade ?? [], 'element');
    const skillEffect = firstEffect(entry.upgrade ?? [], 'skill');
    const elementKey = elementEffect?.name;
    const skillKey = skillEffect?.name;

    return {
      id: entry.linhGiap,
      name: localize(entry.ten),
      description: localize(entry.viTri),
      thumbnail: `/systems/huyen-viet-vtt/assets/character-creation/thi-toc/${entry.linhGiap}.png`,
      isSelected: entry.linhGiap === selectedId,
      element: elementKey ? {
        key: elementKey,
        label: localize(ELEMENTS[elementKey]?.label),
        value: elementEffect.value,
        icon: ELEMENTS[elementKey]?.icon,
        class: ELEMENT_CLASS[elementKey] ?? elementKey,
      } : null,
      skill: skillKey ? {
        key: skillKey,
        label: SKILL_LABELS[skillKey] ?? skillKey,
        value: skillEffect.value,
      } : null,
    };
  });
}

function summarizeSelection(rows, id) {
  return rows.find(row => row.id === id) ?? null;
}

function getGiaCanhRows(selectedId, selectedElementIndex) {
  return GIA_CANH.map((entry) => {
    const elementRule = (entry.upgrade ?? []).find(r => r.target === 'element');
    const skillRules = (entry.upgrade ?? []).filter(r => r.target === 'skill');

    const elements = (elementRule?.effects ?? []).map((eff, index) => ({
      index,
      giaCanhId: entry.id,
      key: eff.name,
      label: localize(ELEMENTS[eff.name]?.label),
      value: eff.value,
      icon: ELEMENTS[eff.name]?.icon,
      class: ELEMENT_CLASS[eff.name] ?? eff.name,
      isChosen: entry.id === selectedId && index === selectedElementIndex,
    }));

    const skills = skillRules.flatMap(r => (r.effects ?? []).map(eff => ({
      key: eff.name,
      label: SKILL_LABELS[eff.name] ?? eff.name,
      value: eff.value,
    })));

    return {
      id: entry.id,
      name: localize(entry.ten),
      description: entry.description,
      thumbnail: `/systems/huyen-viet-vtt/assets/character-creation/gia-canh/${kebabCase(entry.id)}.png`,
      isSelected: entry.id === selectedId,
      elements,
      skills,
    };
  });
}

function getThienTuCards() {
  return Object.entries(ELEMENTS).map(([key, el]) => ({
    key,
    label: localize(el.label),
    icon: el.ringIcon,
    class: ELEMENT_CLASS[key] ?? key,
    description: THIEN_TU_DESCRIPTIONS[key] ?? '',
  }));
}

function getMonPhaiRows(selectedId, selectedElementIndices) {
  return Object.values(MON_PHAI).map((entry) => {
    const elementRule = (entry.upgrade ?? []).find(r => r.target === 'element');

    const elements = (elementRule?.effects ?? []).map((eff, index) => ({
      index,
      monPhaiId: entry.id,
      key: eff.name,
      label: localize(ELEMENTS[eff.name]?.label),
      value: eff.value,
      icon: ELEMENTS[eff.name]?.icon,
      class: ELEMENT_CLASS[eff.name] ?? eff.name,
      isChosen: entry.id === selectedId && selectedElementIndices.includes(index),
    }));

    const allSkillKeys = [...new Set(
      Object.values(entry.progressionReqs ?? {}).flatMap(lvl => Object.keys(lvl))
    )];
    const skillPool = allSkillKeys.map(key => ({ key, label: SKILL_LABELS[key] ?? key }));

    return {
      id: entry.id,
      name: localize(entry.ten),
      thumbnail: `/systems/huyen-viet-vtt/assets/mon-phai/${entry.id}.png`,
      isSelected: entry.id === selectedId,
      elements,
      skillPool,
      chooseCount: elementRule?.choose ?? 1,
    };
  });
}

export class CharacterCreatorPanel extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: 'hv-character-creator',
    tag: 'section',
    classes: ['huyen-viet-vtt', 'hv-character-creator'],
    position: {
      width: 1280,
      height: 820,
    },
    window: {
      resizable: true,
    },
  };

  static PARTS = {
    main: {
      template: 'systems/huyen-viet-vtt/templates/apps/character-creator-panel.hbs',
    },
  };

  constructor(actor, options = {}) {
    super(options);
    this.actor = actor;
    this.mode = options.mode ?? 'update';
    this._activeStep = options.initialStep ?? 'boiCanhThiToc';

    const giaCanhItem = actor.items.find(i => i.type === 'giaCanh');
    const savedGcIndices = giaCanhItem?.system?.appliedUpgrades?.[0]?.selectedIndices;
    const savedElementIndex = (Array.isArray(savedGcIndices) && savedGcIndices.length > 0) ? savedGcIndices[0] : null;

    const monPhaiItem = actor.items.find(i => i.type === 'monPhai');
    const savedMpIndices = monPhaiItem?.system?.appliedUpgrades?.[0]?.selectedIndices;
    const savedMonPhaiElementIndices = Array.isArray(savedMpIndices) ? [...savedMpIndices] : [];
    const savedMonPhaiSkillKeys = Array.isArray(actor.system.identity?.monPhaiSkillKeys) ? [...actor.system.identity.monPhaiSkillKeys] : [];

    this._draft = {
      boiCanh: actor.system.identity?.boiCanh ?? '',
      giaCanh: actor.system.identity?.giaCanh ?? '',
      giaCanhElementIndex: savedElementIndex,
      thiToc: actor.system.identity?.thiToc ?? '',
      thienTu: actor.system.identity?.thienTu ?? '',
      uuDiemTitle: actor.system.identity?.uuDiemTitle ?? '',
      uuDiemDesc: actor.system.identity?.uuDiemDesc ?? '',
      khuyetDiemTitle: actor.system.identity?.khuyetDiemTitle ?? '',
      khuyetDiemDesc: actor.system.identity?.khuyetDiemDesc ?? '',
      monPhai: actor.system.identity?.monPhai ?? '',
      monPhaiElementIndices: savedMonPhaiElementIndices,
      monPhaiSkillKeys: savedMonPhaiSkillKeys,
      niemVuiTitle: actor.system.identity?.niemVuiTitle ?? '',
      niemVuiDesc: actor.system.identity?.niemVuiDesc ?? '',
      noiSoTitle: actor.system.identity?.noiSoTitle ?? '',
      noiSoDesc: actor.system.identity?.noiSoDesc ?? '',
      tamNguyenTitle: actor.system.identity?.tamNguyenTitle ?? '',
      tamNguyenDesc: actor.system.identity?.tamNguyenDesc ?? '',
      nghiaVuTitle: actor.system.identity?.nghiaVuTitle ?? '',
      nghiaVuDesc: actor.system.identity?.nghiaVuDesc ?? '',
    };
    this._savedGiaCanhElementIndex = savedElementIndex;
    this._savedMonPhaiElementIndices = savedMonPhaiElementIndices;
    this._savedMonPhaiSkillKeys = savedMonPhaiSkillKeys;
    this._savedThienTu = actor.system.identity?.thienTu ?? '';
    this._forceClose = false;
  }

  get title() {
    return 'KHỞI TẠO NHÂN VẬT';
  }

  static show(actor, options = {}) {
    return new this(actor, options).render(true);
  }

  async close(options = {}) {
    this._syncTextStepsFromDOM();
    if (!this._forceClose && this._hasUnsavedChanges()) {
      const shouldApply = await this._confirmUnsavedChanges();
      if (shouldApply === null) return this;
      if (shouldApply) await this._commitDraft();
    }

    this._forceClose = false;
    return super.close(options);
  }

  _syncTextStepsFromDOM() {
    if (!this.element) return;
    const read = (sel) => this.element.querySelector(sel)?.value ?? null;
    for (const f of [
      'uuDiemTitle', 'uuDiemDesc', 'khuyetDiemTitle', 'khuyetDiemDesc',
      'niemVuiTitle', 'niemVuiDesc', 'noiSoTitle', 'noiSoDesc',
      'tamNguyenTitle', 'tamNguyenDesc', 'nghiaVuTitle', 'nghiaVuDesc',
    ]) {
      const val = read(`[x-model="${f}"]`);
      if (val !== null) this._draft[f] = val;
    }
  }

  async _onRender(context, options) {
    await super._onRender(context, options);

    // Replace previous listeners (this.element persists across renders; inner HTML does not)
    this._eventAbort?.abort();
    this._eventAbort = new AbortController();
    const { signal } = this._eventAbort;

    this.element.addEventListener('hv:boi-canh-select', (e) => {
      this._draft.boiCanh = e.detail.id;
    }, { signal });

    this.element.addEventListener('hv:thi-toc-select', (e) => {
      this._draft.thiToc = e.detail.id;
    }, { signal });

    this.element.addEventListener('hv:gia-canh-select', (e) => {
      if (this._draft.giaCanh !== e.detail.id) this._draft.giaCanhElementIndex = null;
      this._draft.giaCanh = e.detail.id;
    }, { signal });

    this.element.addEventListener('hv:gia-canh-element-select', (e) => {
      this._draft.giaCanh = e.detail.giaCanhId;
      this._draft.giaCanhElementIndex = e.detail.index;
    }, { signal });

    this.element.addEventListener('hv:thien-tu-select', (e) => {
      this._draft.thienTu = e.detail.key;
    }, { signal });

    this.element.addEventListener('hv:uu-khuyet-change', (e) => {
      if (e.detail.uuDiemTitle !== undefined) this._draft.uuDiemTitle = e.detail.uuDiemTitle;
      if (e.detail.uuDiemDesc !== undefined) this._draft.uuDiemDesc = e.detail.uuDiemDesc;
      if (e.detail.khuyetDiemTitle !== undefined) this._draft.khuyetDiemTitle = e.detail.khuyetDiemTitle;
      if (e.detail.khuyetDiemDesc !== undefined) this._draft.khuyetDiemDesc = e.detail.khuyetDiemDesc;
    }, { signal });

    this.element.addEventListener('hv:mon-phai-select', (e) => {
      if (this._draft.monPhai !== e.detail.id) {
        this._draft.monPhaiElementIndices = [];
        this._draft.monPhaiSkillKeys = [];
      }
      this._draft.monPhai = e.detail.id;
    }, { signal });

    this.element.addEventListener('hv:mon-phai-indices-set', (e) => {
      const { monPhaiId, indices } = e.detail;
      if (monPhaiId) {
        this._draft.monPhai = monPhaiId;
        this._draft.monPhaiElementIndices = [...indices];
      }
    }, { signal });

    this.element.addEventListener('hv:mon-phai-skills-set', (e) => {
      const { monPhaiId, skillKeys } = e.detail;
      if (monPhaiId) {
        this._draft.monPhai = monPhaiId;
        this._draft.monPhaiSkillKeys = [...skillKeys];
      }
    }, { signal });

    this.element.addEventListener('hv:mon-phai-element-select', (e) => {
      const { monPhaiId, index } = e.detail;
      if (this._draft.monPhai !== monPhaiId) {
        this._draft.monPhai = monPhaiId;
        this._draft.monPhaiElementIndices = [];
      }
      const indices = this._draft.monPhaiElementIndices;
      this._draft.monPhaiElementIndices = indices.includes(index)
        ? indices.filter(i => i !== index)
        : indices.length < 2 ? [...indices, index] : indices;
    }, { signal });
  }

  async _prepareContext(_options) {
    const selectedBoiCanhId = this._draft.boiCanh;
    const boiCanhRows = getBoiCanhRows(selectedBoiCanhId);
    const selectedBoiCanh = summarizeSelection(boiCanhRows, selectedBoiCanhId);

    const selectedGiaCanhId = this._draft.giaCanh;
    const giaCanhRows = getGiaCanhRows(selectedGiaCanhId, this._draft.giaCanhElementIndex);
    const selectedGiaCanh = summarizeSelection(giaCanhRows, selectedGiaCanhId);

    const selectedThiTocId = this._draft.thiToc;
    const thiTocRows = getThiTocRows(selectedThiTocId);
    const selectedThiToc = summarizeSelection(thiTocRows, selectedThiTocId);

    const monPhaiRows = getMonPhaiRows(this._draft.monPhai, this._draft.monPhaiElementIndices);

    const thienTuCards = getThienTuCards();
    const thienTuRow1 = thienTuCards.slice(0, 3);
    const thienTuRow2 = thienTuCards.slice(3);

    const thienTuMap = JSON.stringify(Object.fromEntries(
      thienTuCards.map(({ key, label, icon, class: cls, description }) => [key, { label, icon, class: cls, description }])
    ));

    const activeStepIndex = STEP_IDS.indexOf(this._activeStep);
    const isFirstStep = activeStepIndex <= 0;
    const isLastStep = activeStepIndex === STEP_IDS.length - 1;
    const isBoiCanhThiTocStep = this._activeStep === 'boiCanhThiToc';
    const isGiaCanhStep = this._activeStep === 'giaCanh';
    const isMonPhaiStep = this._activeStep === 'monPhai';
    const isThienTuStep = this._activeStep === 'thienTu';
    const isUuKhuyetStep = this._activeStep === 'uuKhuyet';
    const isNiemVuiNoiSoStep = this._activeStep === 'niemVuiNoiSo';
    const isTamNguyenNghiaVuStep = this._activeStep === 'tamNguyenNghiaVu';

    const boiCanhMap = JSON.stringify(Object.fromEntries(
      boiCanhRows.map(({ id, name, thumbnail, description, element, skill }) => [id, {
        name,
        thumbnailLarge: thumbnail.replace('.png', '-large.png'),
        description,
        element,
        skill,
      }])
    ));

    const giaCanhMap = JSON.stringify(Object.fromEntries(
      giaCanhRows.map(({ id, name, thumbnail, description, elements, skills }) => [id, {
        name,
        thumbnailLarge: thumbnail.replace('.png', '-large.png'),
        description,
        elements: elements.map(({ index, key, label, value, icon, class: cls }) => ({ index, key, label, value, icon, class: cls })),
        skills,
      }])
    ));

    const thiTocMap = JSON.stringify(Object.fromEntries(
      thiTocRows.map(({ id, name, thumbnail, description, element, skill }) => [id, {
        name,
        thumbnailLarge: thumbnail.replace('.png', '-large.png'),
        description,
        element,
        skill,
      }])
    ));

    const monPhaiMap = JSON.stringify(Object.fromEntries(
      monPhaiRows.map(({ id, name, thumbnail, elements, skillPool }) => [id, {
        name,
        thumbnailLarge: thumbnail,
        description: '',
        elements: elements.map(({ index, key, label, value, icon, class: cls }) => ({ index, key, label, value, icon, class: cls })),
        skillPool,
      }])
    ));

    return {
      actor: this.actor,
      mode: this.mode,
      activeStep: this._activeStep,
      draft: {
        boiCanh: this._draft.boiCanh || '',
        giaCanh: this._draft.giaCanh || '',
        giaCanhElementIndex: this._draft.giaCanhElementIndex !== null ? this._draft.giaCanhElementIndex : -1,
        thiToc: this._draft.thiToc || '',
        thienTu: this._draft.thienTu || '',
        uuDiemTitle: this._draft.uuDiemTitle || '',
        uuDiemDesc: this._draft.uuDiemDesc || '',
        khuyetDiemTitle: this._draft.khuyetDiemTitle || '',
        khuyetDiemDesc: this._draft.khuyetDiemDesc || '',
        monPhai: this._draft.monPhai || '',
        monPhaiElementIndices: JSON.stringify(this._draft.monPhaiElementIndices),
        monPhaiSkillKeys: JSON.stringify(this._draft.monPhaiSkillKeys || []),
        niemVuiTitle: this._draft.niemVuiTitle || '',
        niemVuiDesc: this._draft.niemVuiDesc || '',
        noiSoTitle: this._draft.noiSoTitle || '',
        noiSoDesc: this._draft.noiSoDesc || '',
        tamNguyenTitle: this._draft.tamNguyenTitle || '',
        tamNguyenDesc: this._draft.tamNguyenDesc || '',
        nghiaVuTitle: this._draft.nghiaVuTitle || '',
        nghiaVuDesc: this._draft.nghiaVuDesc || '',
      },
      activeStepNumber: activeStepIndex + 1,
      activeStepLabel: STEPS[activeStepIndex]?.label ?? '',
      isFirstStep,
      isLastStep,
      isBoiCanhThiTocStep,
      isGiaCanhStep,
      isThienTuStep,
      isUuKhuyetStep,
      isMonPhaiStep,
      isNiemVuiNoiSoStep,
      isTamNguyenNghiaVuStep,
      isPlaceholderStep: !isBoiCanhThiTocStep && !isGiaCanhStep && !isMonPhaiStep && !isThienTuStep && !isUuKhuyetStep && !isNiemVuiNoiSoStep && !isTamNguyenNghiaVuStep,
      canContinue: isBoiCanhThiTocStep ? Boolean(this._draft.boiCanh) || Boolean(this._draft.thiToc)
                 : isGiaCanhStep ? Boolean(this._draft.giaCanh) && this._draft.giaCanhElementIndex !== null
                 : isThienTuStep ? Boolean(this._draft.thienTu)
                 : isMonPhaiStep ? Boolean(this._draft.monPhai) && this._draft.monPhaiElementIndices.length === 2
                 : true,
      steps: STEPS.map((step, index) => ({
        ...step,
        number: index + 1,
        isActive: step.id === this._activeStep,
        isComplete: (step.id === 'boiCanhThiToc' && (Boolean(this._draft.boiCanh) || Boolean(this._draft.thiToc))) ||
                    (step.id === 'giaCanh' && Boolean(this._draft.giaCanh) && this._draft.giaCanhElementIndex !== null) ||
                    (step.id === 'thienTu' && Boolean(this._draft.thienTu)) ||
                    (step.id === 'uuKhuyet' && (Boolean(this._draft.uuDiemTitle) || Boolean(this._draft.khuyetDiemTitle))) ||
                    (step.id === 'monPhai' && Boolean(this._draft.monPhai) && this._draft.monPhaiElementIndices.length === 2),
      })),
      boiCanhRows,
      selectedBoiCanh,
      giaCanhRows,
      selectedGiaCanh,
      thiTocRows,
      selectedThiToc,
      monPhaiRows,
      thienTuRow1,
      thienTuRow2,
      boiCanhMap,
      giaCanhMap,
      thiTocMap,
      monPhaiMap,
      thienTuMap,
    };
  }

  async _onClickAction(event, target) {
    const action = target.dataset.action;

    if (action === 'select-step') {
      this._activeStep = target.dataset.step || 'boiCanhThiToc';
      this.render();
      return;
    }

    if (action === 'creator-prev') {
      await this._commitDraft();
      const index = Math.max(0, STEP_IDS.indexOf(this._activeStep) - 1);
      this._activeStep = STEP_IDS[index];
      this.render();
      return;
    }

    if (action === 'creator-next') {
      if (this._activeStep === 'boiCanhThiToc' && !this._draft.boiCanh && !this._draft.thiToc) return;
      await this._commitDraft();

      if (this._activeStep === STEP_IDS[STEP_IDS.length - 1]) {
        this._forceClose = true;
        await this.close();
        const sheet = this.actor.sheet;
        if (sheet?.rendered) sheet.bringToTop?.();
        else sheet?.render?.(true);
        return;
      }

      const index = Math.min(STEP_IDS.length - 1, STEP_IDS.indexOf(this._activeStep) + 1);
      this._activeStep = STEP_IDS[index];
      this.render();
      return;
    }
  }

  _hasUnsavedChanges() {
    const mpIndicesChanged =
      this._draft.monPhaiElementIndices.length !== this._savedMonPhaiElementIndices.length ||
      this._draft.monPhaiElementIndices.some((idx, i) => idx !== this._savedMonPhaiElementIndices[i]);

    const mpSkillKeysChanged =
      this._draft.monPhaiSkillKeys.length !== this._savedMonPhaiSkillKeys.length ||
      this._draft.monPhaiSkillKeys.some((key, i) => key !== this._savedMonPhaiSkillKeys[i]);

    return (
      this._draft.boiCanh !== (this.actor.system.identity?.boiCanh ?? '') ||
      this._draft.giaCanh !== (this.actor.system.identity?.giaCanh ?? '') ||
      this._draft.giaCanhElementIndex !== this._savedGiaCanhElementIndex ||
      this._draft.thiToc !== (this.actor.system.identity?.thiToc ?? '') ||
      this._draft.thienTu !== this._savedThienTu ||
      this._draft.uuDiemTitle !== (this.actor.system.identity?.uuDiemTitle ?? '') ||
      this._draft.uuDiemDesc !== (this.actor.system.identity?.uuDiemDesc ?? '') ||
      this._draft.khuyetDiemTitle !== (this.actor.system.identity?.khuyetDiemTitle ?? '') ||
      this._draft.khuyetDiemDesc !== (this.actor.system.identity?.khuyetDiemDesc ?? '') ||
      this._draft.monPhai !== (this.actor.system.identity?.monPhai ?? '') ||
      mpIndicesChanged ||
      mpSkillKeysChanged ||
      this._draft.niemVuiTitle !== (this.actor.system.identity?.niemVuiTitle ?? '') ||
      this._draft.niemVuiDesc !== (this.actor.system.identity?.niemVuiDesc ?? '') ||
      this._draft.noiSoTitle !== (this.actor.system.identity?.noiSoTitle ?? '') ||
      this._draft.noiSoDesc !== (this.actor.system.identity?.noiSoDesc ?? '') ||
      this._draft.tamNguyenTitle !== (this.actor.system.identity?.tamNguyenTitle ?? '') ||
      this._draft.tamNguyenDesc !== (this.actor.system.identity?.tamNguyenDesc ?? '') ||
      this._draft.nghiaVuTitle !== (this.actor.system.identity?.nghiaVuTitle ?? '') ||
      this._draft.nghiaVuDesc !== (this.actor.system.identity?.nghiaVuDesc ?? '')
    );
  }

  async _commitDraft() {
    this._syncTextStepsFromDOM();
    if (!this._hasUnsavedChanges()) return;
    if (this._draft.boiCanh && this._draft.boiCanh !== (this.actor.system.identity?.boiCanh ?? '')) {
      if (this.actor.system.identity?.thiToc) await removeThiTocFromActor(this.actor);
      await setBoiCanhForActor(this.actor, this._draft.boiCanh);
    }

    if (this._draft.thiToc && this._draft.thiToc !== (this.actor.system.identity?.thiToc ?? '')) {
      if (this.actor.system.identity?.boiCanh) await removeBoiCanhFromActor(this.actor);
      await setThiTocForActor(this.actor, this._draft.thiToc);
    }

    const giaCanhIdChanged = this._draft.giaCanh && this._draft.giaCanh !== (this.actor.system.identity?.giaCanh ?? '');
    const elementIndexChanged = this._draft.giaCanhElementIndex !== this._savedGiaCanhElementIndex;
    if (this._draft.giaCanh && (giaCanhIdChanged || elementIndexChanged)) {
      const idx = this._draft.giaCanhElementIndex;
      await setGiaCanhForActor(this.actor, this._draft.giaCanh, idx !== null ? { 0: [idx] } : {});
      this._savedGiaCanhElementIndex = idx;
    }

    if (this._draft.thienTu && this._draft.thienTu !== this._savedThienTu) {
      await this.actor.update({ 'system.identity.thienTu': this._draft.thienTu });
      this._savedThienTu = this._draft.thienTu;
    }

    const uuKhuyetChanged =
      this._draft.uuDiemTitle !== (this.actor.system.identity?.uuDiemTitle ?? '') ||
      this._draft.uuDiemDesc !== (this.actor.system.identity?.uuDiemDesc ?? '') ||
      this._draft.khuyetDiemTitle !== (this.actor.system.identity?.khuyetDiemTitle ?? '') ||
      this._draft.khuyetDiemDesc !== (this.actor.system.identity?.khuyetDiemDesc ?? '');
    if (uuKhuyetChanged) {
      await this.actor.update({
        'system.identity.uuDiemTitle': this._draft.uuDiemTitle,
        'system.identity.uuDiemDesc': this._draft.uuDiemDesc,
        'system.identity.khuyetDiemTitle': this._draft.khuyetDiemTitle,
        'system.identity.khuyetDiemDesc': this._draft.khuyetDiemDesc,
      });
    }

    const monPhaiIdChanged = this._draft.monPhai && this._draft.monPhai !== (this.actor.system.identity?.monPhai ?? '');
    const mpIndicesChanged =
      this._draft.monPhaiElementIndices.length !== this._savedMonPhaiElementIndices.length ||
      this._draft.monPhaiElementIndices.some((idx, i) => idx !== this._savedMonPhaiElementIndices[i]);
    const mpSkillKeysChanged =
      this._draft.monPhaiSkillKeys.length !== this._savedMonPhaiSkillKeys.length ||
      this._draft.monPhaiSkillKeys.some((key, i) => key !== this._savedMonPhaiSkillKeys[i]);
    if (this._draft.monPhai && (monPhaiIdChanged || mpIndicesChanged)) {
      const indices = this._draft.monPhaiElementIndices;
      await setMonPhaiForActor(this.actor, this._draft.monPhai, indices.length > 0 ? { 0: indices } : {});
      this._savedMonPhaiElementIndices = [...indices];
    }
    if (this._draft.monPhai && (monPhaiIdChanged || mpSkillKeysChanged)) {
      await this.actor.update({ 'system.identity.monPhaiSkillKeys': this._draft.monPhaiSkillKeys });
      this._savedMonPhaiSkillKeys = [...this._draft.monPhaiSkillKeys];
    }

    const niemVuiNoiSoChanged =
      this._draft.niemVuiTitle !== (this.actor.system.identity?.niemVuiTitle ?? '') ||
      this._draft.niemVuiDesc !== (this.actor.system.identity?.niemVuiDesc ?? '') ||
      this._draft.noiSoTitle !== (this.actor.system.identity?.noiSoTitle ?? '') ||
      this._draft.noiSoDesc !== (this.actor.system.identity?.noiSoDesc ?? '');
    if (niemVuiNoiSoChanged) {
      await this.actor.update({
        'system.identity.niemVuiTitle': this._draft.niemVuiTitle,
        'system.identity.niemVuiDesc': this._draft.niemVuiDesc,
        'system.identity.noiSoTitle': this._draft.noiSoTitle,
        'system.identity.noiSoDesc': this._draft.noiSoDesc,
      });
    }

    const tamNguyenNghiaVuChanged =
      this._draft.tamNguyenTitle !== (this.actor.system.identity?.tamNguyenTitle ?? '') ||
      this._draft.tamNguyenDesc !== (this.actor.system.identity?.tamNguyenDesc ?? '') ||
      this._draft.nghiaVuTitle !== (this.actor.system.identity?.nghiaVuTitle ?? '') ||
      this._draft.nghiaVuDesc !== (this.actor.system.identity?.nghiaVuDesc ?? '');
    if (tamNguyenNghiaVuChanged) {
      await this.actor.update({
        'system.identity.tamNguyenTitle': this._draft.tamNguyenTitle,
        'system.identity.tamNguyenDesc': this._draft.tamNguyenDesc,
        'system.identity.nghiaVuTitle': this._draft.nghiaVuTitle,
        'system.identity.nghiaVuDesc': this._draft.nghiaVuDesc,
      });
    }
  }

  async _confirmUnsavedChanges() {
    return new Promise((resolve) => {
      new Dialog({
        title: 'Lưu thay đổi?',
        content: `
          <p>Bạn có thay đổi chưa được lưu trong bảng khởi tạo nhân vật.</p>
          <p>Bạn muốn áp dụng thay đổi hay bỏ qua?</p>
        `,
        buttons: {
          apply: {
            icon: '<i class="fas fa-check"></i>',
            label: 'Áp dụng',
            callback: () => resolve(true),
          },
          discard: {
            icon: '<i class="fas fa-xmark"></i>',
            label: 'Bỏ qua',
            callback: () => resolve(false),
          },
        },
        close: () => resolve(null),
        default: 'apply',
      }).render(true);
    });
  }

}
