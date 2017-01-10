import {Component, Output} from "@angular/core";
import {EventEmitter} from "@angular/common/src/facade/async";
import {DateUtils} from "../../../utils/date.utils";
import {FilterPurchaseProvider} from "../../../providers/filter.purchase";

@Component({
  selector:'filter-purchases',
  templateUrl: 'filter.purchases.html',
  providers: []
})
export class PurchasesFilter {
  public filter:string;
  public options: any;
  public period: any;
  @Output() onFilterApply = new EventEmitter();

  constructor(
  ) {
    this.options = [
      {title:'All', value:'all'},
      {title:'Week', value:'week'},
      {title:'Month', value:'month'},
      {title:'Period', value:'period'},
    ];
    this.filter = FilterPurchaseProvider.action;
    this.period = {from: DateUtils.today(), to: DateUtils.today()}
  }

  apply() {
    FilterPurchaseProvider.action = this.filter;
    FilterPurchaseProvider.period = this.getPeriod();
    this.onFilterApply.emit();
  }

  private getPeriod() {
    return {
      from: this.period.from,
      to: this.period.to
    }
  }
}
