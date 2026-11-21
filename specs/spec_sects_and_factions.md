
# SPEC_SECTS_AND_FACTIONS: HỆ PHÁI & MÔN PHÁI

## 1. TỔNG QUAN (High-Level Overview)
Trong Huyền Việt RPG, **Môn Phái** đóng vai trò là cơ sở đào tạo của các Gia Tộc/Thế Lực, nhằm huấn luyện và trang bị kỹ năng cho thành viên thực thi trách nhiệm xã hội. 

Về mặt cốt truyện và định hướng nhân vật, Môn Phái sẽ phân loại nhân vật vào một trong **6 Đại Thể Hệ Chính** (Archetypes) của Đế quốc Đại Việt:
1.  **Võ Sĩ:** Giới chiến binh bảo vệ trật tự và lãnh thổ.
2.  **Văn Sĩ:** Quan lại, học giả điều hành kinh tế, xã hội, chính trị.
3.  **Nghệ Sư (Chức Nhân/Sĩ):** Lực lượng nòng cốt xây dựng cơ sở hạ tầng, kinh tế và phát triển văn hóa nghệ thuật.
4.  **Pháp Sư:** Người giao tiếp với Khí Linh bằng Linh Ngữ để thi triển pháp thuật, đối phó thế lực siêu nhiên.
5.  **Tu Hành Giả:** Ẩn sĩ tu luyện nội khí, mượn sức mạnh từ bên trong thay vì bên ngoài để đạt cảnh giới phi thường.
6.  **Thích Khách:** Hệ phái ẩn hoạt động trong bóng tối.

## 2. DATA MODEL: THỰC THỂ MÔN PHÁI (Sect Entity)
Một Object `Môn Phái` trong Database sẽ bao gồm các trường dữ liệu (Fields) cốt lõi sau:
*   **`Tên Phái` (Sect Name):** Định danh của tổ chức (VD: Tịnh Lý Y Sư).
*   **`Phân Loại` (Category):** Thuộc nhóm `Thập Nhị Chính Quy` (12 Học viện quốc gia) hoặc `Giang Hồ Bách Đạo` (Thế lực phi chính quy).
*   **`Hành Cộng Thêm` (Bonus Elements):** Player tự chọn 2 Hành khác nhau (bất kỳ trong Ngũ Hành) để tăng +1 mỗi hành. Không cố định theo phái — phái chỉ cung cấp quyền chọn, không chỉ định Hành cụ thể. Trong engine, field `upgrade` của `MonPhai` mã hóa điều này bằng `{ target: 'element', choose: 2, effects: [tất cả 5 hành] }`.
*   **`Kỹ Năng Cộng Thêm` (Bonus Skills):** Danh sách 3 đến 5 Kỹ năng được +1 điểm.
*   **`Giáo Trình` (Curriculum):** Danh sách **phân hệ** Thuật Thức (VD: Võ Kỹ, Kỳ Nghệ, Nghi Thức) mà Hệ Phái mở cho thành viên học bằng Tu Vi, giới hạn cấp Thuật Thức ≤ Cấp Bậc Hệ Phái. Engine: field `curriculum` (xem §5.3, `spec_thuat_thuc.md` §8.3).
*   **`Thuật Thức Đặc Quyền` (Privileges):** Thuật Thức / phân hệ mở thêm theo từng bậc, cộng dồn, bỏ qua Giáo Trình và giới hạn cấp. Engine: field `privileges`.
*   **`Thuật Thức Nhập Môn` (Starter):** Thuật Thức miễn phí lúc tạo nhân vật. Hiện engine chỉ gắn lên Thị Tộc (`starterTechniques: string[]` trong `THI_TOC`), chưa có cho Hệ Phái — chi tiết `spec_thuat_thuc.md` §8.1.
*   **`Đặc Kỹ Môn Phái` (Sect Special Technique - ĐKMP):** Kỹ năng nội tại/Kích hoạt độc quyền của phái. Cơ chế của ĐKMP luôn scale (tăng tiến) theo `Cấp Bậc Môn Phái` do đó từ `Cấp Bậc Môn Phái` có thể suy ra cấp Đặc kỹ Môn Phái, về mặt hệ thống có thể coi chúng là một. 

