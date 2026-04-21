# SPEC_THUAT_THUC: HỆ THỐNG THUẬT THỨC (Techniques & Spells)

## 1. TỔNG QUAN (Overview)

**Thuật Thức** là tên gọi chung của các chiêu thức, phép thuật, nghi lễ và kỹ thuật đặc biệt mà nhân vật có được thông qua quá trình học tập và huấn luyện. Trong hệ thống của game, Thuật Thức là một subsystem độc lập, tách rời khỏi các thuộc tính thụ động của trang bị (Vũ Khí, Giáp Trụ, Trang Bị).

### 1.1. Triết lý thiết kế (DM-driven)
Engine **KHÔNG tự động giải quyết hiệu ứng** của Thuật Thức (không tự trừ sát thương, không tự áp trạng thái). Thay vào đó, engine:
- Lưu trữ metadata (tên, phân hệ, tính trạng, mô tả hiệu quả) dưới dạng đọc-được.
- Theo dõi mechanical state: số lần còn lại (`usesRemaining`) theo tần số sử dụng.
- Cung cấp chat card để DM đọc nguyên văn luật và narrate hiệu ứng trong bàn chơi.

Điều này giữ linh hoạt cho DM tùy biến narrative mà không bị engine gò bó, đồng thời vẫn hỗ trợ mechanical bookkeeping (usage counters, reset, prerequisites).

### 1.2. Phạm vi spec này
Spec này định nghĩa **toàn bộ** data model, mechanical behavior, acquisition flow, và UI contract của Thuật Thức. Spec áp dụng cho tất cả cấp bậc (1–6), nhưng implementation đầu tiên sẽ chỉ seed Level-1 sample (§11).

---

## 2. PHÂN HỆ (Categories)

Thuật Thức được chia thành 7 phân hệ đỉnh. Mỗi Thuật Thức thuộc đúng 1 phân hệ.

| Key | Tên | Mô tả | Sub-categories |
|---|---|---|---|
| `voKy` | Võ Kỹ | Chiêu thức võ thuật dùng vũ khí/cơ thể | `toanDung`, `canChien`, `xaChien`, `thanPhap` |
| `tamThuat` | Tâm Thuật (Chủ Thuật) | Kỹ năng xã hội, ngôn ngữ, tâm lý | — |
| `linhThuat` | Linh Thuật | Niệm linh ngữ giao tiếp Khí Linh (yêu cầu Linh Căn) | — |
| `nghiThuc` | Nghi Thức | Điển lễ tôn giáo, hiệu quả đơn giản nhưng cast time dài | — |
| `khiThuat` | Khí Thuật | Công pháp nội khí, có hai phần: Tĩnh thuật (Nội Lưu) + Động thuật (Ngoại Phá) | — |
| `maThuat` | Ma Thuật | Tà thuật Ma tộc; element affinity Ma-hóa | — |
| `amKy` | Ám Kỹ | Chiêu thuật sát thủ ngầm; phần lớn Kim-hành | — |

**Sub-categories của Võ Kỹ:**
- `toanDung` — Toàn Dụng: không giới hạn vũ khí, phổ thông nhất.
- `canChien` — Cận Chiến: dùng vũ khí cận chiến + cơ thể, phạm vi cận chiến.
- `xaChien` — Xạ Chiến: vũ khí tầm xa, phạm vi xa.
- `thanPhap` — Thân Pháp: kỹ thuật di chuyển, né tránh, thay đổi vị thế.

---

## 3. TÍNH TRẠNG (Traits)

Mỗi Thuật Thức có 0+ tính trạng (trait tags) mô tả cách kích hoạt và thuộc tính. Trait keys:

### 3.1. Trait Hành Động
- `hanhDong` — Hành Động: tiêu hao 1 Action của nhân vật trong lượt.
  - Sub-tags (luôn đi kèm `hanhDong`):
    - `congKich` — Công Kích: gây tổn hại lên thực thể khác.
    - `muuKe` — Mưu Kế: tạo hiệu quả bất lợi lên thực thể khác.
    - `hoTro` — Hỗ Trợ: tạo hiệu quả tốt cho bản thân/đồng minh.
    - `diChuyen` — Di Chuyển: thay đổi vị trí/vị thế.
    - `dinhKy` — Đình Kỳ: action trong cảnh bình thường (non-combat), cast time dài.

