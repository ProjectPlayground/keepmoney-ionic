import {Component, OnInit} from '@angular/core';

import {Platform, NavParams, ViewController, AlertController, LoadingController} from 'ionic-angular';
import {FormBuilder} from "@angular/forms";
import {PurchaseProvider} from "../../../providers/purchase";
import _ from 'underscore';

@Component({
  templateUrl: 'modal.html',
  providers: [PurchaseProvider]
})
export class PurchaseCreateEditModal implements OnInit{
  public purchaseForm:any;
  public tags:any;
  public purchase:any;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public purchaseService: PurchaseProvider,
    public loadingCtrl: LoadingController,
    private alertController:AlertController,
  ) {
    this.purchaseForm = formBuilder.group({ title: [''], date: [''], amount: [''], tagList:[]});
    this.tags = [];
    this.purchaseForm.date = new Date().toJSON().slice(0,10);
  }

  ngOnInit() {
    if (this.params.data) {
      this.tags = this.params.data.tags;
      if (this.params.data.purchase) {
        this.purchase = this.params.data.purchase;
        this.prepareFormToEditMode();
      }
    }
  }

  process() {
    if (this.isEditMode()){ this.update(); } else { this.add(); }
  }

  add() {
    var loader = this.buildAndShowLoader();

    this.purchaseService.create(this.purchaseForm.title, this.purchaseForm.date, this.purchaseForm.amount, this.purchaseForm.tagList).subscribe(
      data => {
        loader.dismissAll();
        if (data.status == 200) {
          this.viewCtrl.dismiss(data);
        }
      },
      err => {
        loader.dismissAll();
        this.showErrorMessage(err);
      }
    );
  }

  update() {
    var loader = this.buildAndShowLoader();

    this.purchaseService.update(this.purchase._id, this.purchaseForm.title, this.purchaseForm.date, this.purchaseForm.amount, this.purchaseForm.tagList).subscribe(
      data => {
        loader.dismissAll();
        this.viewCtrl.dismiss(data);
      },
      err => {
        loader.dismissAll();
        this.showErrorMessage(err)
      }
    );
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  isEditMode() {
    return !_.isEmpty(this.purchase);
  }

  private prepareFormToEditMode() {
    this.purchaseForm.title = this.purchase.title;
    this.purchaseForm.amount = this.purchase.amount;
    this.purchaseForm.date = this.purchase.date;
    if (!_.isEmpty(this.purchase.tags)) {
      this.purchaseForm.tagList = _.map(this.purchase.tags, (tag) => tag['_id']);
    }
  }

  private buildAndShowLoader() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    return loader;
  }

  private showErrorMessage(err) {
    this.alertController.create({
      title: "Error",
      message: err.message
    }).present();
  }
}
