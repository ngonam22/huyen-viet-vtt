***

# HUYỀN VIỆT RPG - RULE BOOK'S SYSTEM ARCHITECTURE & CORE RULES SPECIFICATION

## 1. TỔNG QUAN HỆ THỐNG (System Overview)
Huyền Việt RPG là một hệ thống Tabletop RPG có bối cảnh cổ đại huyền ảo (Đại Việt Thần Quốc). Engine của game không sử dụng các chỉ số sinh lý phương Tây (STR, DEX, INT) mà hoàn toàn dựa trên triết lý **Ngũ Hành (Hỏa, Thổ, Kim, Thủy, Mộc)**. Trò chơi tập trung vào quản lý tài nguyên, sự cân bằng tâm lý và tính tương sinh - tương khắc.

## 2. CORE RESOLUTION ENGINE (Cơ chế Đổ Xúc Xắc / Xét Năng Lực)
Hệ thống sử dụng xúc xắc 10 mặt (d10) dưới dạng Dice Pool (Gộp xúc xắc).

### 2.1. Logic Số Lượng Xúc Xắc (Dice Pool)
*   **Công thức:** `Số lượng d10 = Cấp bậc Kỹ Năng + Cấp bậc Hành Phương (Ngũ Hành)`.
*   **Độ Khó (ĐK - Difficulty):** Số lượng điểm "Thành" tối thiểu cần đạt để hành động thành công.

### 2.2. Logic Tính Điểm Xúc Xắc (Dice Values)
Các mặt của d10 được map theo hệ Âm - Dương:
*   **Mặt 0:** 2 Bại (Đại Bại / Thái Âm)
*   **Mặt 1, 2, 3:** 1 Bại (Bại / Thiếu Âm)
*   **Mặt 4, 5:** 0 điểm (Cân Bằng / Thái Cực)
*   **Mặt 6, 7, 8:** 1 Thành (Thành / Thiếu Dương)
*   **Mặt 9:** 2 Thành (Đại Thành / Thái Dương)

### 2.3. Resolution Logic
*   **Thành công (Success):** Khi `Tổng điểm Thành >= ĐK`.
*   **Thất bại (Failure):** Khi `Tổng điểm Thành < ĐK`.
*   **Chí Thành (Critical Success):** Điểm Thành dư ra (`Tổng Thành - ĐK`). Dùng để kích hoạt hiệu ứng phụ, thêm sát thương.
*   **Chí Bại (Critical Failure):** Điểm hụt so với ĐK (`ĐK - Tổng Thành`). Gây hiệu ứng tiêu cực.
*   **Mechanic Can Thiệp (Tâm Lực):** Người chơi có thể tiêu hao **1 điểm Tâm Lực** để đổi một mặt xúc xắc 4 hoặc 5 (Cân Bằng) thành 1 Thành hoặc 1 Bại.

## 3. DATA MODEL: THỰC THỂ NHÂN VẬT (Character Entity)

### 3.1. Chỉ Số Cốt Lõi (Core Attributes - Ngũ Hành)
Đại diện cho "phương pháp hành động" (Hành phương) từ 1 đến 5. Lưu trong `system.elements.<key>.value` (integer, 1–6).
*   `hoa` — Hỏa (Sáng tạo, áp đảo, bộc trực).
*   `tho` — Thổ (Bảo thủ, kiên định, chống chịu).
*   `kim` — Kim (Kỷ luật, tinh luyện, hư chiêu).
*   `thuy` — Thủy (Trực giác, vô chiêu, linh hoạt).
*   `moc` — Mộc (Thăng hoa, biến chiêu, cảm hóa).

Các giá trị này được **reset về 1 mỗi lần `prepareDerivedData()` chạy**, sau đó cộng dồn bonus từ Thị Tộc, Bối Cảnh, và Gia Cảnh. Giá trị trong DB là base — không phải giá trị hiển thị cuối cùng.

### 3.2. Chỉ Số Dẫn Xuất (Derived Stats - Ngũ Hành Phát Nguyên)
Tất cả các chỉ số này đều **không lưu trong database** — chúng được tính toán lại mỗi `prepareDerivedData()` và chỉ tồn tại trên in-memory object.