### 3.2. Trait Timing
- `chiThanh` — Chí Thành: tiêu hao điểm chí thành từ bài xét để kích hoạt.
- `phanUng` — Phản Ứng: kích hoạt ngay lập tức khi thỏa điều kiện (không tốn Action).

### 3.3. Trait Hành (Element)
- `hoaHanh`, `thoHanh`, `kimHanh`, `thuyHanh`, `mocHanh` — yêu cầu dùng Hành tương ứng làm hành phương.
- `nguHanh` — Ngũ Hành: dùng bất kỳ Hành nào.
- `tieuHanh` — Tiểu Hành: hành có cấp bậc thấp nhất.
- `daiHanh` — Đại Hành: hành có cấp bậc cao nhất.

### 3.4. Trait Resource
- `nguHop` — Ngũ Hợp: tiêu hao điểm Ngũ Hợp để kích hoạt.

### 3.5. Trait thuộc tính siêu nhiên
- `hoaTinh`, `thoTinh`, `kimTinh`, `thuyTinh`, `mocTinh` — Sát thương / hiệu ứng mang tính chất siêu nhiên Hành đó.
- `hoaKhi` — Hóa Khí: biểu hiện dưới dạng khí (Linh Thuật).
- `hoaThe` — Hóa Thể: biểu hiện dưới dạng vật thể (Linh Thuật).
- `nguyenChu` — Nguyền Chú: ma thuật nguyền rủa.
- `maThuat` — tag Ma Thuật.

### 3.6. Trait Catch-all
- `dacBiet` — Đặc Biệt: cách kích hoạt tùy mô tả riêng.

*Note:* danh sách trait là open-ended. Khi transcribe full catalog nếu gặp tính trạng mới, thêm vào enum `THUAT_THUC_TRAITS` trong `config.ts` và localization keys.

---

## 4. CẤP BẬC & HÀNH AFFINITY (Level & Element)

### 4.1. Level
Integer 1–6. Cấp bậc Thuật Thức quyết định:
- Yêu cầu Hành/Kỹ năng prerequisite (thường ngang cấp, xem §7).
- Vai trò gating cho cấp bậc Môn Phái (theo `spec_sects_and_factions.md`).
- (Không ảnh hưởng XP cost — xem §8.3.)

### 4.2. Element affinity
Optional: `hoa` / `tho` / `kim` / `thuy` / `moc` / `null`.

**Ma Thuật:** Element affinity vẫn là một trong 5 Hành nhưng được đánh dấu là "Ma-hóa". Spec này ghi nhận bằng flag phụ `maHoa: boolean` trên catalog entry; giá trị `element` vẫn dùng key Ngũ Hành thường.

---

## 5. TECHNIQUE INFO BLOCK (Per Catalog Entry)

Đây là shape cố định của mỗi entry trong catalog `THUAT_THUC`:

```ts
export interface ThuatThuc {
  id: string;                          // stable key, camelCase, e.g. "hoaKhiThuc"
  name: string;                        // i18n key → BOILERPLATE.ThuatThuc.<id>.name
  category: ThuatThucCategory;         // §2
  subcategory?: VoKySubcategory;       // §2 (chỉ cho Võ Kỹ)
  level: 1 | 2 | 3 | 4 | 5 | 6;
  element?: HvElementKey;              // §4.2
  maHoa?: boolean;                     // Ma-hóa flag (Ma Thuật)
  traits: TraitKey[];                  // §3

  // Display text — all i18n keys
  condition?: string;                  // Điều kiện kích hoạt
  skillCheck?: string;                 // Kiểm tra kỹ năng (ví dụ: "Võ Thuật (Hỏa hành)")
  difficulty?: string;                 // Độ Khó (ví dụ: "2", "Cảnh Giác của đối tượng")
  range?: string;                      // Phạm vi
  duration?: string;                   // Thời hạn
  cost?: string;                       // Tiêu hao (ví dụ: "1 điểm Ngũ Hợp")
  primaryEffect?: string;              // Hiệu quả chính (HTML allowed)
  sincerityEffects?: SincerityEffect[];

  // Mechanical
  usage: UsageSpec;                    // §6
  prerequisites?: Prerequisites;       // §7
  xpCost: number;                      // default 3 (progression §3.3)

  // Narrative
  description?: string;                // i18n key, flavor text
}

export interface SincerityEffect {
  cost: string;          // "1+", "2", "3 Hỏa", etc.
  element?: HvElementKey;  // element tied to the cost (optional)
  text: string;          // i18n key
}

export interface UsageSpec {
  frequency: UsageFrequency;
  maxUses: number;       // ≥ 1, default 1
}

export interface Prerequisites {
  elements?: Partial<Record<HvElementKey, number>>;
  skills?: Partial<Record<HvSkillKey, number>>;
}
```

