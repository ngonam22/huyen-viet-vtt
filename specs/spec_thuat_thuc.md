# SPEC_THUAT_THUC: HỆ THỐNG THUẬT THỨC (Techniques & Spells)

## 1. TỔNG QUAN (Overview)

**Thuật Thức** là tên gọi chung của các chiêu thức, phép thuật, nghi lễ và kỹ thuật đặc biệt mà nhân vật có được thông qua quá trình học tập và huấn luyện. Trong hệ thống của game, Thuật Thức là một subsystem độc lập, tách rời khỏi các thuộc tính thụ động của trang bị (Vũ Khí, Giáp Trụ, Trang Bị).

### 1.1. Triết lý thiết kế (DM-driven)
Engine **KHÔNG tự động giải quyết hiệu ứng** của Thuật Thức (không tự trừ Sát Lực, không tự áp trạng thái). Thay vào đó, engine:
- Lưu trữ metadata (tên, phân hệ, tính trạng, mô tả hiệu quả) dưới dạng đọc-được.
- Theo dõi mechanical state: số lần còn lại (`usesRemaining`) theo tần số sử dụng.
- Cung cấp chat card để DM đọc nguyên văn luật và narrate hiệu ứng trong bàn chơi.

Điều này giữ linh hoạt cho DM tùy biến narrative mà không bị engine gò bó, đồng thời vẫn hỗ trợ mechanical bookkeeping (usage counters, reset, prerequisites).

### 1.2. Phạm vi spec này
Spec này định nghĩa **toàn bộ** data model, mechanical behavior, acquisition flow, và UI contract của Thuật Thức. Spec áp dụng cho tất cả cấp bậc (1–6). Catalog hiện tại chứa toàn bộ Thuật Thức **Cấp-1 và Cấp-2** của rulebook v0.8.4 (132 entries, xem §11); Cấp-3+ transcribe ở pass sau.

---

## 2. PHÂN HỆ (Categories)

Thuật Thức được chia thành 8 phân hệ đỉnh. Mỗi Thuật Thức thuộc đúng 1 phân hệ. Phân hệ là đơn vị mà Giáo Trình Hệ Phái mở khóa (§8.3).

| Key | Tên | Mô tả | Sub-categories |
|---|---|---|---|
| `voKy` | Võ Kỹ | Chiêu thức võ thuật dùng vũ khí/cơ thể | `toanDung`, `canChien`, `xaChien`, `thanPhap` |
| `tamThuat` | Tâm Thuật (Chủ Thuật) | Kỹ năng xã hội, ngôn ngữ, tâm lý | — |
| `kyNghe` | Kỳ Nghệ | Kỹ thuật nghề nghiệp: chế tác, chữa trị, thương phẩm, phê bình | — |
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
- `hoaTinh`, `thoTinh`, `kimTinh`, `thuyTinh`, `mocTinh` — Sát Lực / hiệu ứng mang tính chất siêu nhiên Hành đó.
- `loiTinh` — Lôi Tính: Sát Lực / hiệu ứng siêu nhiên tính Lôi.
- `thienDien` — Thiên Diễn; `thienHoan` — Thiên Hoán: tag Linh Thuật theo rulebook.
- `thinhGiac` — Thính Giác; `ngonNgu` — Ngôn Ngữ: hiệu ứng tác động qua âm thanh / lời nói.
- `phucHoi` — Phục Hồi: hồi phục Sức Lực / Tâm Lực / trạng thái.
- `hoaKhi` — Hóa Khí: biểu hiện dưới dạng khí (Linh Thuật).
- `hoaThe` — Hóa Thể: biểu hiện dưới dạng vật thể (Linh Thuật).
- `nguyenChu` — Nguyền Chú: ma thuật nguyền rủa.
- `maThuat` — tag Ma Thuật.

### 3.6. Trait Catch-all
- `dacBiet` — Đặc Biệt: cách kích hoạt tùy mô tả riêng.

