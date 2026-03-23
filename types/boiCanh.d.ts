import {UpgradeRule} from "./upgrade";


// "Boi Canh" interface
export interface BoiCanh {
    id: string;
    ten: string,
    description: string,
    upgrade: UpgradeRule[],
}