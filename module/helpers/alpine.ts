import Alpine from 'alpinejs';

Alpine.data('hvCharCreator', (draft: {
  boiCanh: string;
  giaCanh: string;
  giaCanhElementIndex: number; // -1 means null/unselected
  monPhai: string;
  monPhaiElementIndices: number[];
  activeStep: string;
}) => ({
  boiCanh: draft.boiCanh || null as string | null,
  giaCanh: draft.giaCanh || null as string | null,
  giaCanhElementIndex: draft.giaCanhElementIndex !== -1 ? draft.giaCanhElementIndex : null as number | null,
  monPhai: draft.monPhai || null as string | null,
  monPhaiElementIndices: draft.monPhaiElementIndices || [] as number[],
  activeStep: draft.activeStep || 'boiCanh',

  selectBoiCanh(id: string) {
    this.boiCanh = id;
    console.log('boiCanh selected');
    console.log(id)
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
    if (this.activeStep === 'monPhai') return Boolean(this.monPhai) && this.monPhaiElementIndices.length === 2;
    return true;
  },
}));

Alpine.start();
