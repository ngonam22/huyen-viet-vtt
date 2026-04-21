import {UpgradeRule} from "./upgrade";


// "Clan" interface
export interface ThiToc {
    // id: string;
    ten: string,
    linhGiap: string,
    viTri: string,
    upgrade: UpgradeRule[],
    starterTechniques?: string[],
}