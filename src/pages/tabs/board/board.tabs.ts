import { Component } from '@angular/core';
import {OperationsPage} from '../../operations/operations'
import {TranslateService} from "ng2-translate";

@Component({
  templateUrl: 'board.tabs.html'
})
export class BoardTabsPage {
  operationsPage: any = OperationsPage;

  constructor(public translate: TranslateService) {
  }
}
