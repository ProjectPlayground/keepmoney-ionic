import {Purchase} from "../models/purchase";
import {Tag} from "../models/tag";
export interface IPurchasePage {
  tags: Tag[];
  purchases: Purchase[]
}
