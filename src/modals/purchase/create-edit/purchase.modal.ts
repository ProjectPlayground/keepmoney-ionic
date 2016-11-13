import { Component } from '@angular/core';

import {Platform, NavParams, ViewController, AlertController, LoadingController} from 'ionic-angular';
import {TranslateService} from "ng2-translate";
import {FormBuilder} from "@angular/forms";
import {PurchaseProvider} from "../../../providers/purchase";
@Component({
  templateUrl: 'modal.html',
  providers: [PurchaseProvider]
})
export class PurchaseCreateEditModal {
  public purchaseForm:any;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public purchaseService: PurchaseProvider,
    public loadingCtrl: LoadingController,
    private alertController:AlertController,
  ) {
    this.purchaseForm = formBuilder.group({ title: [''], date: [''], amount: ['']});
  }

  add() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    this.purchaseService.create(this.purchaseForm.title, this.purchaseForm.date, this.purchaseForm.amount).subscribe(
      data => {
        loader.dismissAll();
        if (data.status == 200) {
          this.viewCtrl.dismiss(data);
        }
      },
      err => {
        loader.dismissAll();
        this.alertController.create({
          title: "Error",
          message: err.message
        }).present();
      }
    );
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
