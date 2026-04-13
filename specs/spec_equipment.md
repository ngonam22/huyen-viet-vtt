Dưới đây là bản đặc tả kỹ thuật (Specification) định dạng Markdown cho module **Trang Bị (Vũ Khí & Giáp Trụ)** trong Huyền Việt RPG. Bản spec này liệt kê chi tiết các thuộc tính của vật phẩm (như Kiếm, Đao, Giáp, v.v.) và cách chúng tương tác, tác động trực tiếp đến chỉ số hoặc hành động của nhân vật (Character/Holder).

***

# SPEC_EQUIPMENT: HỆ THỐNG TRANG BỊ & VẬT PHẨM

## 1. DATA MODEL: VŨ KHÍ (Weapons - VD: Kiếm, Thương, Cung...)
Vũ khí đại diện cho công cụ tấn công của nhân vật, được chia thành Cận Chiến (Melee), Hình Thể (Unarmed) và Xạ Chiến (Ranged).

### 1.1. Các Thuộc Tính Cơ Bản (Base Attributes)
*   **`Tên` (Name):** Định danh vũ khí (VD: Trường Kiếm, Trảm Mã Đao, Rìu Chiến).
*   **`Phạm vi` (Range):** Khoảng cách tác dụng của vũ khí. Cận chiến thường là `1-bộ` hoặc `2-bộ`. Xạ chiến tính bằng khoảng cách bắn xa.
*   **`Sát thương` (Base Damage):** Chỉ số sát thương cơ bản vũ khí gây ra khi tấn công thành công (Dao: 3, Kiếm: 6, Đại Kiếm: 9).
*   **`Tính trạng` (Traits):** Mảng (Array) chứa các Tag đặc biệt định hình cách vũ khí hoạt động cơ học (Xem mục 3).

## 2. DATA MODEL: GIÁP TRỤ & PHÒNG CỤ (Armor/Defense - VD: Áo xích, Giáp sắt...)
*(Lưu ý: Các vật phẩm phòng thủ như Khiên/Giáp được gộp chung vào hệ thống Giáp Trụ)*.

### 2.1. Các Thuộc Tính Cơ Bản (Base Attributes)
*   **`Tên` (Name):** Định danh loại giáp (VD: Giáp da, Giáp toàn thân, Hộ tâm kính).
*   **`Kháng Lực` (Resistance/Armor):** Chỉ số giảm trừ sát thương vật lý trực tiếp. Khi bị tấn công, sát thương nhận vào sẽ trừ đi Kháng Lực trước khi trừ vào Khí Lực/Sức Lực của nhân vật (Dao găm sát thương 3 chém vào Giáp sắt Kháng lực 4 thì sẽ không mất máu).
*   **`Tính trạng` (Traits):** Mảng chứa các Tag đặc điểm của giáp trụ (Xem mục 3).

## 3. TÍNH TRẠNG VẬT PHẨM VÀ TÁC ĐỘNG ĐẾN NHÂN VẬT (Item Traits & Effects)
Các `Tính trạng` (Traits) là cốt lõi để vật phẩm tương tác với cơ chế game và chỉ số của người sở hữu (Holder).

### 3.1. Tính Trạng Thay Đổi Chỉ Số (Stat Modifiers)
*   **`Hai-tay` (2-handed):** Yêu cầu nhân vật dùng 2 tay. Cung cấp một buff cụ thể, thường là cộng thêm sát thương (VD: `Sát thương +2` cho Trường Kiếm, hoặc tăng phạm vi lên `+2-bộ`).
*   **`Cồng kềnh` (Bulky):** Thường xuất hiện ở Đại Kiếm, Giáp toàn thân. Tác động tiêu cực:
    *   Trừ trực tiếp `Tốc Độ -1` (Tốc độ tối thiểu không dưới 1-bộ).
    *   Nếu nhân vật có di chuyển trước đó trong cùng lượt, Độ Khó (ĐK) của hành động Công Kích bị tăng `+1`.
*   **`Hoành tráng` (Epic/Prestigious):** Trang bị lộng lẫy (như Lễ bào). Tác động xã hội: Khi nhân vật nhận thưởng điểm Danh Tiếng, nhân vật được cộng thêm `+0.1` tiểu cấp.

### 3.2. Tính Trạng Tương Tác Chiến Đấu (Combat Mechanics)
*   **`Sắc bén` (Sharp):** Đặc trưng của Kiếm, Đao. Nếu đòn đánh xuyên qua được Kháng Lực của giáp địch (không bị chặn hoàn toàn), đòn đánh đó sẽ gây thêm `+2 Sát thương`. Tuy nhiên, nếu bị chặn hoàn toàn bởi Kháng Lực, vũ khí có thể mất tính trạng này cho đến khi được mài lại.
*   **`Tù / Đập` (Blunt):** Đặc trưng của Chùy, Búa. Nếu người dùng tiêu hao `2 điểm Chí thành` (Critical points) khi tấn công, có thể ép giáp trụ của đối phương rơi vào trạng thái "Hư hại".
*   **`Cầm nã` (Grappling/Catching):** Đặc trưng của Giáo, Kích, Thiết Chỉ. Người dùng có thể tiêu hao `1+ điểm Chí thành` để khiến mục tiêu dính hiệu ứng bất lợi "Định thân" (Immobilized), với điều kiện Độ Cảnh Giác của mục tiêu bằng hoặc thấp hơn số điểm Chí thành đã dùng.