## 3. GAME RULES: CƠ CHẾ KHỞI TẠO (Character Creation Affect)
Khi Player chọn Môn Phái ở Bước 4 của quá trình Khởi Tạo Nhân Vật, hệ thống sẽ apply các thay đổi sau lên Character Entity:
1.  Player chọn `+1` vào 2 chỉ số Ngũ Hành khác nhau.
2.  Player chọn 3 Kỹ Năng khác biệt **bất kỳ** (không trùng Kỹ Năng Bổ Sung của phái) để `+1`.
3.  Player nhận các Thuật Thức nhập môn (miễn phí, không tốn XP). *(Chưa implement cho Hệ Phái — bước "Thuật Thức" của Bát Bộ Thành Nhân chưa có logic.)*
4.  Nhân vật nhận được **Đặc Kỹ Môn Phái** khởi điểm ở **Cấp 1** tương đương với **Cấp Bậc Môn Phái** là 1
5.  Cấp phát **Trang bị khởi đầu** tương ứng với môn phái.


## 4. GAME RULES: CƠ CHẾ THĂNG CẤP (Progression Rules) - ⚠️ LƯU Ý ĐẶC BIỆT
Đây là một **System Rule** cực kỳ quan trọng cần lưu ý khi code hệ thống Leveling:

*   **KHÔNG THỂ MUA TRỰC TIẾP BẰNG XP:** Người chơi **không thể và không cần** trực tiếp dùng Điểm Kinh Nghiệm (Tu Vi) để nâng cấp Đặc Kỹ Môn Phái. 
*   **TỰ ĐỘNG THĂNG CẤP (Auto-Leveling & Auto-Check):** Đặc Kỹ Môn Phái sẽ tự động tăng cấp khi thỏa mãn **đồng thời 2 điều kiện**:
    1.  **Tổng Tu Vi tích lũy (`totalXp`):** Tổng Tu Vi nhân vật từng **nhận được** (đã tiêu vẫn tính) chạm ngưỡng của cấp bậc đó.
    2.  **Điều Kiện Tiến Cấp:** Kỹ Năng tiến cấp của phái đạt ≥ bậc mục tiêu (Ví dụ: Tịnh Lý Y Sư ghi "Y Dược bậc 2" → cần `yDuoc ≥ 2` để lên Cấp 2). Bậc 6 rulebook không ghi điều kiện kỹ năng → chỉ cần đủ Tu Vi. Minh Hạo Nghệ Sư: chỉ cần **một** kỹ năng Nghệ Đạo bất kỳ đạt bậc (`progressionReqsMode: 'any'`).
*   **LUỒNG XỬ LÝ (Logic Flow):** Khi tổng XP tích lũy của người chơi bước vào một ngưỡng cấp bậc mới, hệ thống sẽ **tự động kiểm tra (auto-check)** điều kiện chuyên môn:
    *   **Kiểm tra lần lượt từng bậc** từ cấp hiện tại + 1 tới cấp mà `totalXp` cho phép; dừng ở bậc đầu tiên FAIL (không nhảy bậc).
    *   **Nếu PASS (Thỏa mãn yêu cầu):** Đặc Kỹ Môn Phái ngay lập tức tự động lên cấp.
    *   **Nếu FAIL (Chưa thỏa mãn yêu cầu):** Đặc Kỹ Môn Phái giữ nguyên cấp độ hiện tại. Hệ thống sẽ duy trì trạng thái chờ (pending check) ở cấp độ đó. Bất cứ khi nào người chơi dùng XP để mua đúng các kỹ năng bị thiếu khiến điều kiện chuyển sang PASS, Đặc Kỹ sẽ lập tức được tự động thăng cấp.
