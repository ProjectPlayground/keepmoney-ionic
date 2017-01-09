import {Component, Output} from "@angular/core";
import {EventEmitter} from "@angular/common/src/facade/async";
import {DateUtils} from "../../../utils/date.utils";

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
    this.filter = 'week';
    this.period = {
      from: DateUtils.today(),
      to: DateUtils.today()
    }
  }

  apply() {
    this.onFilterApply.emit(this.getFilterResult());
  }

  private getFilterResult() {
    return {
      event: this.filter,
      data: this.getData()
    }
  }

  private getData() {
    if (this.filter == 'period') {
      return {
        from: this.period.from,
        to: this.period.to
      }
    }
  }
}
