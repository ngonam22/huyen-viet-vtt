
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
*   **`Hành Cộng Thêm` (Bonus Elements):** Mảng chứa 2 Hành được +1 điểm.
*   **`Kỹ Năng Cộng Thêm` (Bonus Skills):** Danh sách 3 đến 5 Kỹ năng được +1 điểm.
*   **`Giáo Trình Thuật Thức` (Techniques):** Danh sách 3 đến 5 Thuật Thức (Chiêu thức) nhập môn mà nhân vật học được (VD: Võ kỹ, Linh thuật, Tâm thuật). Engine implementation hiện gắn list này lên Thị Tộc (`starterTechniques: string[]` trong `THI_TOC` config) vì mỗi Thị Tộc có Môn Phái nhập môn canonical 1:1; khi sect được tách độc lập, field có thể move mà không đổi item schema Thuật Thức. Chi tiết auto-grant flow xem `spec_thuat_thuc.md` §8.1.
*   **`Đặc Kỹ Môn Phái` (Sect Special Technique - ĐKMP):** Kỹ năng nội tại/Kích hoạt độc quyền của phái. Cơ chế của ĐKMP luôn scale (tăng tiến) theo `Cấp Bậc Môn Phái` do đó từ `Cấp Bậc Môn Phái` có thể suy ra cấp Đặc kỹ Môn Phái, về mặt hệ thống có thể coi chúng là một. 

## 3. GAME RULES: CƠ CHẾ KHỞI TẠO (Character Creation Affect)
Khi Player chọn Môn Phái ở Bước 4 của quá trình Khởi Tạo Nhân Vật, hệ thống sẽ apply các thay đổi sau lên Character Entity:
1.  Tự động `+1` vào 2 chỉ số Ngũ Hành được chỉ định.
2.  Player chọn từ 3 đến 5 Kỹ năng trong giáo trình để `+1`.
3.  Player nhận các Thuật Thức nhập môn (miễn phí, không tốn XP).
4.  Nhân vật nhận được **Đặc Kỹ Môn Phái** khởi điểm ở **Cấp 1** tương đương với **Cấp Bậc Môn Phái** là 1
5.  Cấp phát **Trang bị khởi đầu** tương ứng với môn phái.


## 4. GAME RULES: CƠ CHẾ THĂNG CẤP (Progression Rules) - ⚠️ LƯU Ý ĐẶC BIỆT
Đây là một **System Rule** cực kỳ quan trọng cần lưu ý khi code hệ thống Leveling:

*   **KHÔNG THỂ MUA TRỰC TIẾP BẰNG XP:** Người chơi **không thể và không cần** trực tiếp dùng Điểm Kinh Nghiệm (Tu Vi) để nâng cấp Đặc Kỹ Môn Phái. 
*   **TỰ ĐỘNG THĂNG CẤP (Auto-Leveling & Auto-Check):** Đặc Kỹ Môn Phái sẽ tự động tăng cấp khi thỏa mãn **đồng thời 2 điều kiện**:
    1.  **Tổng lượng XP tích lũy:** Khối lượng XP tổng cộng mà nhân vật đã tiêu hao cho các việc khác (nâng Hành, Kỹ năng, Thuật thức) chạm ngưỡng quy định của cấp bậc đó.
    2.  **Yêu cầu chuyên môn:** Cấp bậc các kỹ năng của nhân vật phải đạt đúng yêu cầu theo "giáo trình" của môn phái đó quy định ở cấp độ tương ứng (Ví dụ: Phái Tịnh Lý Y Sư yêu cầu Y Thuật 3, Thể Thuật 1 để lên Cấp 2).
*   **LUỒNG XỬ LÝ (Logic Flow):** Khi tổng XP tích lũy của người chơi bước vào một ngưỡng cấp bậc mới, hệ thống sẽ **tự động kiểm tra (auto-check)** điều kiện chuyên môn:
    *   **Nếu PASS (Thỏa mãn yêu cầu):** Đặc Kỹ Môn Phái ngay lập tức tự động lên cấp.
    *   **Nếu FAIL (Chưa thỏa mãn yêu cầu):** Đặc Kỹ Môn Phái giữ nguyên cấp độ hiện tại. Hệ thống sẽ duy trì trạng thái chờ (pending check) ở cấp độ đó. Bất cứ khi nào người chơi dùng XP để mua đúng các kỹ năng bị thiếu khiến điều kiện chuyển sang PASS, Đặc Kỹ sẽ lập tức được tự động thăng cấp.