*   **Ngưỡng XP Thăng Cấp Môn Phái (Dùng để trigger Check):**
    *   **Cấp 1:** Mặc định (Dưới 20 XP).
    *   **Cấp 2:** Trigger check khi đạt 20 - 50 XP.
    *   **Cấp 3:** Trigger check khi đạt 50 - 90 XP.
    *   **Cấp 4:** Trigger check khi đạt 80 - 140 XP *(engine dùng mốc 90 để tránh chồng lấn — xem `spec_character_progression.md` §4.1)*.
    *   **Cấp 5:** Trigger check khi đạt 140 - 200 XP.
    *   **Cấp 6:** Trigger check khi Trên 200 XP.

## 5. THIẾT LẬP CHI TIẾT CÁC MÔN PHÁI (Detailed Sect Mechanics)

Dưới đây là mapping chi tiết cách `Đặc Kỹ Môn Phái` tương tác với Game Engine dựa trên `Cấp Bậc Môn Phái` (Sect Level). Khi code logic combat hoặc skill check, cần refer đến các biến số này:

### 5.1. Nhóm Thập Nhị Chính Quy (12 Học Viện Quốc Gia)

*   **Tịnh Lý Y Sư (Nghệ Sư/Y Sư)**
    *   `Bonus`: chọn 2 chỉ số Ngũ Hành khác nhau để tăng thêm 1.
    *   `Giáo Trình`: Võ Kỹ, Kỳ Nghệ, Nghi Thức (xem §5.3)
    *   `ĐKMP - Tịnh Lý Y Thuật`: Khi test kỹ năng *Y Thuật*, có thể đổi xúc xắc mặt Thái Cực (Cân bằng) thành Thiếu Âm (Thất bại) hoặc Thiếu Dương (Thành công). **Số lượng tối đa = Cấp Bậc Môn Phái**.

*   **Sanh Cửu Lãnh Quân (Võ Sĩ)**
    *   `Bonus`: chọn 2 chỉ số Ngũ Hành khác nhau để tăng thêm 1.
    *   `Giáo Trình`: Võ Kỹ, Tâm Thuật, Nghi Thức (xem §5.3)
    *   `ĐKMP - Sanh Cửu Binh Pháp`: Khi Tấn Công/Hỗ Trợ thành công, hồi Tâm Lực. **Tối đa hồi = Cấp Bậc Môn Phái**. Có thể đổi 1 Sức Lực lấy 1 điểm Chí Thành (Critical).

*   **Dương Tần Phục Ma Sư (Võ Sĩ/Pháp Sư)**
    *   `Yêu Cầu`: Linh Căn cấp 1
    *   `Bonus`: chọn 2 chỉ số Ngũ Hành khác nhau để tăng thêm 1.
    *   `Giáo Trình`: Võ Kỹ, Linh Thuật, Nghi Thức (xem §5.3)
    *   `ĐKMP - Dương Tần Phục Ma Pháp`: 1 lần/vòng, khi test năng lực lên mục tiêu có tag `Ma tính`, được phép chuyển xúc xắc Thiếu Âm thành Thiếu Dương. **Số lượng tối đa = (Logic cần xác định theo rule phụ, thường liên kết với level)**.

*   **Minh Hạo Nghệ Sư (Nghệ Sư)**
    *   `Bonus`: chọn 2 chỉ số Ngũ Hành khác nhau để tăng thêm 1.v
    *   `Giáo Trình`: Kỳ Nghệ, Tâm Thuật, Nghi Thức (xem §5.3)
    *   `ĐKMP - Minh Hạo Thuần Nghệ`: 1 lần/cảnh, sau khi test thành công kỹ năng nhóm Nghệ Đạo, chọn số lượng mục tiêu **tối đa = Cấp bậc Môn Phái**. Hồi cho họ 3 Tâm Lực hoặc điểm Kỹ năng.

