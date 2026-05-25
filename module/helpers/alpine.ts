import Alpine from 'alpinejs';

Alpine.data('hvCharCreator', (draft: {
  boiCanh: string;
  giaCanh: string;
  giaCanhElementIndex: number; // -1 means null/unselected
  thiToc: string;
  monPhai: string;
  monPhaiElementIndices: number[];
  activeStep: string;
}) => ({
  boiCanh: draft.boiCanh || null as string | null,
  giaCanh: draft.giaCanh || null as string | null,
  giaCanhElementIndex: draft.giaCanhElementIndex !== -1 ? draft.giaCanhElementIndex : null as number | null,
  thiToc: draft.thiToc || null as string | null,
  monPhai: draft.monPhai || null as string | null,
  monPhaiElementIndices: draft.monPhaiElementIndices || [] as number[],
  activeStep: draft.activeStep || 'boiCanh',
  boiCanhMap: {} as Record<string, any>,
  giaCanhMap: {} as Record<string, any>,
  thiTocMap: {} as Record<string, any>,
  monPhaiMap: {} as Record<string, any>,

  initMaps(el: HTMLElement) {
    const m = el.querySelector('[data-cc-maps]') as HTMLElement | null;
    if (!m) return;
    try { (this as any).boiCanhMap = JSON.parse(m.dataset.boiCanh || '{}'); } catch {}
    try { (this as any).giaCanhMap = JSON.parse(m.dataset.giaCanh || '{}'); } catch {}
    try { (this as any).thiTocMap = JSON.parse(m.dataset.thiToc || '{}'); } catch {}
    try { (this as any).monPhaiMap = JSON.parse(m.dataset.monPhai || '{}'); } catch {}
  },

  get summaryEntry(): Record<string, any> | null {
    const step = this.activeStep as string;
    const id = (step === 'boiCanh' ? this.boiCanh
              : step === 'giaCanh' ? this.giaCanh
              : step === 'thiToc' ? this.thiToc
              : step === 'monPhai' ? this.monPhai
              : null) as string | null;
    if (!id) return null;
    const map = (step === 'boiCanh' ? this.boiCanhMap
               : step === 'giaCanh' ? this.giaCanhMap
               : step === 'thiToc' ? this.thiTocMap
               : this.monPhaiMap) as Record<string, any>;
    return map?.[id] ?? null;
  },

  get summaryHeaderImg(): string {
    const n: Record<string, number> = { boiCanh: 1, giaCanh: 2, thiToc: 3, monPhai: 4 };
    return `systems/huyen-viet-vtt/assets/character-creation/step-${n[this.activeStep as string] ?? 1}-column-header.png`;
  },

  selectBoiCanh(id: string) {
    this.boiCanh = id;
    this.$dispatch('hv:boi-canh-select', { id });
  },

  selectGiaCanh(id: string) {
    if (this.giaCanh !== id) this.giaCanhElementIndex = null;
    this.giaCanh = id;
    this.$dispatch('hv:gia-canh-select', { id });
  },

  selectGiaCanhElement(giaCanhId: string, index: number) {
    this.giaCanh = giaCanhId;
    this.giaCanhElementIndex = index;
    this.$dispatch('hv:gia-canh-element-select', { giaCanhId, index });
  },

  selectThiToc(id: string) {
    this.thiToc = id;
    this.$dispatch('hv:thi-toc-select', { id });
  },

  selectMonPhai(id: string) {
    if (this.monPhai !== id) this.monPhaiElementIndices = [];
    this.monPhai = id;
    this.$dispatch('hv:mon-phai-select', { id });
  },

  selectMonPhaiElement(monPhaiId: string, index: number) {
    if (this.monPhai !== monPhaiId) {
      this.monPhai = monPhaiId;
      this.monPhaiElementIndices = [];
    }
    const indices = this.monPhaiElementIndices;
    this.monPhaiElementIndices = indices.includes(index)
      ? indices.filter((i: number) => i !== index)
      : indices.length < 2 ? [...indices, index] : indices;
    this.$dispatch('hv:mon-phai-element-select', { monPhaiId, index });
  },

  get canContinue(): boolean {
    if (this.activeStep === 'boiCanh') return Boolean(this.boiCanh);
    if (this.activeStep === 'giaCanh') return Boolean(this.giaCanh) && this.giaCanhElementIndex !== null;
    if (this.activeStep === 'thiToc') return Boolean(this.thiToc);
    if (this.activeStep === 'monPhai') return Boolean(this.monPhai) && this.monPhaiElementIndices.length === 2;
    return true;
  },
}));

Alpine.start();