### 3.3. Tính Trạng Độ Bền & Hoàn Cảnh (Utility & Durability)
*   **`Bền bỉ` (Durable):** Trang bị khó hỏng. Khi chịu sát thương phá hủy, vật phẩm chỉ bị hạ cấp xuống trạng thái "Hư hại" thay vì "Phá hủy" (Broken).
*   **`Kín đáo` (Concealable):** Vũ khí nhỏ như Dao, Ám khí, Thiết Chỉ. Cho phép nhân vật dễ dàng giấu giếm, vượt qua các bài kiểm tra dò xét hoặc ngụy trang thành đồ vật thông thường.
*   **`Thường dụng` (Common):** Vật dụng hàng ngày, khi mang theo không gây chú ý hay ảnh hưởng đến độ Cảnh Giác của NPC.
*   **`Lễ trọng` (Ceremonial):** Có giá trị văn hóa cao, được dùng để thể hiện địa vị xã hội hoặc trong các nghi lễ.
*   **`Chiến nhu` (Military):** Vật phẩm chuyên dụng cho chiến tranh/quân đội.

## 4. CƠ CHẾ VẬN HÀNH TRONG SYSTEM (Pipeline Logic)

Khi **Nhân Vật A (Cầm Trường Kiếm)** Tấn công **Nhân Vật B (Mặc Giáp sắt)**, hệ thống sẽ chạy qua các bước:

1.  **Tính Sát Thương Đầu Ra (Output Damage):** `Base Damage` của Trường Kiếm (7) + `Tính trạng` nếu dùng 2 tay (+2) = 9 Sát thương.
2.  **Tính Kháng Lực Đầu Vào (Mitigation):** Giáp sắt cung cấp `Kháng Lực = 4`.
3.  **Áp dụng Tính Trạng (Trait Resolution):**
    *   Sát thương 9 trừ đi Kháng lực 4 = 5 Sát thương xuyên qua.
    *   Vì sát thương xuyên qua > 0, Trường Kiếm kích hoạt tính trạng `Sắc bén` -> Cộng thêm +2 Sát thương.
    *   **Tổng Sát Thương Thực Tế (Final Damage):** 7.
4.  **Trừ vào Chỉ Số Nhân Vật B (Stat Reduction):** Sát thương này sẽ trừ vào thanh `Sức Lực` của B. Nếu Sức Lực của B cạn kiệt (=0), sát thương sẽ ăn thẳng vào các thuộc tính Ngũ Hành (Hỏa, Thổ, Kim...).
5.  **Hy sinh Trang bị (Item Sacrifice Mechanics):** Nhân vật B có thể chủ động hy sinh Giáp sắt để đỡ thêm sát thương (bằng chỉ số Kháng lực), nhưng việc này sẽ ép Giáp sắt nhận trạng thái "Hư hại" (giảm vĩnh viễn -2 Kháng Lực cho đến khi được sửa chữa). Nếu Giáp đã bị "Hư hại" từ trước mà lại bị hy sinh, nó sẽ rơi vào trạng thái "Vỡ nát" và mất toàn bộ chỉ số.

## 5. CƠ CHẾ TỔN THƯƠNG VÀ HƯ HỎNG TRANG BỊ (Item Damage & Degradation)
Trang bị không phải là bất biến. Nhân vật có thể chủ động "hy sinh" giáp trụ hoặc vũ khí đễ đỡ đòn sát mạng. Khi đó vật phẩm sẽ rơi vào trạng thái hỏng hóc.

### 5.1. Các Trạng Thái Của Trang Bị
*   **Bình thường (Normal):** Trang bị hoạt động với đầy đủ chỉ số.
*   **Hư hại (Damaged):** Trang bị bị giảm vĩnh viễn **-2 Kháng Lực** (đối với Giáp) hoặc mất một số tính năng nhất định (đối với Vũ khí). Trạng thái này là vĩnh viễn đến khi được sửa chữa.
*   **Vỡ nát (Broken):** Trang bị mất hoàn toàn tác dụng. Không thể sử dụng và không còn cung cấp bất kỳ chỉ số nào. Trạng thái này xảy ra khi một trang bị đã "Hư hại" lại tiếp tục bị hy sinh (hoặc trúng kỹ năng bạo phá vũ khí).

