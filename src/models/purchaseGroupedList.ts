import {Purchase} from "./purchase";
import _ from "underscore";
import {IPurchaseGroup} from "../interfaces/purchase.group";
import {DateUtils} from "../utils/date.utils";

export class PurchaseGroupedList {

  private originalList: Purchase[];
  private groupedList: IPurchaseGroup[];

  public constructor() {
    this.originalList = [];
    this.groupedList = [];
  }

  public updateList(list: Purchase[]) {
    if (_.isArray(list) && !_.isEmpty(list)) {
      this.originalList = list;
      this.group();
    }
  }

  private group() {
    let groupedByDate = _.groupBy(this.originalList, 'date');
    let sortedDates = _.sortBy(Object.keys(groupedByDate)).reverse();

    let groupedList:IPurchaseGroup[] = [];

    _.forEach(sortedDates, (date) => groupedList.push({
      date: DateUtils.fromString(date),
      collection: groupedByDate[date]
    }));

    this.groupedList = groupedList;
  }

  public asGroup(): IPurchaseGroup[] {
    return this.groupedList;
  }

  public asList(): Purchase[] {
    return this.originalList;
  }
}