*   **Ngưỡng XP Thăng Cấp Môn Phái (Dùng để trigger Check):**
    *   **Cấp 1:** Mặc định (Dưới 20 XP).
    *   **Cấp 2:** Trigger check khi đạt 20 - 50 XP.
    *   **Cấp 3:** Trigger check khi đạt 50 - 90 XP.
    *   **Cấp 4:** Trigger check khi đạt 80 - 140 XP.
    *   **Cấp 5:** Trigger check khi đạt 140 - 200 XP.
    *   **Cấp 6:** Trigger check khi Trên 200 XP.

## 5. THIẾT LẬP CHI TIẾT CÁC MÔN PHÁI (Detailed Sect Mechanics)

Dưới đây là mapping chi tiết cách `Đặc Kỹ Môn Phái` tương tác với Game Engine dựa trên `Cấp Bậc Môn Phái` (Sect Level). Khi code logic combat hoặc skill check, cần refer đến các biến số này:

### 5.1. Nhóm Thập Nhị Chính Quy (12 Học Viện Quốc Gia)

*   **Tịnh Lý Y Sư (Nghệ Sư/Y Sư)**
    *   `Bonus`: +1 Thổ, +1 Mộc.
    *   `ĐKMP - Tịnh Lý Y Thuật`: Khi test kỹ năng *Y Thuật*, có thể đổi xúc xắc mặt Thái Cực (Cân bằng) thành Thiếu Âm (Thất bại) hoặc Thiếu Dương (Thành công). **Số lượng tối đa = Cấp Bậc Môn Phái**.

*   **Sanh Cửu Lãnh Quân (Võ Sĩ)**
    *   `Bonus`: +1 Thổ, +1 Mộc.
    *   `ĐKMP - Sanh Cửu Binh Pháp`: Khi Tấn Công/Hỗ Trợ thành công, hồi Tâm Lực. **Tối đa hồi = Cấp Bậc Môn Phái**. Có thể đổi 1 Sức Lực lấy 1 điểm Chí Thành (Critical).

*   **Dương Tần Phục Ma Sư (Võ Sĩ/Pháp Sư)**
    *   `Bonus`: +1 Thổ, +1 Hỏa.
    *   `ĐKMP - Dương Tần Phục Ma Pháp`: 1 lần/vòng, khi test năng lực lên mục tiêu có tag `Ma tính`, được phép chuyển xúc xắc Thiếu Âm thành Thiếu Dương. **Số lượng tối đa = (Logic cần xác định theo rule phụ, thường liên kết với level)**.

*   **Minh Hạo Nghệ Sư (Nghệ Sư)**
    *   `Bonus`: +1 Kim, +1 Thủy.
    *   `ĐKMP - Minh Hạo Thuần Nghệ`: 1 lần/cảnh, sau khi test thành công kỹ năng nhóm Nghệ Đạo, chọn số lượng mục tiêu **tối đa = Cấp bậc Môn Phái**. Hồi cho họ 3 Tâm Lực hoặc điểm Kỹ năng.

*   **Thường Liên Linh Sĩ (Pháp Sư)**
    *   `Bonus`: +1 Hành tự chọn, +1 Hành khác.
    *   `ĐKMP - Thường Liên Linh Pháp`: 1 lần/cảnh, khi test kích hoạt Linh Thuật (Phép thuật), **giảm Độ Khó (ĐK) = Cấp bậc Môn Phái**.

*   **Tiên Vị Thương Sĩ / Nghị Võ Kỵ Sĩ**
    *   `Bonus Tiên Vị`: +1 Thủy, +1 Mộc. `Bonus Nghị Võ`: +1 Hỏa, +1 Mộc.
    *   `ĐKMP - Nghị Võ Kỵ Phong`: Thêm 1 Chí Thành cho mỗi `2-bộ` khoảng cách di chuyển. Khi cưỡi ngựa, cự ly di chuyển được tính bằng **Gấp đôi Cấp bậc Môn Phái**.

*   **Sơn Vị Thiết Tượng (Nghệ Sư)**
    *   `Bonus`: +1 Hỏa, +1 Thổ.
    *   `ĐKMP - Sơn Vị Thiết Đoán Kỹ`: 1 lần/cảnh, khi chế tác/sửa vũ khí giáp trụ, cho phép gieo lại số lượng xúc xắc **bằng Cấp bậc Môn Phái**.

*   **Thi Hân Thám Lâm Quân (Võ Sĩ)**
    *   `Bonus`: +1 Thủy, +1 Mộc. Nhận 1 Thú Hữu (Pet).
    *   `ĐKMP - Thi Huân Luyện Thú Pháp`: Tăng Sức Lực, Tâm Lực, và kỹ năng Võ Đạo của Pet thêm một lượng **bằng Cấp bậc Môn Phái**. Pet có thể tấn công ké theo chủ nhân.