*   **Thường Liên Linh Sĩ (Pháp Sư)**
    *   `Bonus`: chọn 2 chỉ số Ngũ Hành khác nhau để tăng thêm 1.
    *   `Giáo Trình`: Linh Thuật, Tâm Thuật, Nghi Thức (xem §5.3)
    *   `ĐKMP - Thường Liên Linh Pháp`: 1 lần/cảnh, khi test kích hoạt Linh Thuật (Phép thuật), **giảm Độ Khó (ĐK) = Cấp bậc Môn Phái**.

*   **Tiên Vị Thương Sĩ**
    *   `Bonus`: chọn 2 chỉ số Ngũ Hành khác nhau để tăng thêm 1.
    *   `Giáo Trình`: Võ Kỹ, Tâm Thuật, Nghi Thức (xem §5.3)
    *   `ĐKMP - Tiên Vị Thương Hội`: Thêm 1 Chí Thành cho mỗi `2-bộ` khoảng cách di chuyển. Khi cưỡi ngựa, cự ly di chuyển được tính bằng **Gấp đôi Cấp bậc Môn Phái**.

*   **Nghị Võ Kỵ Sĩ**
    *   `Bonus`: chọn 2 chỉ số Ngũ Hành khác nhau để tăng thêm 1.
    *   `Giáo Trình`: Võ Kỹ, Tâm Thuật (xem §5.3)
    *   `ĐKMP - Nghị Võ Kỵ Phong`: Thêm 1 Chí Thành cho mỗi `2-bộ` khoảng cách di chuyển. Khi cưỡi ngựa, cự ly di chuyển được tính bằng **Gấp đôi Cấp bậc Môn Phái**.

*   **Sơn Vị Thiết Tượng**
    *   `Bonus`: chọn 2 chỉ số Ngũ Hành khác nhau để tăng thêm 1.
    *   `Giáo Trình`: Kỳ Nghệ, Võ Kỹ, Nghi Thức (xem §5.3)
    *   `ĐKMP - Sơn Vị Thiết Đoán Kỹ`: 1 lần/cảnh, khi chế tác/sửa vũ khí giáp trụ, cho phép gieo lại số lượng xúc xắc **bằng Cấp bậc Môn Phái**.

*   **Thi Hân Thám Lâm Quân (Võ Sĩ)**
    *   `Yêu Cầu`: Linh Căn cấp 1
    *   `Bonus`: chọn 2 chỉ số Ngũ Hành khác nhau để tăng thêm 1
    *   `Giáo Trình`: Linh Thuật, Tâm Thuật, Nghi Thức (xem §5.3)
    *   `ĐKMP - Thi Hân Thám Linh Đồng:`: Đối với yêu tộc, tăng Cảnh Giác của nhân vật một lượng bằng với cấp bậc Môn Phái. Ngoài ra, khi thực hiện xét năng lượng để điều tra, hoặc Chủ Động trong cảnh Xung Đột với yêu tộc, thêm một lượng chí thành bằng với cấp bậc Môn Phái.

*   **Diên Hậu Chính Sĩ (Văn Sĩ)**
    *   `Bonus`: chọn 2 chỉ số Ngũ Hành khác nhau để tăng thêm 1.
    *   `Giáo Trình`: Tâm Thuật, Võ Kỹ, Nghi Thức (xem §5.3)
    *   `ĐKMP - Mãn Ý Mặc Ngôn`: 1 lần/cảnh, khi test thuyết phục bằng ngôn từ, được cộng thẳng số lượng điểm Chí Thành **bằng Cấp bậc Môn Phái** (bất kể test thành công hay thất bại).

