import {Purchase} from "../models/purchase";
import _ from 'underscore';

export class PurchaseUtils {
  public static parseList(json: any):Purchase[] {
    let purchases:Purchase[] = [];
    _.each(json, (purchaseJson) => purchases.push(Purchase.fromJson(purchaseJson)));
    return purchases;
  }
}
