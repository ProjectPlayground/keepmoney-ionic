import { Component } from '@angular/core';
import {PurchasesPage} from '../../purchases/purchases'
import {TranslateService} from "ng2-translate";
import {Events, AlertController} from "ionic-angular";

@Component({
  templateUrl: 'board.tabs.html'
})
export class BoardTabsPage {
  operationsPage: any = PurchasesPage;

  constructor(public translate: TranslateService, public events: Events, public alertCtrl: AlertController) {
  }

  accountLogOut() {
    let confirm = this.alertCtrl.create({
      title: 'Выход с акаунта',
      message: 'Уверен что хочешь выйти с акаунта?',
      buttons: [
        {text: 'Нет, закрыть'},
        {text: 'Да', handler: () => { this.events.publish('user:logout'); }}
      ]
    });
    confirm.present();
  }
}
