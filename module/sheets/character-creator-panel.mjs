import { BOI_CANH, ELEMENTS, SKILL_LABELS, ELEMENT_CLASS } from '../helpers/config.ts';
import { setBoiCanhForActor } from '../helpers/boiCanh';

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

const STEP_IDS = [
  'boiCanh',
  'giaCanh',
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

function summarizeSelection(rows, id) {
  return rows.find(row => row.id === id) ?? null;
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
    this._draft = {
      boiCanh: actor.system.identity?.boiCanh ?? '',
    };
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

    this.element.querySelectorAll('.hv-cc-table__row[data-boi-canh-id]').forEach(row => {
      row.addEventListener('click', () => this._selectBoiCanh(row.dataset.boiCanhId));
      row.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        this._selectBoiCanh(row.dataset.boiCanhId);
      });
    });
  }

  async _prepareContext(_options) {
    const identity = this.actor.system.identity ?? {};
    const selectedBoiCanhId = this._draft.boiCanh;
    const boiCanhRows = getBoiCanhRows(selectedBoiCanhId);
    const selectedBoiCanh = summarizeSelection(boiCanhRows, selectedBoiCanhId);
    const activeStepIndex = STEP_IDS.indexOf(this._activeStep);
    const isFirstStep = activeStepIndex <= 0;
    const isLastStep = activeStepIndex === STEP_IDS.length - 1;
    const isBoiCanhStep = this._activeStep === 'boiCanh';

    return {
      actor: this.actor,
      mode: this.mode,
      activeStep: this._activeStep,
      activeStepNumber: activeStepIndex + 1,
      activeStepLabel: STEPS[activeStepIndex]?.label ?? '',
      isFirstStep,
      isLastStep,
      isBoiCanhStep,
      isPlaceholderStep: !isBoiCanhStep,
      canContinue: isBoiCanhStep ? Boolean(this._draft.boiCanh) : true,
      steps: STEPS.map((step, index) => ({
        ...step,
        number: index + 1,
        isActive: step.id === this._activeStep,
        isComplete: step.id === 'boiCanh' && Boolean(this._draft.boiCanh),
      })),
      boiCanhRows,
      selectedBoiCanh,
      summary: this._summaryContext(selectedBoiCanh),
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

  async _selectBoiCanh(boiCanhId) {
    if (!boiCanhId) return;
    this._draft.boiCanh = boiCanhId;
    this.render();
  }

  _hasUnsavedChanges() {
    return this._draft.boiCanh !== (this.actor.system.identity?.boiCanh ?? '');
  }

  async _commitDraft() {
    if (!this._hasUnsavedChanges()) return;
    if (this._draft.boiCanh) await setBoiCanhForActor(this.actor, this._draft.boiCanh);
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

  _summaryContext(selectedBoiCanh) {
    const identity = this.actor.system.identity ?? {};
    const elements = this.actor.system.elements ?? {};

    return {
      name: this.actor.name || 'Chưa đặt tên',
      img: this.actor.img,
      thiToc: identity.thiToc || 'Chưa chọn',
      monPhai: identity.monPhai || 'Chưa chọn',
      boiCanh: selectedBoiCanh?.name || 'Chưa chọn',
      featuredSkill: selectedBoiCanh?.skill?.label || 'Chưa có kỹ năng',
      elements: ['moc', 'hoa', 'tho', 'kim', 'thuy'].map(key => ({
        key,
        label: localize(ELEMENTS[key]?.label),
        value: elements[key]?.value ?? 1,
        icon: ELEMENTS[key]?.icon,
        class: ELEMENT_CLASS[key] ?? key,
      })),
    };
  }
}
