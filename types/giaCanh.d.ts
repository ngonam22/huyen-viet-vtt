import { UpgradeRule } from "./upgrade";

// "Gia Canh" interface
export interface GiaCanh {
  id: string;
  ten: string;
  description: string;
  upgrade: UpgradeRule[];
}