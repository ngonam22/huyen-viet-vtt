# SPEC_CONDITION_EFFECTS: HỆ THỐNG HIỆU ỨNG

## 1. TỔNG QUAN (Overview)
Hiệu ứng là các trạng thái có lợi/bất lợi ảnh hưởng lên nhân vật của người chơi. Trong game, nhân vật có thể mang nhiều hiệu ứng khác nhau, các hiệu ứng này có thể đến từ nhiều lý do như: bị tấn công bởi kỹ năng, bị ảnh hưởng môi trường, v.v...

Các hiệu ứng thông thường sẽ có thời gian tồn tại nhất định, sau khi hết thời gian thì hiệu ứng sẽ mất đi. Tuy nhiên, có một số hiệu ứng đặc biệt có thể tồn tại mãi mãi trừ khi người chơi có hành động giải trừ.

## 2. TƯƠNG TÁC VỚI FOUNDRY VTT
Nhằm đơn giản hóa các hiệu ứng, người chơi sẽ sử dụng hệ thống hiệu ứng của Foundry VTT. Người chơi có thể thêm, bỏ các hiệu ứng mà nhân vật của mình đang chịu tác động thông qua giao diện tại Character Sheet của Foundry VTT.

## 3. DANH SÁCH CÁC HIỆU ỨNG

### 3.1. Hiệu ứng thông thường

Bảng sau liệt kê các hiệu ứng có trong trò chơi, lưu ý các hiệu ứng không phải lúc nào cũng sẽ được code vào Foundry VTT, một số hiệu ứng can thiệp vào chỉ số người chơi/vật phẩm (tạm gọi là side effect) mới được code vào hệ thống để giảm độ phức tạp.

Với các hiệu ứng có Side Effect, sẽ có mục riêng trong code nhằm giải thích các tác dụng nào can thiệp vào logic của Game.

| Hiệu ứng | Mô tả | Thời gian tồn tại | Tác dụng |
|---|---|---|---|
| **Xuất Huyết** | Nhân vật bị tổn thương mạch máu | - | Mất 3 Tâm Lực mỗi khi đổ xúc xắc. Cuối lượt nhận 3 sát thương vật lý (bỏ qua Kháng Lực). Sát thương này cộng dồn (+3) sau mỗi vòng. |
| **Choáng Váng** | Nhân vật bị choáng do các đòn đánh vào đầu, mắt hay vào giác quan | - | Hành động Công Kích hoặc Mưu Kế bị tăng +2 Độ Khó |
| **Bất Tỉnh** | Nhân vật bất tỉnh | - | Không thể dùng khí lực để đỡ đòn. Sát thương nhận vào nhân đôi |
| **Tổn Thương Ngũ Hành** | Khi Sức lực = 0, Sát thương sẽ đánh vào Ngũ Hành | - | Hành bị thương khi có bài xét sẽ có Độ Khó +2, nhưng Độ Khó của Hành bị Khắc tương ứng giảm 1. Thứ tự Hành bị tổn thương: Kim → Thủy → Mộc → Hỏa → Thổ (nếu chưa có Hành nào bị thương thì chọn ngẫu nhiên; nếu đã có thì tiếp tục theo thứ tự sau Hành bị thương cuối cùng; nếu cả 5 Hành đều bị thương thì không có gì xảy ra)|
| **Loạn Tâm** | Khi Tâm Lực = 0 | Phải "Phát Tiết" để phục hồi | chỉ số Cảnh Giác giảm xuống bằng 1 |
| **Cuồng Nộ** | Mất lý trí và chiến đấu điên cuồng | - | Sát thương gây ra và nhận phải đều được cộng thêm +2 |
| **Câm Lặng** | Không thể nói | - | Các hành động Mưu kế, đọc phép (Linh thuật, Ma thuật) bị tăng tới +5 Độ Khó. |