---

## 6. TẦN SỐ SỬ DỤNG (Usage Frequency) — MECHANICAL

Đây là phần duy nhất của Thuật Thức mà engine tự động tracking. Mỗi Thuật Thức **item instance** trên actor giữ state riêng; catalog entry chỉ quy định `frequency` và `maxUses`.

### 6.1. Enum `UsageFrequency`

| Key | Vietnamese | Reset Trigger |
|---|---|---|
| `unlimited` | (không có Tần Số) | Never — counter ẩn khỏi UI |
| `perTurn` | Một lần mỗi lượt | Bắt đầu lượt của nhân vật (hook `combatTurn`) |
| `perRound` | Một lần mỗi vòng đấu | Bắt đầu vòng đấu (hook `combatRound`) |
| `perScene` | Một lần mỗi cảnh | Nút "Rest: Scene" trên sheet |
| `perSession` | Một lần mỗi buổi chơi | Nút "Rest: Session" trên sheet |
| `perDay` | Một lần mỗi ngày (in-game) | Nút "Rest: Long" |
| `perWeek` | Một lần mỗi tuần (in-game) | Nút "Rest: Long" |
| `perCampaign` | Một lần mỗi cuộc chơi | Manual per-item reset |
| `perOpportunity` | Contextual (ví dụ: mỗi cơ hội mua sắm) | Manual per-item reset |

### 6.2. Per-Item State (`system` on `thuatThuc` item)

```ts
{
  techniqueId: string;          // ref vào THUAT_THUC catalog
  source: 'clan' | 'xp' | 'manual';
  usesRemaining: number;        // giảm khi dùng, reset theo trigger
  lastResetAt: number | null;   // timestamp (ms) của reset gần nhất, cho audit
  notes: string;                // HTML — per-character DM notes
}
```

Khi item được create, `usesRemaining` được set bằng `usage.maxUses` của catalog entry. Khi catalog thay đổi `maxUses`, các item đã tồn tại không tự cập nhật — phải reset thủ công.

### 6.3. Reset Behavior
- **`perTurn`**: Foundry hook `combatTurn` (khi active combatant thay đổi) → reset `perTurn` cho các Thuật Thức trên actor vừa vào lượt.
- **`perRound`**: Foundry hook `combatRound` (khi round tăng) → reset tất cả `perRound` trên tất cả combatants.
- **`perScene`**: nút "Rest: Scene" cũng reset `perTurn` + `perRound` (scene kết thúc nghĩa là combat kết thúc).
- **`perSession`**: nút "Rest: Session" reset `perScene` + `perTurn` + `perRound`.
- **`perDay`, `perWeek`**: nút "Rest: Long" reset `perDay`, `perWeek`, `perSession`, `perScene`, `perTurn`, `perRound`.
- **`perCampaign`, `perOpportunity`**: không reset theo nút chung — mỗi item có nút "Manual Reset" riêng khi DM quyết định.
- **`unlimited`**: không có counter.

### 6.4. Use Flow
1. Player click "Use" trên row Thuật Thức.
2. Engine check `usesRemaining > 0` (hoặc `frequency === 'unlimited'`).
3. Nếu OK: decrement `usesRemaining`, render chat card (§9.3).
4. Nếu hết: Use button disabled + tooltip "Đã dùng hết. Chờ reset: <frequency>".

---

## 7. PREREQUISITES

### 7.1. Shape
```ts
prerequisites?: {
  elements?: Partial<Record<HvElementKey, number>>;   // { hoa: 2 } = cần Hỏa ≥ 2
  skills?: Partial<Record<HvSkillKey, number>>;        // { voThuat: 1 } = cần Võ Thuật ≥ 1
}
```

