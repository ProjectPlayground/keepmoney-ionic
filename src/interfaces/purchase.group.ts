import {Purchase} from "../models/purchase";
export interface IPurchaseGroup {
  date: Date;
  collection: Purchase[]
}
