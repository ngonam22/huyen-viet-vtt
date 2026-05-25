import { BOI_CANH, GIA_CANH, MON_PHAI, THI_TOC, ELEMENTS, SKILL_LABELS, ELEMENT_CLASS } from '../helpers/config.ts';
import { setBoiCanhForActor } from '../helpers/boiCanh';
import { setGiaCanhForActor } from '../helpers/giaCanh';
import { setMonPhaiForActor } from '../helpers/monPhai';
import { setThiTocForActor } from '../helpers/thiToc';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

const STEP_IDS = [
  'boiCanh',
  'giaCanh',
  'thiToc',
  'monPhai',
  'nguHanh',
  'kyNang',
  'thuatThuc',
  'trangBi',
  'danhXung',
];

const STEPS = [
  { id: 'boiCanh', label: 'Bối Cảnh', subtitle: 'Nơi nhân vật trưởng thành' },
  { id: 'giaCanh', label: 'Gia Cảnh', subtitle: 'Thân thế và quá khứ' },
  { id: 'thiToc', label: 'Thị Tộc', subtitle: 'Dòng tộc linh giáp' },
  { id: 'monPhai', label: 'Môn Phái', subtitle: 'Con đường tu luyện' },
  { id: 'nguHanh', label: 'Ngũ Hành', subtitle: 'Phân bổ chỉ số Ngũ Hành' },
  { id: 'kyNang', label: 'Kỹ Năng', subtitle: 'Chọn kỹ năng khởi đầu' },
  { id: 'thuatThuc', label: 'Thuật Thức', subtitle: 'Chọn thuật thức khởi đầu' },
  { id: 'trangBi', label: 'Trang Bị', subtitle: 'Trang bị ban đầu' },
  { id: 'danhXung', label: 'Danh Xưng', subtitle: 'Danh xưng và hình dung' },
];


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

    const focusSkills = Object.keys(entry.progressionReqs?.[2] ?? {})
      .slice(0, 3)
      .map(key => ({ key, label: SKILL_LABELS[key] ?? key }));

    return {
      id: entry.id,
      name: localize(entry.ten),
      thumbnail: `/systems/huyen-viet-vtt/assets/character-creation/mon-phai/${kebabCase(entry.id)}.png`,
      isSelected: entry.id === selectedId,
      elements,
      focusSkills,
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
    this._activeStep = options.initialStep ?? 'boiCanh';

    const giaCanhItem = actor.items.find(i => i.type === 'giaCanh');
    const savedGcIndices = giaCanhItem?.system?.appliedUpgrades?.[0]?.selectedIndices;
    const savedElementIndex = (Array.isArray(savedGcIndices) && savedGcIndices.length > 0) ? savedGcIndices[0] : null;

    const monPhaiItem = actor.items.find(i => i.type === 'monPhai');
    const savedMpIndices = monPhaiItem?.system?.appliedUpgrades?.[0]?.selectedIndices;
    const savedMonPhaiElementIndices = Array.isArray(savedMpIndices) ? [...savedMpIndices] : [];

    this._draft = {
      boiCanh: actor.system.identity?.boiCanh ?? '',
      giaCanh: actor.system.identity?.giaCanh ?? '',
      giaCanhElementIndex: savedElementIndex,
      thiToc: actor.system.identity?.thiToc ?? '',
      monPhai: actor.system.identity?.monPhai ?? '',
      monPhaiElementIndices: savedMonPhaiElementIndices,
    };
    this._savedGiaCanhElementIndex = savedElementIndex;
    this._savedMonPhaiElementIndices = savedMonPhaiElementIndices;
    this._forceClose = false;
  }

  get title() {
    return 'KHỞI TẠO NHÂN VẬT';
  }

  static show(actor, options = {}) {
    return new this(actor, options).render(true);
  }

  async close(options = {}) {
    if (!this._forceClose && this._hasUnsavedChanges()) {
      const shouldApply = await this._confirmUnsavedChanges();
      if (shouldApply === null) return this;
      if (shouldApply) await this._commitDraft();
    }

    this._forceClose = false;
    return super.close(options);
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

    this.element.addEventListener('hv:mon-phai-select', (e) => {
      if (this._draft.monPhai !== e.detail.id) this._draft.monPhaiElementIndices = [];
      this._draft.monPhai = e.detail.id;
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

    const activeStepIndex = STEP_IDS.indexOf(this._activeStep);
    const isFirstStep = activeStepIndex <= 0;
    const isLastStep = activeStepIndex === STEP_IDS.length - 1;
    const isBoiCanhStep = this._activeStep === 'boiCanh';
    const isGiaCanhStep = this._activeStep === 'giaCanh';
    const isThiTocStep = this._activeStep === 'thiToc';
    const isMonPhaiStep = this._activeStep === 'monPhai';

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
      monPhaiRows.map(({ id, name, thumbnail, elements, focusSkills }) => [id, {
        name,
        thumbnailLarge: thumbnail.replace('.png', '-large.png'),
        elements: elements.map(({ index, key, label, value, icon, class: cls }) => ({ index, key, label, value, icon, class: cls })),
        focusSkills,
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
        monPhai: this._draft.monPhai || '',
        monPhaiElementIndices: JSON.stringify(this._draft.monPhaiElementIndices),
      },
      activeStepNumber: activeStepIndex + 1,
      activeStepLabel: STEPS[activeStepIndex]?.label ?? '',
      isFirstStep,
      isLastStep,
      isBoiCanhStep,
      isGiaCanhStep,
      isThiTocStep,
      isMonPhaiStep,
      isPlaceholderStep: !isBoiCanhStep && !isGiaCanhStep && !isThiTocStep && !isMonPhaiStep,
      canContinue: isBoiCanhStep ? Boolean(this._draft.boiCanh)
                 : isGiaCanhStep ? Boolean(this._draft.giaCanh) && this._draft.giaCanhElementIndex !== null
                 : isThiTocStep ? Boolean(this._draft.thiToc)
                 : isMonPhaiStep ? Boolean(this._draft.monPhai) && this._draft.monPhaiElementIndices.length === 2
                 : true,
      steps: STEPS.map((step, index) => ({
        ...step,
        number: index + 1,
        isActive: step.id === this._activeStep,
        isComplete: (step.id === 'boiCanh' && Boolean(this._draft.boiCanh)) ||
                    (step.id === 'giaCanh' && Boolean(this._draft.giaCanh) && this._draft.giaCanhElementIndex !== null) ||
                    (step.id === 'thiToc' && Boolean(this._draft.thiToc)) ||
                    (step.id === 'monPhai' && Boolean(this._draft.monPhai) && this._draft.monPhaiElementIndices.length === 2),
      })),
      boiCanhRows,
      selectedBoiCanh,
      giaCanhRows,
      selectedGiaCanh,
      thiTocRows,
      selectedThiToc,
      monPhaiRows,
      boiCanhMap,
      giaCanhMap,
      thiTocMap,
      monPhaiMap,
    };
  }

  async _onClickAction(event, target) {
    const action = target.dataset.action;

    if (action === 'select-step') {
      this._activeStep = target.dataset.step || 'boiCanh';
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
      if (this._activeStep === 'boiCanh' && !this._draft.boiCanh) return;
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

    return (
      this._draft.boiCanh !== (this.actor.system.identity?.boiCanh ?? '') ||
      this._draft.giaCanh !== (this.actor.system.identity?.giaCanh ?? '') ||
      this._draft.giaCanhElementIndex !== this._savedGiaCanhElementIndex ||
      this._draft.thiToc !== (this.actor.system.identity?.thiToc ?? '') ||
      this._draft.monPhai !== (this.actor.system.identity?.monPhai ?? '') ||
      mpIndicesChanged
    );
  }

  async _commitDraft() {
    if (!this._hasUnsavedChanges()) return;
    if (this._draft.boiCanh && this._draft.boiCanh !== (this.actor.system.identity?.boiCanh ?? '')) {
      await setBoiCanhForActor(this.actor, this._draft.boiCanh);
    }
    const giaCanhIdChanged = this._draft.giaCanh && this._draft.giaCanh !== (this.actor.system.identity?.giaCanh ?? '');
    const elementIndexChanged = this._draft.giaCanhElementIndex !== this._savedGiaCanhElementIndex;
    if (this._draft.giaCanh && (giaCanhIdChanged || elementIndexChanged)) {
      const idx = this._draft.giaCanhElementIndex;
      await setGiaCanhForActor(this.actor, this._draft.giaCanh, idx !== null ? { 0: [idx] } : {});
      this._savedGiaCanhElementIndex = idx;
    }

    if (this._draft.thiToc && this._draft.thiToc !== (this.actor.system.identity?.thiToc ?? '')) {
      await setThiTocForActor(this.actor, this._draft.thiToc);
    }

    const monPhaiIdChanged = this._draft.monPhai && this._draft.monPhai !== (this.actor.system.identity?.monPhai ?? '');
    const mpIndicesChanged =
      this._draft.monPhaiElementIndices.length !== this._savedMonPhaiElementIndices.length ||
      this._draft.monPhaiElementIndices.some((idx, i) => idx !== this._savedMonPhaiElementIndices[i]);
    if (this._draft.monPhai && (monPhaiIdChanged || mpIndicesChanged)) {
      const indices = this._draft.monPhaiElementIndices;
      await setMonPhaiForActor(this.actor, this._draft.monPhai, indices.length > 0 ? { 0: indices } : {});
      this._savedMonPhaiElementIndices = [...indices];
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
