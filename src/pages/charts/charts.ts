import {Component} from "@angular/core";
import {PurchasePageProvider} from "../../providers/purchase.page";
import _ from "underscore";
import {Tag} from "../../models/tag";
import {TagUtils} from "../../utils/tag.utils";

@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html',
})
export class ChartsPage {
  public groupedTags:any = [];
  public tags:Tag[] = [];
  public isLoading:boolean = true;
  public tab = 'tag';

  public doughnutChartLabels:string[] = ['Loading...'];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';


  constructor(public purchasesPageService: PurchasePageProvider) {
    this.tags = [];
    this.purchasesPageService.get().subscribe((response) => {
      console.log(response)
      this.tags = response.tags;
      this.groupList();
      this.isLoading = false;
    });
  }

  refreshData() {
    this.isLoading = true;
    this.purchasesPageService.get().subscribe((response) => {
      this.tags = response.tags;
      this.groupList();
      this.isLoading = false;
    });
  }

  ionViewWillEnter() {

  }

  private groupList() {
    this.doughnutChartLabels = _.pluck(this.tags, 'name');
    var data = [];
    _.forEach(this.tags, function (tag) {
      var sum = 0;
      console.log(tag.purchases)
      _.forEach(tag.purchases, function (purchase) {
        sum += purchase.amount;
        console.log(sum)
      });
      data.push(sum);
    });
    this.doughnutChartData = data;
    console.log(data);
  }

// events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