*   **Tuyết Luật Thám Tử (Võ/Văn Sĩ)**
    *   `Bonus`: chọn 2 chỉ số Ngũ Hành khác nhau để tăng thêm 1.
    *   `Giáo Trình`: Võ Kỹ, Tâm Thuật (xem §5.3)
    *   `Thuật Thức`: (Võ Kỹ): Tiên Đấu Thám Lược; (Tâm Thuật): Độc Tâm Thuật
    *   `ĐKMP - Biện Chứng Thám Đạo`: Khi điều tra, **thay thế cấp Kỹ năng bằng Cấp bậc Môn Phái**.
    *   `ĐKMP Phụ - Thám Tâm Tinh Đồng`: Lưu trữ số lượng xúc xắc **tối đa = Cấp bậc Môn Phái** để dùng cho lần test sau.

*   **Hạo Giới Hùng Binh (Võ Sĩ)**
    *   `Bonus`: chọn 2 chỉ số Ngũ Hành khác nhau để tăng thêm 1.
    *   `Giáo Trình`: Võ Kỹ, Tâm Thuật (xem §5.3)
    *   `Thuật Thức`: 2 Võ Kỹ cấp-1
    *   `ĐKMP - Hạo Giới Nộ Khí`: Khi nhận Sát Lực hoặc Phát Tiết, tiến vào trạng thái `Cuồng Nộ` và hồi phục Sức Lực = **Cấp bậc Môn Phái + Cấp Thể Lực**.

### 5.2. Nhóm Giang Hồ Bách Đạo (Cộng Đồng Phi Chính Quy)
Đây là các phái không thuộc quản lý của nhà nước, thường có bộ bonus đa dạng hơn để phục vụ kỹ năng Sinh Tồn và Hắc Đạo:
*   **Lãng Khách Đường:** Được chọn Võ Kỹ và Tâm Thuật tự do.
*   **Thanh Phong Đoàn:** +1 Kim, +1 Mộc. Phái của lính đánh thuê/cướp.
*   **Tầm Bảo Thương Hội:** +1 Thủy, +1 Mộc. Chuyên về khảo sát và sinh tồn.
*   **Hồng Điệp Lâu:** +1 Kim, +1 Mộc. Mạng lưới sát thủ/thông tin, có thuật Tiềm Hành (tàng hình).
*   **Địa Linh Sư:** Tu tập pháp thuật tâm linh, bói toán.
*   **Lịch Thế Hành Giả:** +1 Hành tự chọn, +1 Hành khác. Tập trung vào Tu Đạo và Khí Thuật.

### 5.3. Dữ liệu Engine: Giáo Trình, Điều Kiện Tiến Cấp, Đặc Quyền (rulebook v0.8.4)

Nguồn: `module/helpers/config/he-phai.ts`. Điều kiện tiến cấp: lên bậc N (2–5) cần Kỹ Năng tiến cấp ≥ N; bậc 6 chỉ cần Tu Vi.

| Hệ Phái (id) | Giáo Trình (`curriculum`) | Kỹ Năng tiến cấp | Đặc Quyền (`privileges`) |
|---|---|---|---|
| Tịnh Lý Y Sư (`tinhLyYSu`) | Võ Kỹ, Kỳ Nghệ, Nghi Thức | Y Dược | B1: Tâm Thuật ≤1, Điều Dưỡng · B3: Tâm Thuật ≤3 |
| Sanh Cửu Lãnh Quân (`sanhCuuLanhQuan`) | Võ Kỹ, Tâm Thuật, Nghi Thức | Binh Pháp | B1: Tâm Thuật ≤2 · B2: ≤3 · B3: ≤4 · B4: ≤5 |
| Dương Tần Phục Ma Sư (`duongTanPhucMaSu`) | Võ Kỹ, Linh Thuật, Nghi Thức | Thần Học | B1: Phổ Quang Hỏa Giáp Thuật, Trấn Ma Phong Tà Thuật · B2: Tâm Thuật ≤1 · B4: Tâm Thuật ≤2 |
| Minh Hạo Nghệ Sư (`minhHaoNgheSu`) | Kỳ Nghệ, Tâm Thuật, Nghi Thức | 1 trong Mỹ Thuật / Thời Trang / Biểu Diễn / Rèn Đúc (`any`) | — |
| Thường Liên Linh Sĩ (`thuongLienLinhSi`) | Linh Thuật, Tâm Thuật, Nghi Thức | Thần Học | — |
| Tiên Vị Thương Sĩ (`tienViThuongSi`) | Võ Kỹ, Tâm Thuật, Nghi Thức | Thương Nghiệp | — |
| Nghị Võ Kỵ Sĩ (`nghiVoKySi`) | Võ Kỹ, Tâm Thuật | Sinh Tồn | — |
| Thùy Minh Thiết Tượng (`thuyMinhThietTuong`) | Kỳ Nghệ, Võ Kỹ, Nghi Thức | Rèn Đúc | — |
| Thi Huân Thám Lâm Quân (`thiHuanThamLamQuan`) | Linh Thuật, Tâm Thuật, Nghi Thức | Thần Học | — |
| Diên Hậu Chính Sĩ (`dienHauChinhSi`) | Tâm Thuật, Võ Kỹ, Nghi Thức | Chính Trị | — |
| Tuyết Luật Thám Tử (`tuyetLuatThamTu`) | Võ Kỹ, Tâm Thuật | Văn Tự | — |
| Hạo Giới Hùng Sĩ (`haoGioiHungSi`) | Võ Kỹ, Tâm Thuật | Thể Thuật | — |

