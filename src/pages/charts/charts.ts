import {Component} from "@angular/core";
import {NavController, AlertController, LoadingController} from "ionic-angular";
import {PurchasePageProvider} from "../../providers/purchase.page";
import _ from 'underscore';

@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html',
})
export class ChartsPage {
  public groupedTags:any = [];
  public tags:any = [];
  public isLoading:boolean = true;
  public tab = 'tag';

  public doughnutChartLabels:string[] = ['Loading...'];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';


  constructor(public navCtrl: NavController,
              public purchasesPageService: PurchasePageProvider,
              public loadingCtrl: LoadingController,
              public alertController:AlertController) {

    this.tags = [];

    this.purchasesPageService.get().subscribe((response) => {
      this.tags = response.tags;
      this.groupList();
      this.isLoading = false;
    });
  }


  private groupList() {

    console.log(this.tags);
    this.doughnutChartLabels = _.pluck(this.tags, 'name');
    var data = this.doughnutChartData;
    _.forEach(this.tags, function (tag) {
      data.push(1);
    })
  }

// events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
