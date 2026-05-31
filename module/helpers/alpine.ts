import Alpine from 'alpinejs';

const UU_DIEM_TEMPLATES = [
  { id: 'dungCam', title: 'Dũng Cảm', desc: 'Không sợ hiểm nguy, sẵn sàng đứng ra bảo vệ người yếu. Trong những khoảnh khắc nguy cấp nhất, nhân vật vẫn giữ vững tinh thần và hành động mà không do dự.' },
  { id: 'trungThanh', title: 'Trung Thành', desc: 'Một lòng một dạ với người mình tin tưởng. Dù hoàn cảnh có đảo lộn, nhân vật không bao giờ phản bội những ai đã giao phó niềm tin.' },
  { id: 'khonNgoan', title: 'Khôn Ngoan', desc: 'Suy xét cẩn thận trước khi hành động. Nhân vật hiếm khi bị lừa và luôn nhìn thấy bức tranh toàn cảnh để đưa ra quyết định sáng suốt.' },
  { id: 'baoDung', title: 'Bao Dung', desc: 'Rộng lượng và sẵn sàng tha thứ. Nhân vật nhìn thấy điều tốt trong mọi người và không giữ mối thù lâu dài, dễ dàng kết nối với những tâm hồn cô đơn.' },
  { id: 'kienNhan', title: 'Kiên Nhẫn', desc: 'Không bao giờ bỏ cuộc dù gặp thất bại. Nhân vật coi mỗi vấp ngã là một bài học và tiếp tục bước tiếp với ý chí bền bỉ.' },
];

const KHUYET_DIEM_TEMPLATES = [
  { id: 'tuPhu', title: 'Tự Phụ', desc: 'Quá tự tin vào bản thân, đôi khi xem thường những lời cảnh báo. Nhân vật thường đánh giá thấp đối thủ và dễ rơi vào bẫy vì không chịu lắng nghe.' },
  { id: 'nongNay', title: 'Nóng Nảy', desc: 'Dễ mất bình tĩnh trong tình huống căng thẳng. Nhân vật thường đưa ra quyết định vội vàng và phải hối hận sau đó khi hậu quả đã rõ ràng.' },
  { id: 'daNghi', title: 'Đa Nghi', desc: 'Luôn nghi ngờ ý định của người khác dù họ chân thành. Nhân vật khó xây dựng lòng tin và đôi khi bỏ lỡ những liên minh quý giá vì sự hoài nghi thái quá.' },
  { id: 'thamVong', title: 'Tham Vọng', desc: 'Khao khát quyền lực và danh vọng đến mức đánh đổi những điều quan trọng. Nhân vật có thể đưa ra những lựa chọn đạo đức mơ hồ để đạt được mục tiêu.' },
  { id: 'coDon', title: 'Cô Độc', desc: 'Không dễ mở lòng và thường tự mình gánh chịu mọi thứ. Nhân vật từ chối sự giúp đỡ ngay cả khi thực sự cần, vì sợ trở thành gánh nặng cho người khác.' },
];

const NIEM_VUI_TEMPLATES = [
  { id: 'binhYen', title: 'Bình Yên', desc: 'Tìm thấy hạnh phúc trong những khoảnh khắc tĩnh lặng — một buổi sáng yên tĩnh, tiếng mưa rơi nhẹ, hay cảnh hoàng hôn không một bóng người. Nhân vật luôn hướng về nơi bình yên dù con đường có gian nan.' },
  { id: 'dongHanh', title: 'Đồng Hành', desc: 'Niềm vui đến từ những mối quan hệ chân thành. Khi có bạn đồng hành bên cạnh, nhân vật cảm thấy mọi gian khó đều có thể vượt qua và mọi thắng lợi đều trở nên ý nghĩa hơn.' },
  { id: 'khamPha', title: 'Khám Phá', desc: 'Thích thú khi đặt chân đến vùng đất mới, học một kỹ năng chưa từng biết, hay giải mã bí ẩn còn bỏ ngỏ. Sự tò mò là nguồn động lực lớn nhất của nhân vật.' },
  { id: 'chienThang', title: 'Chiến Thắng', desc: 'Hứng khởi tột độ khi vượt qua thử thách hoặc đánh bại đối thủ xứng tầm. Nhân vật không tìm kiếm chiến thắng dễ dàng mà khao khát những khoảnh khắc nỗ lực được đền đáp xứng đáng.' },
  { id: 'sangTao', title: 'Sáng Tạo', desc: 'Niềm vui đến khi nhân vật tạo ra thứ gì đó mới — một bài thơ, một chiến lược, một công trình hay một món ăn. Hành động sáng tạo mang lại cảm giác thỏa mãn không gì sánh được.' },
];

