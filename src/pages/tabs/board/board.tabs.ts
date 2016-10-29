import { Component } from '@angular/core';
import {OperationsPage} from '../../operations/operations'
import {TranslateService} from "ng2-translate";

@Component({
  templateUrl: 'board.tabs.html'
})
export class BoardTabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  operationsPage: any = OperationsPage;

  constructor(public translate: TranslateService) {
  }
}