*   **Diên Hậu Chính Sĩ (Văn Sĩ)**
    *   `Bonus`: +1 Kim, +1 Mộc.
    *   `ĐKMP - Mãn Ý Mặc Ngôn`: 1 lần/cảnh, khi test thuyết phục bằng ngôn từ, được cộng thẳng số lượng điểm Chí Thành **bằng Cấp bậc Môn Phái** (bất kể test thành công hay thất bại).

*   **Tuyết Luật Thám Tử (Võ/Văn Sĩ)**
    *   `Bonus`: +1 Thổ, +1 Kim.
    *   `ĐKMP - Biện Chứng Thám Đạo`: Khi điều tra, **thay thế cấp Kỹ năng bằng Cấp bậc Môn Phái**.
    *   `ĐKMP Phụ - Thám Tâm Tinh Đồng`: Lưu trữ số lượng xúc xắc **tối đa = Cấp bậc Môn Phái** để dùng cho lần test sau.

*   **Hạo Giới Hùng Binh (Võ Sĩ)**
    *   `Bonus`: +1 Thổ, +1 Hỏa.
    *   `ĐKMP - Hạo Giới Nộ Khí`: Khi nhận sát thương hoặc Phát Tiết, tiến vào trạng thái `Cuồng Nộ` và hồi phục Sức Lực = **Cấp bậc Môn Phái + Cấp Thể Lực**.

### 5.2. Nhóm Giang Hồ Bách Đạo (Cộng Đồng Phi Chính Quy)
Đây là các phái không thuộc quản lý của nhà nước, thường có bộ bonus đa dạng hơn để phục vụ kỹ năng Sinh Tồn và Hắc Đạo:
*   **Lãng Khách Đường:** Được chọn Võ Kỹ và Tâm Thuật tự do.
*   **Thanh Phong Đoàn:** +1 Kim, +1 Mộc. Phái của lính đánh thuê/cướp.
*   **Tầm Bảo Thương Hội:** +1 Thủy, +1 Mộc. Chuyên về khảo sát và sinh tồn.
*   **Hồng Điệp Lâu:** +1 Kim, +1 Mộc. Mạng lưới sát thủ/thông tin, có thuật Tiềm Hành (tàng hình).
*   **Sơn Hải Công Hội:** +1 Thổ, +1 Hỏa.
*   **Địa Linh Sư:** Tu tập pháp thuật tâm linh, bói toán.
*   **Lịch Thế Hành Giả:** +1 Hành tự chọn, +1 Hành khác. Tập trung vào Tu Đạo và Khí Thuật.

***

**⚠️ SYSTEM ARCHITECTURE NOTE FOR DEV/AI (CẬP NHẬT MỚI):** 

Về mặt dữ liệu, thông tin của 12 Đại Học Viện (và Giang Hồ Bách Đạo) được lưu trữ tại `module/helpers/config.ts` dưới biến số `MON_PHAI`. Bạn có thể tham khảo `types/monPhai.d.ts` để hiểu cấu trúc.

Thay vì bắt người chơi tự gõ tay, trường `system.identity.monPhai` sẽ nhận ID (Key) của Môn phái, ví dụ `"tinhLyYSu"`. 

Để phục vụ tính năng **Tự động thăng cấp** (Auto-Leveling) dựa vào TotalXP, hệ thống sẽ chọc vào property `progressionReqs` của Môn Phái đó. 
Ví dụ, bảng `progressionReqs` của `tinhLyYSu` sẽ có dạng:
```typescript
{
    2: { yHoc: 3, theThuat: 1 }, 
    3: { yHoc: 4, theThuat: 2, thanHoc: 1 }
}
```
Khi `totalXp` của nhân vật cán mốc Cấp 2 (20-50 XP), hệ thống sẽ lấy Object của cấp 2 ra (`{ yHoc: 3, theThuat: 1 }`) và tự động lặp qua các key này để kiểm tra xem cấp độ kỹ năng hiện tại của char có >= mức yêu cầu hay không. Nếu Đạt, cấp độ Môn phái được nâng lên 2. 

**Việc cần làm của Game Designer:** Game Designer sẽ cần mở file `module/helpers/config.ts` và dần lấp đầy các thông số yêu cầu chi tiết cho từng Phái ở bảng `progressionReqs` theo đúng chuẩn Rulebook.