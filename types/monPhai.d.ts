import type { HvSkillKey } from "../module/helpers/config";

/**
 * Định nghĩa cấu trúc yêu cầu của một cấp Đặc Kỹ Môn Phái.
 * Key là mã ID của kỹ năng (VD: yHoc, theThuat), Value là cấp độ kỹ năng tối thiểu yêu cầu.
 */
export type MonPhaiLevelRequirement = Partial<Record<HvSkillKey, number>>;

/**
 * Định nghĩa cấu trúc thông tin của một Môn Phái
 */
export interface MonPhai {
    /**
     * ID của môn phái (Ví dụ: tinhLyYSu)
     */
    id: string;

    /**
     * Tên hiển thị (Tốt nhất nên là key của localization để dịch i18n, VD: BOILERPLATE.MonPhai.tinhLy.label)
     */
    ten: string;

    /**
     * Thuộc nhóm học viện chính quy hay giang hồ
     */
    category: 'thapNhiHocVien' | 'giangHoBachDao';

    /**
     * Bảng yêu cầu kỹ năng để Đặc Kỹ Môn Phái tự thăng cấp.
     * Key của Record là cấp độ mục tiêu (VD: 2, 3, 4, 5, 6).
     * Khi hệ thống check TotalXP đạt ngưỡng cho Cấp N, nó sẽ gọi progressionReqs[N] để check kỹ năng.
     */
    progressionReqs: Record<number, MonPhaiLevelRequirement>;
}