**Đặc Quyền chưa áp dụng** (trỏ tới Thuật Thức cấp ≥3, chưa có trong catalog — để comment trong code): Tịnh Lý B2 (Cường Thể, Trí Dụng Chi Minh — Cấp-3), B4 (Phục Thể — Cấp-5); Dương Tần B3 (Xích Lôi Thuật — Cấp-4), B4 (Xích Lôi Thiên Hỏa Hóa Khí Đại Thuật — Cấp-5).

Giang Hồ Bách Đạo chưa có trong `HE_PHAI`.

***

**⚠️ SYSTEM ARCHITECTURE NOTE FOR DEV/AI:**

Dữ liệu 12 Hệ Phái lưu tại `module/helpers/config/he-phai.ts` dưới biến `HE_PHAI`; type ở `types/hePhai.d.ts`. Trường `system.identity.monPhai` nhận id Hệ Phái, ví dụ `"tinhLyYSu"`. Cấp Hệ Phái lưu ở `system.attributes.level.value`.

Các property phục vụ game logic:

1. **`upgrade: UpgradeRule[]`** — bonus lúc Khởi Tạo Nhân Vật (cùng interface với `ThiToc` / `BoiCanh`): "chọn 2 Hành bất kỳ để +1":
```typescript
upgrade: [{ target: 'element', choose: 2, mode: 'add', effects: [/* 5 hành */] }]
```

2. **`progressionReqs: Record<number, HePhaiLevelRequirement>`** (`Partial<Record<HvSkillKey, number>>`) + **`progressionReqsMode?: 'all' | 'any'`** (mặc định `'all'`) — Điều Kiện Tiến Cấp theo bậc. Ví dụ `tinhLyYSu`:
```typescript
progressionReqs: { 2: { yDuoc: 2 }, 3: { yDuoc: 3 }, 4: { yDuoc: 4 }, 5: { yDuoc: 5 } }
```
Bậc không có key (bậc 6) = không có điều kiện kỹ năng. `checkSectUpgrade()` (`module/helpers/progression.ts`) đi lần lượt từng bậc; `'any'` (Minh Hạo) chỉ cần một key đạt.

3. **`curriculum: ThuatThucCategory[]`** — Giáo Trình (phân hệ Thuật Thức mở theo cấp).

4. **`privileges?: Record<number, HePhaiPrivilege[]>`** — Đặc Quyền theo bậc, `HePhaiPrivilege = { id } | { category, maxLevel }`.

`curriculum` + `privileges` được đọc bởi `isThuatThucUnlocked()` (`module/helpers/thuatThuc.ts`) — xem `spec_thuat_thuc.md` §8.3.