### 7.2. Enforcement
- **Clan auto-grant (§8.1):** không kiểm tra prerequisite. Clan grant bỏ qua.
- **Manual add (§8.2):** không chặn; nhưng UI hiển thị warning "⚠ Không đủ yêu cầu" nếu actor chưa đạt.
- **XP purchase (§8.3, deferred):** **HARD CHECK** — không cho mua nếu thiếu.

### 7.3. Level-1 prerequisite convention
Phần lớn Thuật Thức Cấp-1 có element affinity yêu cầu Hành tương ứng ≥ 1 (mặc định ai cũng có ≥ 1). Thuật Thức không có element affinity thường không có prerequisite.

---

## 8. ACQUISITION FLOW

Cả 3 path đều tạo ra item type `thuatThuc` trên actor, phân biệt bằng field `source`.

### 8.1. Clan Auto-Grant (semi-auto, level 1)
- `config.ts` → mỗi `ThiToc` entry có thêm field `starterTechniques?: string[]` (array of technique IDs).
- Khi player chọn Thị Tộc, `setThiTocForActor(actor, clanId)` được gọi. Sau khi tạo item `thiToc`, nó gọi thêm `grantClanStarterTechniques(actor, clanId)`:
  1. Đọc `starterTechniques` của clan.
  2. Với mỗi technique ID, gọi `learnThuatThuc(actor, id, 'clan')`.
- Khi player đổi hoặc xóa Thị Tộc, `removeThiTocFromActor(actor)` xóa các item `thuatThuc` có `source === 'clan'` (không động đến `manual` / `xp`).

**Note về rulebook wording:** sách ghi "3 Thuật Thức trong giáo trình của Môn Phái". Codebase hiện tại đi qua `identity.thiToc`. Mỗi Thị Tộc có Môn Phái canonical 1:1 ở cấp nhập môn → attach `starterTechniques` vào clan acceptable. Nếu tách sect khỏi clan sau này, field có thể move mà không đổi item schema.

### 8.2. Manual Add/Remove (always available)
- Trên tab Thuật Thức: nút `+ Add Technique` → mở picker dialog (§9.4).
- Picker list tất cả catalog entries, filter theo category/level/element/trait.
- Khi pick: `learnThuatThuc(actor, id, 'manual')`, không tốn XP, không check prerequisite.
- Nút trash trên mỗi row → xóa item khỏi actor.

### 8.3. XP Purchase (deferred — spec stub only)
Khi feature này được build (theo `spec_character_progression.md` §3.3):
- Cost: 3 XP/Thuật Thức.
- Flow: trừ `progression.currentXp`, enforce §7.3 HARD CHECK, tạo item với `source='xp'`, append changelog entry `type: 'technique_learned'`.
- Nút `Buy with XP` sẽ được thêm vào picker khi feature sẵn sàng.

---

## 9. UI CONTRACT

### 9.1. Character sheet tab `Thuật Thức`
Tab riêng trên actor sheet, bên cạnh Inventory/Features/Effects.

**Layout:**
- Header bar:
  - `+ Add Technique` button
  - `Rest: Scene` / `Rest: Session` / `Rest: Long` buttons (3 nút riêng)
  - Search box (filter by name)
- Body: accordion sections theo phân hệ (§2), collapse được, chỉ hiển thị phân hệ có technique.
- Mỗi row:
  - Image/icon
  - Tên (click → mở item sheet)
  - Badge: Cấp-1, Hỏa (màu theo element), source badge ('clan'|'xp'|'manual' qua tooltip)
  - Trait chips (compact, localized)
  - Counter: `usesRemaining / maxUses` (ẩn nếu `unlimited`)
  - `Use` button (disabled khi hết uses)
  - `Chat` button (post rules card)
  - `Trash` button

### 9.2. Item sheet (`thuatThuc` type)
Layout khi mở item:
- Header: tên, image, phân hệ/sub-category/cấp/element badges.
- Tab `Details`:
  - Trait chips
  - Rows: Điều kiện, Kiểm tra, Độ Khó, Phạm vi, Thời hạn, Tần Số Sử Dụng, Tiêu hao
  - Hiệu Quả Chính (rendered HTML)
  - Sincerity Effects list (cost badge + text)
  - Prerequisites (element/skill requirements)
