import _ from "underscore";
import {Purchase} from "./purchase";

export class Tag {
  public name: string;
  public _id: string;
  public purchases: Purchase[];

  public constructor() {
    this.purchases = [];
  }

  public updatePurchases(purchases:Purchase[]) {
    this.purchases = purchases;
  }

  public static fromJson(json: any): Tag {
    let tag: Tag = new Tag();
    let attributes = ['name', '_id', 'purchases'];

    _.forEach(attributes, (attribute) => {
      if (json[attribute]) {
        if (attribute == 'purchases') {
          let purchases:Purchase[] = [];
          _.forEach(json[attribute], (tagJson) => purchases.push(Purchase.fromJson(tagJson)));
          tag.updatePurchases(purchases);
        } else {
          tag[attribute] = json[attribute];
        }
      }
    });

    return tag;
  }
}