#### Chỉ số tài nguyên (có `base` và `value`)
*   `sucLuc` — Sức Lực (HP/Stamina):
    - `base` = `5 + (moc + hoa + tho)` — tính lại mỗi lần.
    - `value` — **lưu trong DB**, chỉ thay đổi khi nhận sát thương hoặc hồi phục. Không bị ghi đè bởi công thức.
*   `tamLuc` — Tâm Lực (Mental/Sanity):
    - `base` = `tho + kim + thuy` — tính lại mỗi lần.
    - `value` — **lưu trong DB**, bị giảm khi tiêu hao. Khi = 0 → trạng thái "Loạn Tâm".

#### Chỉ số thuần derived (chỉ có `value`, không lưu DB)
*   `canhGiac` — Cảnh Giác (Passive Difficulty): `value` = `ceil((hoa + tho + kim) / 3)`.
*   `chuTam` — Chú Tâm (Initiative): `value` = `kim + thuy + moc`.
*   `tocDo` — Tốc Độ (Speed, tính bằng "bộ"): `value` = `(thuy + moc + hoa) / 2`.
*   `nguHop` — Ngũ Hợp (Meta Currency/Fate): `value` = `min(sucLuc.base, tamLuc.base, canhGiac, chuTam, tocDo)`. Dùng giá trị **tối đa** của sucLuc và tamLuc.
*   `khangLuc` — Khang Lực (Defense / Damage Reduction): `value` = tổng `resistance` của tất cả item `giapTru` đang được trang bị (`isEquipped = true`), cộng thêm các buff tạm từ ActiveEffect. **Không lưu DB** — luôn tính lại trong `applyEquippedItemEffects()`.

#### Damage Pipeline (xem §5.3)
Khi bị tấn công: `Sát Thương - khangLuc.value` → phần dư trừ `sucLuc.value`.

### 3.3. Schema Đầy Đủ (actor-character DataModel)
```
system: {
  identity: {
    giaToc: string        // Gia tộc (clan name, free text)
    monPhai: string       // Môn phái (sect)
    thiToc: string        // ID Thị Tộc đã chọn (ref → THI_TOC config)
    ngheNghiep: string    // Nghề nghiệp (free text)
    tinhCach: string      // Tính cách (free text)
    boiCanh: string       // ID Bối Cảnh đã chọn (ref → BOI_CANH config)
    giaCanh: string       // ID Gia Cảnh đã chọn (ref → GIA_CANH config)
  }
  elements: {
    hoa/tho/kim/thuy/moc: { value: int 1–6 }  // stored base; runtime value computed
  }
  skills: {
    // Học Đạo
    chinhTri, khoaHoc, thanHoc, xaHoi, yHoc: int 0–6
    // Nghệ Đạo
    myThuat, vanTu, thoiTrang, chienCu: int 0–6
    // Sinh/Hắc Đạo
    laoDong, thuongNghiep, haiNghiep, hacNghiep, sinhTon: int 0–6
    // Tâm Đạo
    lanhDao, leDao, bieuDien, tamY: int 0–6
    // Võ Đạo
    theThuat, voThuat, binhPhap, thienDinh: int 0–6
  }
  abilities: {
    sucLuc:   { base: int, value: int }   // value = current HP (stored)
    tamLuc:   { base: int, value: int }   // value = current MP (stored)
    canhGiac: { value: int }              // derived only
    chuTam:   { value: int }              // derived only
    tocDo:    { value: int }              // derived only
    nguHop:   { value: int }              // derived only
    khangLuc: { value: int }              // derived only — sum of equipped armor resistance
  }
  attributes: {
    level: { value: int }   // nhân vật cấp (hiện chưa dùng)
  }
  currency: {
    quan: int   // 1 quan = 10 tiền
    tien: int   // 1 tiền = 100 đồng
    dong: int
  }
  progression: {
    currentXp: int   // XP có thể tiêu; giảm khi nâng cấp
    totalXp:   int   // XP tích lũy; không giảm; dùng tính cấp môn phái
  }
  upgrades: UpgradeRule[]   // XP-purchased modifiers (element/skill only)
  changelog: EventLog[]     // append-only event log cho UI timeline
}
```