const NOI_SO_TEMPLATES = [
  { id: 'coDon', title: 'Cô Đơn', desc: 'Sợ bị bỏ lại một mình trong lúc khó khăn nhất. Nhân vật có thể chấp nhận những điều bất hợp lý chỉ để không phải đối mặt với sự cô độc tuyệt đối.' },
  { id: 'thatBai', title: 'Thất Bại', desc: 'Sợ không đạt được điều mình đã hứa hoặc đặt ra cho bản thân. Nỗi sợ này đôi khi đẩy nhân vật cố gắng không ngừng nhưng cũng có thể khiến họ tê liệt khi đứng trước quyết định quan trọng.' },
  { id: 'phanBoi', title: 'Phản Bội', desc: 'Sợ bị người mình tin tưởng nhất quay lưng. Dù ít nói ra, nhân vật luôn âm thầm cảnh giác và giữ lại một phần lòng tin dù có yêu quý ai đến đâu.' },
  { id: 'matKiemSoat', title: 'Mất Kiểm Soát', desc: 'Sợ khi tình huống vượt ngoài tầm tay và không còn lựa chọn nào nữa. Nhân vật luôn cố duy trì sự kiểm soát, đôi khi đến mức cứng nhắc và không cho người khác đỡ gánh.' },
  { id: 'voNghia', title: 'Vô Nghĩa', desc: 'Sợ rằng mọi nỗ lực cuối cùng đều không để lại dấu ấn gì. Nỗi sợ này thúc đẩy nhân vật liên tục tìm kiếm ý nghĩa trong từng hành động, ngay cả những việc nhỏ nhặt nhất.' },
];

const TAM_NGUYEN_TEMPLATES = [
  { id: 'baoVe', title: 'Bảo Vệ', desc: 'Mong muốn trở thành người đứng trước mọi hiểm nguy để người thân không bao giờ phải tổn thương. Tâm nguyện này là ngọn đuốc soi sáng mọi quyết định của nhân vật.' },
  { id: 'timSuThat', title: 'Tìm Sự Thật', desc: 'Khao khát vén màn bí ẩn ẩn giấu sau lịch sử, thiên cơ hay con người. Nhân vật tin rằng sự thật, dù đau đớn, luôn tốt hơn sự mù quáng.' },
  { id: 'chuocLoi', title: 'Chuộc Lỗi', desc: 'Còn đó một lỗi lầm từ quá khứ chưa được sửa chữa. Nhân vật sống với nó từng ngày và mọi hành động của họ đều là nỗ lực bù đắp điều đã mất.' },
  { id: 'deLaiDiSan', title: 'Để Lại Di Sản', desc: 'Muốn được nhớ đến sau khi ra đi — không phải vì danh vọng, mà vì đã tạo ra sự khác biệt thực sự cho những người ở lại.' },
  { id: 'tuDo', title: 'Tự Do', desc: 'Khao khát thoát khỏi xiềng xích — dù là ràng buộc của gia tộc, nghĩa vụ hay số phận. Nhân vật tin mình có quyền chọn con đường riêng, dù thế giới không đồng ý.' },
];

