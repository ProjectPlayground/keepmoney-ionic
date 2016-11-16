import { Component } from '@angular/core';
import {PurchaseCreateEditModal} from '../../modals/purchase/create-edit/purchase.modal'
import {NavController, ModalController, PopoverController} from 'ionic-angular';
import _ from 'underscore';
import {TagsPopover} from "../../popovers/tags/tags.popover";
import {PurchasePageProvider} from "../../providers/purchase.page";

@Component({
  selector: 'page-purchases',
  templateUrl: 'purchases.html',
})
export class PurchasesPage {
  public purchases:any = [];
  public groupedPurchases:any = [];
  public tags:any;
  public isLoading:boolean = true;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public popoverCtrl: PopoverController,
              public purchasesPageService: PurchasePageProvider) {

    this.purchases = [];
    this.tags = [];

    this.purchasesPageService.get().subscribe((response) => {
      this.purchases = response.purchases;
      this.tags = response.tags;
      this.groupList();
      this.isLoading = false;
    });
  }

  addNew() {
    let modal = this.modalCtrl.create(PurchaseCreateEditModal, {tags: this.tags});
    modal.present();
    modal.onWillDismiss((response) => this.onModalDissmiss(response))
  }

  showTagsPopover() {
    let popover = this.popoverCtrl.create(TagsPopover, {tags: this.tags});
    popover.present();
  }

  private onModalDissmiss(response) {
    if (response && response['purchase']) {
      this.purchases.push(response['purchase']);
      this.groupList();
    }
  }

  private groupList() {
    var groupedByDate = _.groupBy(this.purchases, 'date');
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
