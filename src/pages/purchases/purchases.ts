import { Component } from '@angular/core';
import {PurchaseCreateEditModal} from '../../modals/purchase/create-edit/purchase.modal'
import {
  NavController, ModalController, PopoverController, ItemSliding, AlertController,
  LoadingController, ActionSheetController
} from 'ionic-angular';
import _ from 'underscore';
import {TagsPopover} from "../../popovers/tags/tags.popover";
import {PurchasePageProvider} from "../../providers/purchase.page";
import {PurchaseProvider} from "../../providers/purchase";

@Component({
  selector: 'page-purchases',
  templateUrl: 'purchases.html',
})
export class PurchasesPage {
  public purchases:any = [];
  public groupedPurchases:any = [];
  public tags:any;
  public actionSheet: any;
  public isLoading:boolean = true;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public popoverCtrl: PopoverController,
              public purchasesPageService: PurchasePageProvider,
              public purchaseService: PurchaseProvider,
              public loadingCtrl: LoadingController,
              public alertController:AlertController,
              public actionSheetCtrl: ActionSheetController) {

    this.purchases = [];
    this.tags = [];

    this.purchasesPageService.get().subscribe((response) => {
      this.purchases = response.purchases;
      this.tags = response.tags;
      this.groupList();
      this.isLoading = false;
    });
    this.initActionSheet();
  }

  addNew() {
    let modal = this.modalCtrl.create(PurchaseCreateEditModal, {tags: this.tags});
    modal.present();
    modal.onWillDismiss((response) => this.updateData(response));
  }

  edit(purchase, slidingItem: ItemSliding) {
    let modal = this.modalCtrl.create(PurchaseCreateEditModal, {purchase: purchase,tags: this.tags});
    modal.present();
    modal.onWillDismiss((response) => this.updateData(response));

    slidingItem.close();
  }

  remove(purchase, slidingItem: ItemSliding) {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    this.purchaseService.remove(purchase['_id']).subscribe(
      data => {
        loader.dismissAll();
        this.purchases = data['collection'];
        this.groupList();
      },
      err => {
        loader.dismissAll();
        this.alertController.create({
          title: "Error",
          message: err.message
        }).present();
      }
    );
    slidingItem.close();
  }

  showTagsPopover() {
    let popover = this.popoverCtrl.create(TagsPopover, {tags: this.tags});
    popover.present();
  }

  openMenu() {
    this.actionSheet.present();
    console.log(this.actionSheet)
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

  private updateData(response) {
    if (response && response['collection']) {
      this.purchases = response['collection'];
      this.groupList();
    }
  }

  private initActionSheet() {
    this.actionSheet = this.actionSheetCtrl.create({
      buttons: [
        { text: 'New purchase', role: 'add', handler: () => {this.addNew();} },
        { text: 'Tags', role: 'cancel', handler: () => { this.showTagsPopover();} }
      ]
    });
  }
}
