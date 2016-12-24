import {Component} from "@angular/core";
import {PurchaseCreateEditModal} from "../../modals/purchase/create-edit/purchase.modal";
import {
  ModalController,
  PopoverController,
  ItemSliding,
  AlertController,
  LoadingController,
  ActionSheetController
} from "ionic-angular";
import {TagsPopover} from "../../popovers/tags/tags.popover";
import {PurchasePageProvider} from "../../providers/purchase.page";
import {PurchaseProvider} from "../../providers/purchase";
import {PurchaseUtils} from "../../utils/purchase.utils";
import {PurchaseGroupedList} from "../../models/purchaseGroupedList";
import {Tag} from "../../models/tag";

@Component({
  selector: 'page-purchases',
  templateUrl: 'purchases.html',
})
export class PurchasesPage {
  public tags:Tag[];
  public actionSheet: any;
  public isLoading:boolean = true;
  private groupedList: PurchaseGroupedList;

  constructor(public modalCtrl: ModalController,
              public popoverCtrl: PopoverController,
              public purchasesPageService: PurchasePageProvider,
              public purchaseService: PurchaseProvider,
              public loadingCtrl: LoadingController,
              public alertController:AlertController,
              public actionSheetCtrl: ActionSheetController) {

    this.tags = [];
    this.groupedList = new PurchaseGroupedList();

    this.purchasesPageService.get().subscribe((response) => {
      this.groupedList.updateList(response.purchases);
      this.tags = response.tags;
      this.isLoading = false;
    });
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
        this.updateData(data);
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
    this.initActionSheet();
    this.actionSheet.present();
  }

  getTotalMoneySpent() {
    return this.purchaseService.getTotalMoneySpent(this.groupedList.asList());
  }

  private updateData(response) {
    if (response && response['collection']) {
      this.groupedList.updateList(PurchaseUtils.parseList(response['collection']));
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