### 3.4. Kỹ Năng (Skills - Ngũ Đại Quốc Đạo)
Chấm điểm từ 0–6 (thực tế), chia làm 5 nhóm:
1.  **Võ Đạo:** Thể Thuật, Võ Thuật, Binh Pháp, Thiền Định.
2.  **Học Đạo:** Chính Trị, Khoa Học, Thần Học, Xã Hội, Y Học.
3.  **Nghệ Đạo:** Mỹ Thuật, Văn Tự, Thời Trang, Chiến Cụ.
4.  **Tâm Đạo:** Lãnh Đạo, Lễ Đạo, Biểu Diễn, Tâm Ý.
5.  **Sinh/Hắc Đạo:** Lao Động, Thương Nghiệp, Hải Nghiệp, Hắc Nghiệp, Sinh Tồn.

Kỹ năng được **reset về 0 mỗi `prepareDerivedData()`**, sau đó cộng dồn bonus từ item sources.

### 3.5. Metadata & Narrative Tags
*   **Đặc Điểm:** `Ưu Điểm` (Cho phép dùng 1 Ngũ Hợp reroll 2 xúc xắc) và `Khuyết Điểm` (Ép reroll xúc xắc Thành, thưởng Ngũ Hợp nếu thất bại).
*   **Tâm Lý:** `Niềm Vui` (Hồi 3 Tâm Lực) và `Nỗi Sợ` (Trừ 3 Tâm Lực, thưởng 1 Ngũ Hợp).
*   **Xã Hội:** `Địa Vị` (0-99), `Danh Tiếng` (-5 đến 5), `Nhân Phẩm` (-5 đến 5).

## 4. HỆ THỐNG PHÁT TRIỂN (Progression System)
Nâng cấp dựa trên việc tiêu hao Điểm Kinh Nghiệm (XP):
*   `Hành`: 3 XP * Cấp bậc mới.
*   `Kỹ năng`: 2 XP * Cấp bậc mới.
*   `Thuật Thức`: 3 XP / Thuật thức.
*   `Đặc Kỹ Môn Phái`: Tự động thăng cấp dựa trên ngưỡng Tổng XP tích lũy (Cấp 1 < 20 XP, Cấp 2 từ 20-50 XP...).

## 5. HỆ THỐNG XUNG ĐỘT & CHIẾN ĐẤU (Combat & Conflict Flow)
Hệ thống xử lý cảnh theo 4 cấp: Tâm Đấu, Quyết Đấu, Chiến Đấu, Chiến Trường.

### 5.1. Action Economy
Trong lượt, một character có thể di chuyển bằng `Tốc độ` (không tốn action) và sử dụng 1 Action (Công kích, Hỗ trợ, Mưu kế, Phụ trợ...).

### 5.2. Ngũ Hành Thế (Elemental Stances)
Trong combat, character phải chọn 1 Hành làm "Thế" (Stance), cung cấp Passive buff:
*   `Hỏa Thế`: Trả Tâm lực để đổi lấy Chí Thành.
*   `Thổ Thế`: Miễn nhiễm sát thương chí mạng/hiệu ứng từ Chí Thành của địch. Hoặc Giảm chí thành của địch.
*   `Kim Thế`: Tăng +1 (hoặc +2) ĐK cho kẻ địch đánh vào mình.
*   `Thủy Thế`: Địch tấn công bị trừ Tâm Lực bằng cấp Thủy Hành.
*   `Mộc Thế`: Có thêm 1 free action (không yêu cầu test).

### 5.3. Damage Pipeline (Luồng xử lý Sát Thương)
Khi một Character bị tấn công, Game Rule xử lý theo thứ tự:
1.  **Armor Mitigation:** `Sát Thương` - `khangLuc.value` (tổng Kháng Lực từ giáp + buff tạm). Giá trị này luôn được tính lại từ item, không lưu DB. Giá trị Sát Thương sau khi trừ Kháng Lực > 0, tiếp tục bước tiếp theo.
2.  **HP Mitigation:** Sát Thương dư trừ vào `sucLuc.value` (Sức Lực hiện tại).
3.  **Core Damage (Tổn thương Ngũ Hành):** Nếu Sức Lực cạn (0), sát thương tác động trực tiếp lên Ngũ Hành. Tổn thương Hành sẽ kích hoạt debuff cho Hành đó (+2 ĐK) và buff Hành bị khắc (-1 ĐK).