*Note:* danh sách trait là open-ended. Khi transcribe full catalog nếu gặp tính trạng mới, thêm vào enum `THUAT_THUC_TRAITS` trong `config/thuat-thuc.ts`, type `TraitKey` trong `types/thuatThuc.d.ts` và label trong `lang/en.json`. Tag rulebook không có trait tương ứng (ví dụ `[Kỳ Nghệ]`, `[Thất Bại]`) hiện bị bỏ qua.

---

## 4. CẤP BẬC & HÀNH AFFINITY (Level & Element)

### 4.1. Level
Integer 1–6. Cấp bậc Thuật Thức quyết định:
- Gating học: Thuật Thức trong Giáo Trình chỉ mở khi cấp Thuật Thức ≤ cấp Hệ Phái (§8.3).
- (Không ảnh hưởng XP cost — xem §8.3.)

### 4.2. Element affinity
Optional: `hoa` / `tho` / `kim` / `thuy` / `moc` / `null`.

**Ma Thuật:** Element affinity vẫn là một trong 5 Hành nhưng được đánh dấu là "Ma-hóa". Spec này ghi nhận bằng flag phụ `maHoa: boolean` trên catalog entry; giá trị `element` vẫn dùng key Ngũ Hành thường.

---

## 5. TECHNIQUE INFO BLOCK (Per Catalog Entry)

Đây là shape cố định của mỗi entry trong catalog `THUAT_THUC`:

