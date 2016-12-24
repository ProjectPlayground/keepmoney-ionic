import {Component} from "@angular/core";
import {FormBuilder} from "@angular/forms";

@Component({
  selector:'filter-purchases',
  templateUrl: 'filter.purchases.html',
  providers: []
})
export class PurchasesFilter{
  public filterForm:any;

  constructor(
    public formBuilder: FormBuilder,
  ) {
    this.filterForm = formBuilder.group({ from: [''], to: ['']});
    this.filterForm.from = new Date();
    this.filterForm.to = new Date();
  }

}