const NGHIA_VU_TEMPLATES = [
  { id: 'traOn', title: 'Trả Ơn', desc: 'Có một ân nhân đã cứu giúp trong lúc khó khăn nhất. Nhân vật chưa thể trả xong món nợ ân tình đó và cảm thấy có trách nhiệm đáp lại dù bằng hành động hay hy sinh.' },
  { id: 'loiThe', title: 'Lời Thề', desc: 'Từng thề thốt điều gì đó và lời hứa đó còn sống mãi trong lòng. Dù hoàn cảnh thay đổi, nhân vật không thể phá vỡ lời thề mà không đánh mất một phần bản thân.' },
  { id: 'giaĐinh', title: 'Gia Đình', desc: 'Trách nhiệm với người thân — có thể là cha mẹ già yếu, em nhỏ hay người thương đang chờ đợi. Sợi dây này vừa là sức mạnh vừa là điểm dễ bị lợi dụng nhất của nhân vật.' },
  { id: 'nhiemVu', title: 'Nhiệm Vụ', desc: 'Được giao một trọng trách cụ thể và nhân vật coi đó là bổn phận không thể từ chối. Hoàn thành nhiệm vụ này là điều kiện để nhân vật có thể sống thật sự với chính mình.' },
  { id: 'congLy', title: 'Công Lý', desc: 'Cảm thấy có nghĩa vụ bảo vệ sự công bằng khi trông thấy bất công. Nhân vật không thể ngoảnh mặt làm ngơ dù đôi khi điều đó kéo họ vào những rắc rối không ai yêu cầu.' },
];

