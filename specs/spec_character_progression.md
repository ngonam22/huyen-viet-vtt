
# SPEC_CHARACTER_PROGRESSION: HỆ THỐNG THĂNG TIẾN & NÂNG CẤP NHÂN VẬT

## 1. TỔNG QUAN (Overview)
Trong Huyền Việt RPG, điểm kinh nghiệm (còn gọi là `Tu Vi` hoặc `Lãnh Ngộ`) là đơn vị tiền tệ duy nhất dùng để phát triển nhân vật. Người chơi có thể tiêu hao Điểm Kinh Nghiệm (XP) để mua cấp độ mới cho 3 nhánh trực tiếp: **Hành (Attributes), Kỹ Năng (Skills), và Thuật Thức (Techniques)**. 

Bên cạnh đó, có một nhánh thăng cấp gián tiếp là **Đặc Kỹ Môn Phái (Sect Special Techniques)** hoạt động dựa trên tổng lượng XP tích lũy (không tiêu hao).

## 2. DATA MODEL (Các biến cần theo dõi)

### 2.1. Trường XP (`system.progression`)
Được lưu trong `CharacterSchema.progression`:
*   `currentXp` (Integer): Điểm kinh nghiệm hiện tại có thể dùng để đem đi "mua/nâng cấp". Sẽ bị trừ đi khi user thực hiện upgrade.
*   `totalXp` (Integer): Tổng số điểm kinh nghiệm nhân vật từng nhận được từ đầu game. **Biến này chỉ tăng, không bao giờ giảm**. Nó dùng để làm mốc check thăng cấp Đặc Kỹ Môn Phái.

### 2.2. Active Modifiers (`system.upgrades`)
Mảng `AppliedUpgrade[]` lưu các nâng cấp XP đã mua (Hành, Kỹ Năng) dưới dạng rule. Được tiêu thụ bởi `recalculateCharacterStats()` trong mỗi lần tính lại chỉ số. Các bonus từ Item (Thị Tộc, Bối Cảnh, Gia Cảnh) **không** lưu ở đây — chúng sống trên Item document riêng.

### 2.3. Changelog (`system.changelog`)
Mảng append-only ghi lại mọi thay đổi của nhân vật theo thứ tự thời gian. Dùng để hiển thị timeline lịch sử trong UI. **Không dùng để tính toán** — chỉ dùng để đọc/hiển thị.

Mỗi entry có dạng:
```json
{
  "id":        "<uuid>",
  "type":      "element_upgrade | skill_upgrade | technique_learned | xp_gain | identity_change",
  "timestamp": 1234567890,
  "label":     "Hỏa: 2 → 3",
  "field":     "elements.hoa",
  "from":      2,
  "to":        3,
  "xpCost":    9
}
```

| `type` | Khi nào ghi | `xpCost` |
|---|---|---|
| `element_upgrade` | Nâng cấp một Ngũ Hành bằng XP | 3 × cấp mới |
| `skill_upgrade` | Nâng cấp một Kỹ Năng bằng XP | 2 × cấp mới |
| `technique_learned` | Học một Thuật Thức mới | 3 |
| `xp_gain` | GM trao XP | 0 |
| `identity_change` | Đổi thiToc / boiCanh / monPhai / giaCanh / giaToc | 0 |

---

## 3. LOGIC NÂNG CẤP TRỰC TIẾP VÀ BẢNG GIÁ (Direct Upgrades)

### 3.1. Nhánh Nâng Cấp Ngũ Hành (Hành Phương)
Nâng cấp các chỉ số cốt lõi: Hỏa, Thổ, Kim, Thủy, Mộc. (Giới hạn cho người phàm: Tối đa Cấp 5).
*   **Công thức chi phí:** `Cost = 3 * Target_Level` (3 điểm XP nhân với Cấp bậc mục tiêu).
*   **Bảng giá chi tiết:**
    *   Từ Cấp 1 lên Cấp 2: Tốn **6 XP** (Tổng XP từ 0: 9)
    *   Từ Cấp 2 lên Cấp 3: Tốn **9 XP** (Tổng XP từ 0: 18)
    *   Từ Cấp 3 lên Cấp 4: Tốn **12 XP** (Tổng XP từ 0: 30)
    *   Từ Cấp 4 lên Cấp 5: Tốn **15 XP** (Tổng XP từ 0: 45)
*   **⚠️ Side Effect Logic (Quan trọng):** Bất cứ khi nào một `Hành` được upgrade thành công, Dev/AI **phải trigger hàm tính toán lại toàn bộ chỉ số dẫn xuất (Derived Stats)** bao gồm: `Sức Lực`, `Tâm Lực`, `Cảnh Giác`, `Chú Tâm`, `Tốc Độ`, và `Ngũ Hợp` (Xem chi tiết công thức ở file Spec Core Mechanics).

