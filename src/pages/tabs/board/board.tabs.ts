import { Component } from '@angular/core';
import {PurchasesPage} from '../../purchases/purchases'
import {TranslateService} from "ng2-translate";

@Component({
  templateUrl: 'board.tabs.html'
})
export class BoardTabsPage {
  operationsPage: any = PurchasesPage;

  constructor(public translate: TranslateService) {
  }
}