Alpine.data('hvCharCreator', (draft: {
  boiCanh: string;
  giaCanh: string;
  giaCanhElementIndex: number; // -1 means null/unselected
  thiToc: string;
  thienTu: string;
  uuDiemTitle: string;
  uuDiemDesc: string;
  khuyetDiemTitle: string;
  khuyetDiemDesc: string;
  monPhai: string;
  monPhaiElementIndices: number[];
  activeStep: string;
  niemVuiTitle: string;
  niemVuiDesc: string;
  noiSoTitle: string;
  noiSoDesc: string;
  tamNguyenTitle: string;
  tamNguyenDesc: string;
  nghiaVuTitle: string;
  nghiaVuDesc: string;
}) => ({
  boiCanh: draft.boiCanh || null as string | null,
  giaCanh: draft.giaCanh || null as string | null,
  giaCanhElementIndex: draft.giaCanhElementIndex !== -1 ? draft.giaCanhElementIndex : null as number | null,
  thiToc: draft.thiToc || null as string | null,
  thienTu: draft.thienTu || null as string | null,
  uuDiemTitle: draft.uuDiemTitle || '' as string,
  uuDiemDesc: draft.uuDiemDesc || '' as string,
  khuyetDiemTitle: draft.khuyetDiemTitle || '' as string,
  khuyetDiemDesc: draft.khuyetDiemDesc || '' as string,
  uuDiemTemplates: UU_DIEM_TEMPLATES,
  khuyetDiemTemplates: KHUYET_DIEM_TEMPLATES,
  niemVuiTitle: draft.niemVuiTitle || '' as string,
  niemVuiDesc: draft.niemVuiDesc || '' as string,
  noiSoTitle: draft.noiSoTitle || '' as string,
  noiSoDesc: draft.noiSoDesc || '' as string,
  tamNguyenTitle: draft.tamNguyenTitle || '' as string,
  tamNguyenDesc: draft.tamNguyenDesc || '' as string,
  nghiaVuTitle: draft.nghiaVuTitle || '' as string,
  nghiaVuDesc: draft.nghiaVuDesc || '' as string,
  niemVuiTemplates: NIEM_VUI_TEMPLATES,
  noiSoTemplates: NOI_SO_TEMPLATES,
  tamNguyenTemplates: TAM_NGUYEN_TEMPLATES,
  nghiaVuTemplates: NGHIA_VU_TEMPLATES,
  monPhai: draft.monPhai || null as string | null,
  monPhaiElementIndices: draft.monPhaiElementIndices || [] as number[],
  activeStep: draft.activeStep || 'boiCanhThiToc',
  boiCanhThiTocMode: (draft.boiCanh ? 'boiCanh' : draft.thiToc ? 'thiToc' : null) as string | null,
  boiCanhMap: {} as Record<string, any>,
  giaCanhMap: {} as Record<string, any>,
  thiTocMap: {} as Record<string, any>,
  monPhaiMap: {} as Record<string, any>,
  thienTuMap: {} as Record<string, any>,

  initMaps(el: HTMLElement) {
    const m = el.querySelector('[data-cc-maps]') as HTMLElement | null;
    if (!m) return;
    try { (this as any).boiCanhMap = JSON.parse(m.dataset.boiCanh || '{}'); } catch {}
    try { (this as any).giaCanhMap = JSON.parse(m.dataset.giaCanh || '{}'); } catch {}
    try { (this as any).thiTocMap = JSON.parse(m.dataset.thiToc || '{}'); } catch {}
    try { (this as any).monPhaiMap = JSON.parse(m.dataset.monPhai || '{}'); } catch {}
    try { (this as any).thienTuMap = JSON.parse(m.dataset.thienTu || '{}'); } catch {}
    (this as any).uuDiemTitle = m.dataset.uuDiemTitle || '';
    (this as any).uuDiemDesc = m.dataset.uuDiemDesc || '';
    (this as any).khuyetDiemTitle = m.dataset.khuyetDiemTitle || '';
    (this as any).khuyetDiemDesc = m.dataset.khuyetDiemDesc || '';
    (this as any).niemVuiTitle = m.dataset.niemVuiTitle || '';
    (this as any).niemVuiDesc = m.dataset.niemVuiDesc || '';
    (this as any).noiSoTitle = m.dataset.noiSoTitle || '';
    (this as any).noiSoDesc = m.dataset.noiSoDesc || '';
    (this as any).tamNguyenTitle = m.dataset.tamNguyenTitle || '';
    (this as any).tamNguyenDesc = m.dataset.tamNguyenDesc || '';
    (this as any).nghiaVuTitle = m.dataset.nghiaVuTitle || '';
    (this as any).nghiaVuDesc = m.dataset.nghiaVuDesc || '';
  },

  get summaryEntry(): Record<string, any> | null {
    const step = this.activeStep as string;
    if (step === 'thienTu') {
      const key = this.thienTu as string | null;
      return key ? ((this as any).thienTuMap?.[key] ?? null) : null;
    }
    if (step === 'boiCanhThiToc') {
      const mode = (this as any).boiCanhThiTocMode as string | null;
      if (mode === 'boiCanh') {
        const id = this.boiCanh as string | null;
        return id ? ((this as any).boiCanhMap?.[id] ?? null) : null;
      }
      if (mode === 'thiToc') {
        const id = this.thiToc as string | null;
        return id ? ((this as any).thiTocMap?.[id] ?? null) : null;
      }
      return null;
    }
    const id = (step === 'giaCanh' ? this.giaCanh
              : step === 'monPhai' ? this.monPhai
              : null) as string | null;
    if (!id) return null;
    const map = (step === 'giaCanh' ? this.giaCanhMap
               : this.monPhaiMap) as Record<string, any>;
    return map?.[id] ?? null;
  },

  get summaryHeaderImg(): string {
    const step = this.activeStep as string;
    if (step === 'boiCanhThiToc') {
      const mode = (this as any).boiCanhThiTocMode as string | null;
      if (mode === 'thiToc') return 'systems/huyen-viet-vtt/assets/character-creation/step-3-column-header.png';
      return 'systems/huyen-viet-vtt/assets/character-creation/step-1-column-header.png';
    }
    const n: Record<string, number> = { giaCanh: 2, thienTu: 3, monPhai: 4 };
    return `systems/huyen-viet-vtt/assets/character-creation/step-${n[step] ?? 1}-column-header.png`;
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

  selectBoiCanhThiTocMode(mode: string) {
    if (mode === 'boiCanh' && this.thiToc) {
      this.thiToc = null;
      this.$dispatch('hv:thi-toc-select', { id: '' });
    }
    if (mode === 'thiToc' && this.boiCanh) {
      this.boiCanh = null;
      this.$dispatch('hv:boi-canh-select', { id: '' });
    }
    (this as any).boiCanhThiTocMode = mode;
  },

  goBackToBoiCanhThiTocChooser() {
    const mode = (this as any).boiCanhThiTocMode as string | null;
    if (mode === 'boiCanh') {
      this.boiCanh = null;
      this.$dispatch('hv:boi-canh-select', { id: '' });
    }
    if (mode === 'thiToc') {
      this.thiToc = null;
      this.$dispatch('hv:thi-toc-select', { id: '' });
    }
    (this as any).boiCanhThiTocMode = null;
  },

  selectThienTu(key: string) {
    this.thienTu = key;
    this.$dispatch('hv:thien-tu-select', { key });
  },

  selectUuDiemTemplate(id: string) {
    const tpl = UU_DIEM_TEMPLATES.find(t => t.id === id);
    if (tpl) {
      this.uuDiemTitle = tpl.title;
      this.uuDiemDesc = tpl.desc;
    }
    this.$dispatch('hv:uu-khuyet-change', { uuDiemTitle: this.uuDiemTitle, uuDiemDesc: this.uuDiemDesc });
  },

  selectKhuyetDiemTemplate(id: string) {
    const tpl = KHUYET_DIEM_TEMPLATES.find(t => t.id === id);
    if (tpl) {
      this.khuyetDiemTitle = tpl.title;
      this.khuyetDiemDesc = tpl.desc;
    }
    this.$dispatch('hv:uu-khuyet-change', { khuyetDiemTitle: this.khuyetDiemTitle, khuyetDiemDesc: this.khuyetDiemDesc });
  },

  selectNiemVuiTemplate(id: string) {
    const tpl = NIEM_VUI_TEMPLATES.find(t => t.id === id);
    if (tpl) {
      this.niemVuiTitle = tpl.title;
      this.niemVuiDesc = tpl.desc;
    }
  },

  selectNoiSoTemplate(id: string) {
    const tpl = NOI_SO_TEMPLATES.find(t => t.id === id);
    if (tpl) {
      this.noiSoTitle = tpl.title;
      this.noiSoDesc = tpl.desc;
    }
  },

  selectTamNguyenTemplate(id: string) {
    const tpl = TAM_NGUYEN_TEMPLATES.find(t => t.id === id);
    if (tpl) {
      this.tamNguyenTitle = tpl.title;
      this.tamNguyenDesc = tpl.desc;
    }
  },

  selectNghiaVuTemplate(id: string) {
    const tpl = NGHIA_VU_TEMPLATES.find(t => t.id === id);
    if (tpl) {
      this.nghiaVuTitle = tpl.title;
      this.nghiaVuDesc = tpl.desc;
    }
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
    if (this.activeStep === 'boiCanhThiToc') return Boolean(this.boiCanh) || Boolean(this.thiToc);
    if (this.activeStep === 'giaCanh') return Boolean(this.giaCanh) && this.giaCanhElementIndex !== null;
    if (this.activeStep === 'thienTu') return Boolean(this.thienTu);
    if (this.activeStep === 'monPhai') return Boolean(this.monPhai) && this.monPhaiElementIndices.length === 2;
    return true;
  },
}));

Alpine.start();