Tuy nhiên, ở version hiện tại, người chơi tự tính mức sát thương mà Nhân vật (Character) nhận vào, và tự trừ vào Sức Lực (HP) thông qua UI.

### 5.4. Tổn Thương khi nhận Sát Thương

Khi nhận sát thương vượt mức Sức Lực (Khí Lực) Khi lượng Sức Lực của nhân vật bị cạn kiệt (về 0), nhân vật sẽ không thể vận sức để chống đỡ hay né tránh các mối nguy hiểm. Lượng sát thương dư thừa lúc này sẽ trực tiếp gây **Tổn thương lên bản thể của nhân vật** thông qua các bước xử lý sau:
- **Tổn thương Ngũ Hành**:  Sát thương sẽ đâm thẳng vào cơ thể, gây tổn thương trực tiếp lên chỉ số Hành tương ứng với Hành Thế mà nhân vật đang sử dụng ở thời điểm đó
- **Hy sinh Giáp trụ** (Cơ hội cứu vãn): Trước khi chịu tổn thương Hành, nhân vật có thể chọn hy sinh giáp trụ đang mặc để giảm bớt sát thương (bằng với chỉ số Kháng Lực của giáp). Tuy nhiên, việc này sẽ khiến giáp trụ rơi vào trạng thái "Hư hại" và vĩnh viễn bị giảm -2 Kháng Lực cho tới khi được sửa chữa
- **Hệ quả của Tổn thương Hành**: Do Ngũ Hành có tính sinh khắc, một Hành bị thương sẽ làm mất cân bằng cơ thể. Cụ thể, Độ Khó (ĐK) của tất cả các bài xét năng lực dùng Hành bị thương sẽ bị tăng thêm +2. Bù lại, Hành bị khắc bởi nó sẽ trở nên mạnh hơn 1 cấp bậc.
- **Cửa tử (Thập Tử Nhất Sinh)**: Nếu nhân vật nhận quá nhiều sát thương đến mức cả 5 Hành đều bị tổn thương, nhân vật sẽ lập tức rơi vào thời khắc sinh tử. Khi đó, nhân vật phải đối mặt với cái chết (Vinh quang cuối cùng), tiêu hao điểm Ngũ Hợp để giữ mạng sống nhưng mang thương tật vĩnh viễn, hoặc đổ xúc xắc đánh cược với số mệnh

## 6. CƠ CHẾ KHÁC
### 6.1. Tiền tệ
Tiền tệ trong game có tên gọi lần lượt là đồng, tiền, quan. Với tỷ lệ quy đổi như sau:
-   **1 quan** = 10 tiền
-   **1 tiền** = 100 đồng
-   **1 quan** = 10 tiền = 1000 đồng

## 7. GIA CẢNH (Family Background / Occupation)

Gia Cảnh đại diện cho xuất thân gia đình và nghề nghiệp của nhân vật. Mỗi nhân vật chọn một Gia Cảnh trong quá trình tạo nhân vật.

### 7.1. Cấu trúc Upgrade Rule
Mỗi Gia Cảnh chứa một danh sách `upgrade` gồm các rule:
- **Rule có `choose`**: Người chơi phải chọn N effect từ danh sách (ví dụ: chọn 1 trong 2 Ngũ Hành). Nếu chưa chọn, rule này được **bỏ qua** (defer) cho đến khi người chơi xác nhận.
- **Rule không có `choose`** (fixed): Bonus cố định, áp dụng ngay lập tức khi Gia Cảnh được gán vào nhân vật, không cần hành động từ người chơi.