### 3.2. Nhánh Nâng Cấp Kỹ Năng (Ngũ Đại Quốc Đạo)
Nâng cấp các kỹ năng nghề nghiệp/chiến đấu như Thể Thuật, Y Thuật, Binh Pháp... (Giới hạn: Tối đa Cấp 5).
*   **Công thức chi phí:** `Cost = 2 * Target_Level` (2 điểm XP nhân với Cấp bậc mục tiêu).
*   **Bảng giá chi tiết:**
    *   Từ Cấp 1 lên Cấp 2: Tốn **4 XP** (Tổng XP từ 0: 6)
    *   Từ Cấp 2 lên Cấp 3: Tốn **6 XP** (Tổng XP từ 0: 12)
    *   Từ Cấp 3 lên Cấp 4: Tốn **8 XP** (Tổng XP từ 0: 20)
    *   Từ Cấp 4 lên Cấp 5: Tốn **10 XP** (Tổng XP từ 0: 30)

### 3.3. Nhánh Học Luyện Thuật Thức
Mua thêm các chiêu thức, phép thuật (Võ Kỹ, Linh Thuật, Khí Thuật, Tâm Thuật...).
*   **Công thức chi phí:** Đồng giá **3 XP** cho mỗi Thuật Thức mới được học.
*   **Điều kiện (Prerequisites check):** Khi mua Thuật Thức, hệ thống phải check xem nhân vật có đủ cấp độ Hành hoặc cấp độ Kỹ năng mà Thuật Thức đó yêu cầu hay không. Đây là **HARD CHECK** cho XP path (xem `spec_thuat_thuc.md` §7.2); clan auto-grant và manual picker bỏ qua hoặc chỉ warn.
*   **Data model, usage tracking (Tần Số Sử Dụng), acquisition flow, UI contract:** tham chiếu `spec_thuat_thuc.md`. XP purchase UI hiện đang deferred (spec §8.3) — clan auto-grant (§8.1) và manual picker (§8.2) đã được implement trước.

---

## 4. LOGIC THĂNG CẤP GIÁN TIẾP: ĐẶC KỸ MÔN PHÁI (Auto-Leveling)
Nhánh này **không tốn XP** để mua. Nó hoạt động như một hệ thống auto-check dựa trên `system.progression.totalXp`.

### 4.1. Ngưỡng Kích Hoạt (Trigger Thresholds)
*(Lưu ý cho Dev: Dựa theo rule book, có một số khoảng bị lấp mép (ví dụ 50-90 và 80-140), hãy code logic boundary theo dạng `>=` và `<` như sau để tránh bug):*
*   **Cấp 1:** `totalXp` < 20
*   **Cấp 2:** 20 <= `totalXp` < 50
*   **Cấp 3:** 50 <= `totalXp` < 90
*   **Cấp 4:** 90 <= `totalXp` < 140 *(Fix logic gap)*
*   **Cấp 5:** 140 <= `totalXp` <= 200
*   **Cấp 6:** `totalXp` > 200

### 4.2. Logic Điều Kiện Kép (Two-Step Verification)
Mỗi khi người chơi nhận thêm XP khiến `totalXp` chạm một Threshold mới (VD: Vừa chạm mốc 50 XP để xét lên Cấp 3), hệ thống sẽ chạy hàm `Check_Sect_Upgrade()`:
1.  **Check Ngưỡng XP:** PASS.
2.  **Check Chuyên Môn:** Query vào Database Môn Phái xem để lên Cấp 3, môn phái này yêu cầu nhân vật phải có kỹ năng gì ở mức bao nhiêu (VD: Yêu cầu Y Thuật = 4).
    *   Nếu `Character.Skills["Y Thuật"] >= 4` -> **PASS**. Tự động nâng cấp Đặc Kỹ Môn Phái lên Cấp 3.
    *   Nếu `Character.Skills["Y Thuật"] < 4` -> **FAIL**. Trạng thái Đặc Kỹ bị giữ ở Cấp 2 (Pending). Hệ thống sẽ auto-check lại điều kiện này mỗi khi người chơi upgrade Kỹ năng ở Mục 3.2.

---

## 5. SYSTEM PIPELINE (Luồng xử lý giả mã cho Backend/AI)

Khi nhận được Request: `Upgrade(entity_type, entity_id, target_level)`

1. Xác định chi phí (Calculate Cost) dựa vào loại nâng cấp: Hành, kỹ năng, thuật thức.
2. Validate khả năng thanh toán (Validate Currency)
3. Thực hiện giao dịch (Execute Transaction)
4. Trigger Check Đặc Kỹ Môn Phái (Auto-Level Check) - Việc mua Kỹ năng có thể đã thỏa mãn điều kiện Pending của Môn phái

**Ghi chú cho AI:** File Spec này là bản hoàn thiện về logic Kinh nghiệm và Thăng cấp. Hãy sử dụng chính xác các công thức nhân (x2, x3) cho Chi phí nâng cấp và lưu ý sự khác biệt cơ bản giữa `system.progression.currentXp` (dùng để tiêu) và `system.progression.totalXp` (dùng để xét hạng Môn Phái). Mọi thay đổi nhân vật phải được ghi vào `system.changelog` — xem mục 2.3.