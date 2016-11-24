import {Component, OnInit} from '@angular/core';

import {Platform, NavParams, AlertController, LoadingController, ItemSliding} from 'ionic-angular';
import {FormBuilder} from "@angular/forms";
import {TagsProvider} from "../../providers/tags";
import _ from 'underscore';
import moment from 'moment'

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