### 7.2. Cơ chế Deferred Selection
Người chơi có thể gán Gia Cảnh trước mà chưa cần chọn hết các option. Hệ thống sẽ:
1. Lưu trạng thái lựa chọn dưới dạng `AppliedUpgrade[]` trên item (type `"giaCanh"`) đính kèm vào actor.
2. Trong `prepareDerivedData`, chỉ áp dụng các rule đã có `selectedIndices`. Rule chưa chọn được bỏ qua.
3. Khi người chơi hoàn tất chọn lựa, gọi lại `setGiaCanhForActor` với `selectedIndicesByRule` đầy đủ để cập nhật.

### 7.3. Luồng dữ liệu
```
GIA_CANH config (config.ts)
    │
    ▼
setGiaCanhForActor(actor, id, selectedIndicesByRule)
    ├─ selectedIndicesByRule = {}     → deferred, không lỗi
    └─ selectedIndicesByRule = {0:[1]} → validate & lưu
    │
    ▼
Item { type:"giaCanh", system: { giaCanhId, appliedUpgrades: AppliedUpgrade[] } }
    │
    ▼
prepareDerivedData → applyGiaCanhItems (actor.ts)
    ├─ rule.choose && selectedIndices rỗng → bỏ qua
    ├─ rule.choose && selectedIndices có giá trị → áp dụng đúng effects được chọn
    └─ không có choose (fixed) → áp dụng toàn bộ effects
```

## 9. HỆ THỐNG HIỆU ỨNG (Condition Effects)
Đây là các hiệu ứng tác động vào nhân vật theo một khoảng thời gian nhất định, có thể chỉ là 1 lượt, hoặc mãi mãi trừ khi người chơi có hành động giải trừ. Các hiệu ứng này có thể là các trạng thái bất lợi hoặc có lợi, và người chơi có thể mang nhiều trạng thái bất lợi cùng một lúc.

Mỗi trạng thái hiệu ứng sẽ có những tác động khác nhau: như có thể tăng Độ khó, làm nhân vật không thể di chuyển, hoặc làm chỉ số Cảnh Giác xuống chỉ còn 1 (Loạn Tâm), v.v... 

Chi tiết ở các trạng thái hiệu ứng và thông tin kỹ thuật sẽ được liệt kê tại `spec_condition_effects.md`

## 10. KIẾN TRÚC SỮ LIỆU ĐÍNH KÈM SẮP TỚI (Upcoming Detailed Specs)
*(Ghi chú cho AI: Các spec file chi tiết sẽ được cung cấp ở các bước tiếp theo)*
1.  `Spec_Character_Creation`: Quy trình 8 bước tạo nhân vật (Bối Cảnh, Gia Cảnh, Môn Phái...).
2.  `SPEC_THUAT_THUC` trong file `spec_thuat_thuc.md`: Thuật Thức (Võ Kỹ, Tâm Thuật, Linh Thuật, Nghi Thức, Khí Thuật, Ma Thuật, Ám Kỹ) — data model, acquisition flow, usage tracking, UI contract.
3.  `Spec_Equipment`: Hệ thống Item, Giáp Trụ (Kháng lực), Vũ Khí (Sát thương, Tính trạng vũ khí).
4.  `Spec_Status_Effects`: Các trạng thái bất lợi (Choáng váng, Xuất huyết, Loạn tâm, Định thân...).
5.  `Spec_Equipment` trong file `spec_equipment.md`: Hệ thống trang bị và vật phẩm (Vũ khí, giáp trụ, phòng cụ...).
6.  `SPEC_SECTS_AND_FACTIONS` trong file `spec_sects_and_factions.md`: Hệ thống về Hệ Phái và Môn Phái (thông tin môn phái, cơ chế khởi tạo, cơ chế thăng cấp...).
7. `SPEC_CHARACTER_PROGRESSION` trong file `spec_character_progression.md`: Hệ thống thăng tiến & nâng cấp nhân vật, đồng thời mô tả cách tính cost của các nâng cấp.
***

**Lệnh cho AI System:** Hãy lưu trữ cấu trúc Dữ Liệu và Logic Rule cơ bản này. Khi tôi cung cấp các module tiếp theo (ví dụ: Hệ Phái, Thuật Thức, Trang bị), hãy map chúng vào Data Model tương ứng đã được định nghĩa ở mục 3 và 5.