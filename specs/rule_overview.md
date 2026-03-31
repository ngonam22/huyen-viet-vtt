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
Đại diện cho "phương pháp hành động" (Hành phương) từ 1 đến 5.
*   `Hỏa` (Sáng tạo, áp đảo, bộc trực).
*   `Thổ` (Bảo thủ, kiên định, chống chịu).
*   `Kim` (Kỷ luật, tinh luyện, hư chiêu).
*   `Thủy` (Trực giác, vô chiêu, linh hoạt).
*   `Mộc` (Thăng hoa, biến chiêu, cảm hóa).

### 3.2. Chỉ Số Dẫn Xuất (Derived Stats - Ngũ Hành Phát Nguyên)
Các chỉ số sinh lý/chiến đấu được tính toán tự động từ Ngũ Hành:
*   `Sức Lực (HP/Stamina)` = `5 + (Mộc + Hỏa + Thổ)`. Đây là giá trị **tối đa** (`base`). Giá trị hiện tại (`value`) bị giảm khi nhận sát thương và được lưu riêng — không bị ghi đè bởi công thức.
*   `Tâm Lực (Mental/Sanity)` = `Thổ + Kim + Thủy`. Đây là giá trị **tối đa** (`base`). Giá trị hiện tại (`value`) bị giảm khi người chơi tiêu hao (Khi = 0 sẽ rơi vào trạng thái "Loạn Tâm", phải "Phát Tiết" để phục hồi).
*   `Cảnh Giác (Passive Defense)` = `Math.ceil((Hỏa + Thổ + Kim) / 3)`.
*   `Chú Tâm (Initiative)` = `Kim + Thủy + Mộc`.
*   `Tốc Độ (Speed - in "bộ")` = `(Thủy + Mộc + Hỏa) / 3`.
*   `Ngũ Hợp (Meta Currency/Fate)` = `Min(Sức Lực.base, Tâm Lực.base, Cảnh Giác, Chú Tâm, Tốc Độ)`. Sử dụng giá trị **tối đa** của Sức Lực và Tâm Lực, không phải giá trị hiện tại.

### 3.3. Kỹ Năng (Skills - Ngũ Đại Quốc Đạo)
Chấm điểm từ 1-5, chia làm 5 nhóm:
1.  **Võ Đạo:** Thể Thuật, Võ Thuật, Binh Pháp, Lãnh Đạo.
2.  **Văn Đạo:** Lễ Đạo, Xã Hội Học, Chính Trị Học, Văn Tự.
3.  **Nghệ Đạo:** Mỹ Thuật, Thời Trang, Rèn Đúc, Biểu Diễn.
4.  **Tu Đạo:** Thần Học, Y Học, Thiền Định, Tâm Ý.
5.  **Sinh/Hắc Đạo:** Lao Động, Thương Nghiệp, Hải Nghiệp, Sinh Tồn, Hắc Nghiệp.

### 3.4. Metadata & Narrative Tags
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
Khi một Entity bị tấn công, engine xử lý theo thứ tự:
1.  **Armor Mitigation:** `Sát Thương` - `Kháng Lực` (Armor).
2.  **HP Mitigation:** Sát Thương dư trừ vào `Sức Lực` (Khí lực).
3.  **Core Damage (Tổn thương Ngũ Hành):** Nếu Sức Lực cạn (0), sát thương tác động trực tiếp lên Ngũ Hành. Tổn thương Hành sẽ kích hoạt debuff cho Hành đó (+2 ĐK) và buff Hành bị khắc (-1 ĐK).

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

## 8. KIẾN TRÚC SỮ LIỆU ĐÍNH KÈM SẮP TỚI (Upcoming Detailed Specs)
*(Ghi chú cho AI: Các spec file chi tiết sẽ được cung cấp ở các bước tiếp theo)*
1.  `Spec_Character_Creation`: Quy trình 8 bước tạo nhân vật (Bối Cảnh, Gia Cảnh, Môn Phái...).
2.  `Spec_Techniques_Magic`: Thuật Thức (Võ Kỹ, Chủ Thuật, Linh Thuật, Khí Thuật, Ma Thuật).
3.  `Spec_Equipment`: Hệ thống Item, Giáp Trụ (Kháng lực), Vũ Khí (Sát thương, Tính trạng vũ khí).
4.  `Spec_Status_Effects`: Các trạng thái bất lợi (Choáng váng, Xuất huyết, Loạn tâm, Định thân...).
5.  `Spec_Equipment` trong file `spec_equipment.md`: Hệ thống trang bị và vật phẩm (Vũ khí, giáp trụ, phòng cụ...).
***

**Lệnh cho AI System:** Hãy lưu trữ cấu trúc Dữ Liệu và Logic Rule cơ bản này. Khi tôi cung cấp các module tiếp theo (ví dụ: Hệ Phái, Thuật Thức, Trang bị), hãy map chúng vào Data Model tương ứng đã được định nghĩa ở mục 3 và 5.