- Tab `Notes`: DM-editable rich text (`system.notes`)

Giá trị catalog lookup live từ `CONFIG.BOILERPLATE.THUAT_THUC[system.techniqueId]`. Chỉ `notes` và usage state được lưu per-instance.

### 9.3. Chat card (DM display)
Khi click `Chat`:
- ChatMessage rendered từ `templates/chat/thuat-thuc-card.hbs`.
- Nội dung: tên, phân hệ, cấp, element, trait chips, điều kiện, kiểm tra, độ khó, phạm vi, thời hạn, hiệu quả chính, sincerity effects — full.
- Styled riêng, visible cho cả party và DM.

### 9.4. Picker dialog
- ApplicationV2 modal.
- Filters: category, level, element, trait, search text.
- List view: tên, cấp badge, element badge, short description (first 100 chars of `primaryEffect`).
- Click row → confirm → `learnThuatThuc(actor, id, 'manual')`.
- Prerequisite warning badge (không chặn).

---

## 10. CHANGELOG INTEGRATION (future)

Thêm 2 type mới vào `changelog` của character:
- `technique_learned` — khi học Thuật Thức (clan grant, manual, xp). Fields: `id`, `type`, `timestamp`, `techniqueId`, `source`, `xpCost` (0 cho clan/manual).
- `technique_used` — (optional, có thể skip) khi click Use. Nếu implement, nhớ rate-limit để không spam.

`spec_character_progression.md` §2.3 bảng sẽ được mở rộng để cover 2 type này.

---

## 11. SEED CATALOG — LEVEL 1 (8 samples)

Implementation đầu tiên seed 8 entries đại diện cho 7 phân hệ (Võ Kỹ có 2 để cover cả với-element và không-element). Các entries khác ở cấp 1 (~65 entries còn lại) transcribe ở pass sau.

| ID | Category | Sub | Element | maHoa | Rulebook reference |
|---|---|---|---|---|---|
| `hoaKhiThuc` | voKy | toanDung | hoa | — | Hỏa Khí Thức (Cấp-1) |
| `phiKhiThuc` | voKy | toanDung | — | — | Phi Khí Thức (Cấp-1) |
| `themDoanNangLuc` | tamThuat | — | kim | — | Thẩm Đoán Năng Lực (Cấp-1) |
| `nghiThucTruTa` | nghiThuc | — | — | — | Nghi Thức Trừ Tà (Cấp-1) |
| `hoaDiemChiThuat` | linhThuat | — | hoa | — | Hỏa Điểm Chỉ Thuật (Cấp-1) |
| `hoaKhiQuyen` | khiThuat | — | hoa | — | Hỏa Khí Quyền (Cấp-1) |
| `maLinhNguyenChu` | maThuat | — | — | true | Ma Linh Nguyền Chú (Cấp-1) |
| `tiemHanhBo` | amKy | — | kim | — | Tiềm Hành Bộ (Cấp-1) |

### 11.1. `hoaKhiThuc` — Hỏa Khí Thức
- **traits**: `chiThanh`, `hoaHanh`
- **condition**: Kỹ năng Võ Thuật (Hỏa hành) phù hợp với vũ khí.
- **usage**: `{ frequency: 'unlimited', maxUses: 1 }`
- **prerequisites**: `{ elements: { hoa: 1 }, skills: { voThuat: 1 } }`
- **sincerityEffects**:
  - `1+ Hỏa chí thành`: Với mỗi điểm chí thành (tối đa bằng cấp bậc Hỏa), tăng lượng sát thương kế tiếp mà đối tượng phải nhận thêm 2 điểm, tới kết thúc lượt sau của nhân vật.

### 11.2. `phiKhiThuc` — Phi Khí Thức
- **traits**: `hanhDong`, `congKich`
- **skillCheck**: Võ Thuật
- **difficulty**: 2
- **range**: 6-bộ, 1 đối tượng
- **usage**: `{ frequency: 'unlimited', maxUses: 1 }`
- **prerequisites**: `{ skills: { voThuat: 1 } }`
- **primaryEffect**: Thành công → gây sát thương của vũ khí. Thất bại → vũ khí rơi ở vị trí tối đa 6-bộ trên quỹ đạo ném.
- **sincerityEffects**:
  - `1+ chí thành`: Mỗi điểm chí thành tăng phạm vi tối đa thêm 1-bộ.

