import _ from 'underscore';
import {Tag} from "./tag";

export class Purchase {
  public title: string;
  public date: string;
  public amount: number;
  public _id: string;
  public tags: Tag[];

  public constructor() {}

  public updateTags(tags:Tag[]) {
    this.tags = tags;
  }

  public static fromJson(json: any): Purchase {
    let purchase: Purchase = new Purchase();

    let attributes = ['title', 'date', 'amount', '_id', 'tags'];

    _.forEach(attributes, (attribute) => {
      if (json[attribute]) {
        if (attribute == 'tags') {
          let tagList:Tag[] = [];
          _.forEach(json[attribute], (tagJson) => tagList.push(Tag.fromJson(tagJson)));
          purchase.updateTags(tagList);
        } else {
          purchase[attribute] = json[attribute];
        }
      }
    });

    console.log(purchase);

    return purchase;
  }
}
