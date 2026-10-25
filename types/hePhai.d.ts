import type { HvSkillKey } from "../module/helpers/config";
import {UpgradeRule} from "./upgrade";

/**
 * Định nghĩa cấu trúc yêu cầu của một cấp Đặc Kỹ Hệ Phái.
 * Key là mã ID của kỹ năng (VD: yDuoc, theThuat), Value là cấp độ kỹ năng tối thiểu yêu cầu.
 */
export type HePhaiLevelRequirement = Partial<Record<HvSkillKey, number>>;

export type HePhaiInitItem = {
    /** ID string của vật phẩm **/
    id: string,
    quantity: number
}
/**
 * Định nghĩa cấu trúc thông tin của một Hệ Phái
 */
export interface HePhai {
    /**
     * ID của hệ phái (Ví dụ: tinhLyYSu)
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
     * Các bonus được áp dụng lên nhân vật khi chọn Hệ Phái này ở bước Khởi Tạo.
     * Dùng cùng interface UpgradeRule với ThiToc và BoiCanh.
     */
    upgrade: UpgradeRule[];

    /**
     * 2 Kỹ năng bổ sung cố định (+1 mỗi kỹ năng). 3 kỹ năng tự chọn của player không được trùng list này.
     */
    bonusSkills: HvSkillKey[];

    /**
     * Bảng yêu cầu kỹ năng để Đặc Kỹ Hệ Phái tự thăng cấp.
     * Key của Record là cấp độ mục tiêu (VD: 2, 3, 4, 5, 6).
     * Khi hệ thống check TotalXP đạt ngưỡng cho Cấp N, nó sẽ gọi progressionReqs[N] để check kỹ năng.
     */
    progressionReqs: Record<number, HePhaiLevelRequirement>;

    /**
     * Danh sách các vật phẩm được thưởng khi lần đầu chọn hệ phái này
     */
    initItems: HePhaiInitItem[];
}