### 11.3. `themDoanNangLuc` — Thẩm Đoán Năng Lực
- **traits**: `chiThanh`, `kimHanh`
- **condition**: Tâm Ý, hoặc kỹ năng để thi đấu với một hoặc nhiều đối tượng.
- **usage**: `{ frequency: 'unlimited', maxUses: 1 }`
- **prerequisites**: `{ elements: { kim: 1 } }`
- **sincerityEffects**:
  - `1+ Kim chí thành`: Chọn một đối tượng; với mỗi điểm chí thành, nhân vật nhận biết cấp bậc Binh Pháp, Võ Thuật, hoặc kỹ năng đối tượng dùng để thi đấu.
  - `2 Kim chí thành`: Chọn một đối tượng; nhận biết tất cả Đặc Điểm tinh thần của đối tượng.

### 11.4. `nghiThucTruTa` — Nghi Thức Trừ Tà
- **traits**: `hanhDong`, `dinhKy`, `nguHanh`
- **skillCheck**: Thần Học
- **difficulty**: 4
- **range**: Số lượng cá thể tối đa bằng cấp bậc Hành sử dụng, phạm vi tiếp xúc.
- **usage**: `{ frequency: 'unlimited', maxUses: 1 }`
- **prerequisites**: `{ skills: { thanHoc: 1 } }`
- **primaryEffect**: Nhân vật giải trừ trạng thái "Nhiễm Ma" trên cơ thể của đối tượng.
- **sincerityEffects**:
  - `1 chí thành`: Nếu một trong các đối tượng là thực thể "Ngoại giới", nhân vật nhận ra (nhưng không biết cụ thể ai).
  - `1+ chí thành`: +1 số lượng đối tượng mỗi chí thành.
  - `1+ chí thành`: Chuyển phạm vi thành hình cầu bán kính 2-bộ. +2-bộ mỗi chí thành. Loại bỏ "Nhiễm Tà" của địa hình trong phạm vi 1 ngày (+1 ngày mỗi chí thành).

### 11.5. `hoaDiemChiThuat` — Hỏa Điểm Chỉ Thuật
- **traits**: `hanhDong`, `congKich`, `hoaHanh`, `hoaKhi`, `hoaTinh`
- **skillCheck**: Thần Học (Hỏa hành)
- **difficulty**: 3
- **range**: 6-bộ, số lượng tối đa = Hỏa hành
- **duration**: Lập tức
- **usage**: `{ frequency: 'unlimited', maxUses: 1 }`
- **prerequisites**: `{ elements: { hoa: 1 }, skills: { thanHoc: 1 } }`
- **primaryEffect**: Mỗi đối tượng nhận sát thương siêu nhiên Hỏa tính bằng cấp bậc Hỏa hành (+1/chí thành).
- **sincerityEffects**:
  - `1+ Hỏa chí thành`: Tăng phạm vi tối đa thêm +2-bộ mỗi chí thành.

### 11.6. `hoaKhiQuyen` — Hỏa Khí Quyền
- **traits**: `hanhDong`, `congKich`, `hoTro`, `hoaHanh`, `hoaTinh`
- **skillCheck**: Võ Thuật
- **difficulty**: 2
- **range**: 1-bộ, 1 đối tượng
- **duration**: Kết thúc cảnh hiện tại (hoặc kích hoạt Khí thuật khác)
- **usage**: `{ frequency: 'unlimited', maxUses: 1 }`  *(Khí Thuật Tĩnh: duy trì đến khi đổi khí thuật — không cần counter)*
- **prerequisites**: `{ elements: { hoa: 1 }, skills: { voThuat: 1 } }`
- **primaryEffect**:
  - *Nội Lưu*: Cường hóa quyền cước với Hỏa khí. Võ thuật Hình thể bằng tay/chân có sát thương chuyển thành siêu nhiên và tăng bằng cấp bậc Hỏa hành.
  - *Ngoại Phá*: tiêu hao 3 Hỏa chí thành → gây sát thương vật lý bằng cấp bậc Hỏa hành lên đối tượng 1-bộ; đối tượng kiểm tra Thể thuật ĐK 4 (Kim 5, Thủy 2) để không rơi "Hoa mắt".