```ts
export interface ThuatThuc {
  id: string;                          // stable key, camelCase theo tên rulebook (bỏ dấu), e.g. "hoaVoThuc"
  name: string;                        // tên tiếng Việt viết thẳng, e.g. "Hỏa Võ Thức"
  category: ThuatThucCategory;         // §2
  subcategory?: VoKySubcategory;       // §2 (chỉ cho Võ Kỹ)
  level: 1 | 2 | 3 | 4 | 5 | 6;
  element?: HvElementKey;              // §4.2
  maHoa?: boolean;                     // Ma-hóa flag (Ma Thuật)
  traits: TraitKey[];                  // §3

  // Display text — chuỗi tiếng Việt viết thẳng (KHÔNG dùng i18n key);
  // template vẫn gọi {{localize}} nên chuỗi thường được trả về nguyên văn
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
  description?: string;                // flavor text tiếng Việt
}

export interface SincerityEffect {
  cost: string;          // "1+", "2", "3 Hỏa", etc.
  element?: HvElementKey;  // element tied to the cost (optional)
  text: string;          // chuỗi tiếng Việt
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
- **XP purchase (§8.3):** **HARD CHECK** — không cho mua nếu thiếu.

### 7.3. Catalog hiện tại không khai báo prerequisites
Rulebook v0.8.4 không ghi yêu cầu Hành/Kỹ Năng riêng cho từng Thuật Thức — điều kiện học là **Giáo Trình / Đặc Quyền Hệ Phái** (§8.3). Vì vậy các entry Cấp-1/2 trong catalog **không có** `prerequisites`. Field và HARD CHECK vẫn giữ để dùng khi rulebook bổ sung yêu cầu riêng.

---

## 8. ACQUISITION FLOW

Cả 3 path đều tạo ra item type `thuatThuc` trên actor, phân biệt bằng field `source`.

### 8.1. Clan Auto-Grant (semi-auto, level 1)
- `config.ts` → mỗi `ThiToc` entry có thêm field `starterTechniques?: string[]` (array of technique IDs).
- Khi player chọn Thị Tộc, `setThiTocForActor(actor, clanId)` được gọi. Sau khi tạo item `thiToc`, nó gọi thêm `grantClanStarterTechniques(actor, clanId)`:
  1. Đọc `starterTechniques` của clan.
  2. Với mỗi technique ID, gọi `learnThuatThuc(actor, id, 'clan')`.
- Khi player đổi hoặc xóa Thị Tộc, **hoặc chọn Bối Cảnh** (Thị Tộc / Bối Cảnh loại trừ nhau, chung field `identity.thiToc`), `removeXuatThanItems(actor)` xóa các item `thuatThuc` có `source === 'clan'` (không động đến `manual` / `xp`). Hàm này được gọi bởi `setThiTocForActor`, `setBoiCanhForActor` và `removeThiTocFromActor`.

**Note về rulebook wording:** sách ghi "3 Thuật Thức trong giáo trình của Môn Phái". Codebase hiện tại đi qua `identity.thiToc`. Mỗi Thị Tộc có Môn Phái canonical 1:1 ở cấp nhập môn → attach `starterTechniques` vào clan acceptable. Nếu tách sect khỏi clan sau này, field có thể move mà không đổi item schema.

### 8.2. Manual Add/Remove (GM)
- Trên tab Thuật Thức: nút `+ Add Technique` → mở picker dialog (§9.4).
- GM thấy nút `Thêm` (miễn phí) trên mỗi row: `learnThuatThuc(actor, id, 'manual')`, không tốn XP, không check Hệ Phái/prerequisite.
- Nút trash trên mỗi row → xóa item khỏi actor.

### 8.3. XP Purchase (Giáo Trình / Đặc Quyền Hệ Phái)
Implement tại `learnThuatThucWithXp(actor, id)` (`module/helpers/progression.ts`), theo `spec_character_progression.md` §3.3:
- **Cost:** 3 Tu Vi/Thuật Thức, bất kể cấp (`xpCost`, default `THUAT_THUC_XP_COST_DEFAULT = 3`). Trừ `progression.currentXp`; `totalXp` không đổi.
- **Gate — `isThuatThucUnlocked(actor, entry)`** (`module/helpers/thuatThuc.ts`). Thuật Thức được mở nếu thỏa **một trong hai**:
  1. **Giáo Trình:** `entry.category ∈ HE_PHAI[monPhai].curriculum` **và** `entry.level ≤` cấp Hệ Phái (`system.attributes.level.value`).
  2. **Đặc Quyền:** khớp một mục trong `HE_PHAI[monPhai].privileges[b]` với `b ≤` cấp Hệ Phái. Mục là `{ id }` (một Thuật Thức cụ thể) hoặc `{ category, maxLevel }` (cả phân hệ tới cấp `maxLevel`). Đặc Quyền **cộng dồn** qua các bậc và **bỏ qua** giới hạn cấp lẫn Giáo Trình.
  - Nhân vật chưa có Hệ Phái → không mở gì.
- **Flow:** check gate → check đủ `currentXp` → HARD CHECK prerequisites (§7.2) → chặn trùng `techniqueId` → trừ XP → tạo item `source='xp'` → changelog `technique_learned`.
- Cấp Hệ Phái tăng (§`spec_character_progression.md` §4) → các Thuật Thức mới tự hiện là "mở" trong picker; không auto-grant.

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
- Header: Tu Vi hiện có (`currentXp`); checkbox `Hiện tất cả` (chỉ GM).
- Player (và GM khi tắt `Hiện tất cả`) chỉ thấy Thuật Thức đã mở theo §8.3. GM bật `Hiện tất cả` → thấy cả entry bị khóa, có badge 🔒.
- List view: tên, cấp badge, element badge, short description (first 100 chars of `primaryEffect`).
- Row đã học → badge `Đã học`, không có nút.
- Row đã mở, chưa học → nút `Học (3)` gọi `learnThuatThucWithXp`; disabled khi `currentXp < xpCost`.
- GM → thêm nút `Thêm` miễn phí (§8.2).
- Sau khi học/thêm, picker re-render (không đóng) để học tiếp.

---

## 10. CHANGELOG INTEGRATION (future)

Thêm 2 type mới vào `changelog` của character:
- `technique_learned` — khi học Thuật Thức (clan grant, manual, xp). Fields: `id`, `type`, `timestamp`, `techniqueId`, `source`, `xpCost` (0 cho clan/manual).
- `technique_used` — (optional, có thể skip) khi click Use. Nếu implement, nhớ rate-limit để không spam.

`spec_character_progression.md` §2.3 bảng sẽ được mở rộng để cover 2 type này.

---

## 11. CATALOG — LEVEL 1–2 (rulebook v0.8.4)

Catalog chia file theo phân hệ trong `module/helpers/config/thuat-thuc/`:
`vo-ky.ts`, `tam-thuat.ts`, `ky-nghe.ts`, `nghi-thuc.ts`, `linh-thuat.ts`, `khi-thuat.ts`, `ma-thuat.ts`, `am-ky.ts`.
`module/helpers/config/thuat-thuc.ts` gộp tất cả thành `THUAT_THUC` (+ `THUAT_THUC_BY_ID`).

| Phân hệ | Cấp-1 | Cấp-2 |
|---|---|---|
| Võ Kỹ | 7 | 15 |
| Tâm Thuật | 15 | 9 |
| Kỳ Nghệ | 4 | 5 |
| Nghi Thức | 5 | 5 |
| Linh Thuật | 28 | 10 |
| Khí Thuật | 11 | 11 |
| Ma Thuật | 5 | 0 |
| Ám Kỹ | 1 | 1 |
| **Tổng** | **76** | **56** |

**Quy ước:**
- `id` = tên rulebook bỏ dấu, camelCase, bỏ tiền tố chung khi rõ nghĩa (ví dụ "Hỏa Võ Thức" → `hoaVoThuc`, "Nghi Thức Trừ Tà" → `nghiThucTruTa`). Đổi id = item cũ trên actor mất liên kết catalog → cần migration.
- Mọi text là tiếng Việt viết thẳng; `xpCost: 3`; không có `prerequisites` (§7.3).
- Khí Thuật: phần Nội Lưu + Ngoại Phá cùng nằm trong `primaryEffect` (xem §12.1).
- Entry rulebook chỉ có tiêu đề (chưa có nội dung) vẫn được đưa vào với tên + cấp; entry không có cấp (ví dụ "Nước Động Dưới Ao") hoặc đánh dấu nháp `XXX` bị bỏ qua.
- Lỗi chính tả / câu cụt trong rulebook được giữ nguyên văn — sửa ở rulebook trước rồi đồng bộ catalog.

## 12. OPEN QUESTIONS (tracked, not resolved this pass)

1. **Khí Thuật dual-effect**: Tĩnh thuật (Nội Lưu) vs Động thuật (Ngoại Phá). Spec hiện tại collapse vào `primaryEffect` + `sincerityEffects`. Có cần shape riêng cho hai phần? → Defer; revisit khi transcribe full Khí Thuật.
2. **Nghi Thức cast time**: Ritual thường có thời gian cast dài. Hiện tại encode trong `duration`. Có cần field `castTime` riêng? → Defer.
3. **Party-wide rest**: "Rest: Session" có nên reset cho cả party cùng lúc? → Defer; hiện tại chỉ per-actor.
4. **Ma Thuật corruption side-effects**: Ma Thuật gây hệ lụy lên user (nhiễm ma, v.v.). Engine có track không? → Defer; hiện tại chỉ display.
5. **"Choose N" starter packages**: Một số clan như Thường Liên ("Chọn 3"). `starterTechniques` hiện tại là array đơn giản. Shape cần mở rộng khi cover full catalog (ví dụ: `starterTechniques: (string | { choose: number, from: string[] })[]`).
6. **Khí Thuật không có Tần Số nhưng duy trì đến khi đổi khí thuật khác**: Hiện tại dùng `unlimited`, cần cơ chế track "khí thuật đang hoạt động" (chỉ 1 tại một thời điểm). → Defer.

---

## 13. OUT OF SCOPE (this pass)

- Levels 3–6 catalog (và các Đặc Quyền trỏ tới Thuật Thức cấp ≥3 — xem `spec_sects_and_factions.md` §5.3).
- Starter techniques của Hệ Phái lúc tạo nhân vật (bước "Thuật Thức" của Bát Bộ Thành Nhân chưa có logic).
- Effect auto-resolution (damage/condition application).
- `choose N` starter clauses.
- Compendium pack creation / sharing.
- "Active" Khí Thuật tracking (chỉ 1 tại một thời điểm).

---

## 14. CROSS-REFERENCES

- `specs/rule_overview.md` §10 — danh sách spec.
- `specs/spec_character_progression.md` §3.3 — XP cost cho Thuật Thức.
- `specs/spec_sects_and_factions.md` §5.3 — Giáo Trình / Đặc Quyền theo Hệ Phái.
- `CLAUDE.md` §Architecture — Thuật Thức pipeline entry.
