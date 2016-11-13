import { Component } from '@angular/core';
import {PurchaseCreateEditModal} from '../../modals/purchase/create-edit/purchase.modal'
import {NavController, ModalController} from 'ionic-angular';
import {PurchaseProvider} from "../../providers/purchase";
import _ from 'underscore';
import Dictionary = _.Dictionary;

@Component({
  selector: 'page-purchases',
  templateUrl: 'purchases.html',
})
export class PurchasesPage {
  public purchases:any;
  public groupedPurchases:any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public purchaseService:PurchaseProvider) {
    this.purchaseService.getAll().subscribe((response) => {
      this.purchases = response.purchases;
      this.groupList()
    });
  }

  addNew() {
    let modal = this.modalCtrl.create(PurchaseCreateEditModal);
    modal.present();
    modal.onWillDismiss((response) => this.onModalDissmiss(response))
  }

  private onModalDissmiss(response) {
    this.purchases.push(response['purchase']);
    this.groupList();
  }

  private groupList() {
    var groupedByDate = _.groupBy(this.purchases, 'date')
    var keys = _.sortBy(Object.keys(groupedByDate)).reverse();
    var groupedList = [];

    _.forEach(keys, (key) => {
      groupedList.push({
        header: key,
        collection: groupedByDate[key]
      })
    });

    this.groupedPurchases = groupedList;
  }
}