### 11.7. `maLinhNguyenChu` — Ma Linh Nguyền Chú
- **traits**: `hanhDong`, `congKich`, `muuKe`, `nguHanh`, `maThuat`, `nguyenChu`
- **maHoa**: true
- **skillCheck**: Thần Học (Hành phương bất kỳ)
- **difficulty**: Cảnh Giác của đối tượng
- **range**: 1 đối tượng, phạm vi tiếp xúc
- **usage**: `{ frequency: 'unlimited', maxUses: 1 }`
- **prerequisites**: `{ skills: { thanHoc: 1 } }`
- **primaryEffect**: Đối tượng có Hành khắc xuất với Hành của bài xét rơi vào trạng thái "Nhiễm ma". *(Ví dụ: Ma Linh Nguyền Chú (Kim) sẽ khiến Hành Mộc của đối phương "Nhiễm ma".)*
- **sincerityEffects**:
  - `1+ chí thành`: Tăng phạm vi lên +1-bộ.
  - `1+ chí thành`: Ảnh hưởng thêm một đối tượng có Cảnh Giác ≤ đối tượng chính.

### 11.8. `tiemHanhBo` — Tiềm Hành Bộ (Vô Ảnh Bộ)
- **traits**: `chiThanh`, `kimHanh`
- **condition**: Nhân vật trong địa hình "Che Phủ", nơi đông người, hoặc các trường hợp khác hỗ trợ khả năng ẩn tránh.
- **usage**: `{ frequency: 'unlimited', maxUses: 1 }`
- **prerequisites**: `{ elements: { kim: 1 }, skills: { hacNghiep: 1 } }`
- **sincerityEffects**:
  - `1 Kim chí thành`: Nhân vật trở nên "ẩn thân" đối với một đối tượng có Cảnh Giác ≤ cấp độ Hắc Nghiệp của bản thân.

---

## 12. OPEN QUESTIONS (tracked, not resolved this pass)

1. **Khí Thuật dual-effect**: Tĩnh thuật (Nội Lưu) vs Động thuật (Ngoại Phá). Spec hiện tại collapse vào `primaryEffect` + `sincerityEffects`. Có cần shape riêng cho hai phần? → Defer; revisit khi transcribe full Khí Thuật.
2. **Nghi Thức cast time**: Ritual thường có thời gian cast dài. Hiện tại encode trong `duration`. Có cần field `castTime` riêng? → Defer.
3. **Party-wide rest**: "Rest: Session" có nên reset cho cả party cùng lúc? → Defer; hiện tại chỉ per-actor.
4. **Ma Thuật corruption side-effects**: Ma Thuật gây hệ lụy lên user (nhiễm ma, v.v.). Engine có track không? → Defer; hiện tại chỉ display.
5. **"Choose N" starter packages**: Một số clan như Thường Liên ("Chọn 3"). `starterTechniques` hiện tại là array đơn giản. Shape cần mở rộng khi cover full catalog (ví dụ: `starterTechniques: (string | { choose: number, from: string[] })[]`).
6. **Khí Thuật không có Tần Số nhưng duy trì đến khi đổi khí thuật khác**: Hiện tại dùng `unlimited`, cần cơ chế track "khí thuật đang hoạt động" (chỉ 1 tại một thời điểm). → Defer.

---

## 13. OUT OF SCOPE (this pass)

- Full Level-1 catalog transcription (~65 entries còn lại).
- Levels 2–6 catalog.
- XP purchase UI + buy flow.
- Prerequisite HARD enforcement.
- Effect auto-resolution (damage/condition application).
- `choose N` starter clauses.
- Compendium pack creation / sharing.
- "Active" Khí Thuật tracking (chỉ 1 tại một thời điểm).

---

## 14. CROSS-REFERENCES

- `specs/rule_overview.md` §10 — danh sách spec.
- `specs/spec_character_progression.md` §3.3 — XP cost cho Thuật Thức.
- `specs/spec_sects_and_factions.md` — Giáo Trình (clan starter curriculum).
- `CLAUDE.md` §Architecture — Thuật Thức pipeline entry.
