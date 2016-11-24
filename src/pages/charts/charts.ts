import {Component, OnInit, AfterViewInit, OnChanges, DoCheck} from "@angular/core";
import {PurchasePageProvider} from "../../providers/purchase.page";
import _ from "underscore";

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


  constructor(public purchasesPageService: PurchasePageProvider) {
    this.tags = [];
    this.purchasesPageService.get().subscribe((response) => {
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
      _.forEach(tag['purchases'], function (purchase) {
        sum += purchase['amount'];
      });
      data.push(sum);
    });
    this.doughnutChartData = data;
  }

// events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
