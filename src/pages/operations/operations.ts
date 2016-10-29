import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {IOperation} from "../../interfaces/operation.interface";

@Component({
  selector: 'page-operations',
  templateUrl: 'operations.html'
})
export class OperationsPage {
  operations:IOperation[] = [
    {title:'First Operation'},
    {title:'Second operation'}
  ];

  constructor(public navCtrl: NavController) {

  }

}
