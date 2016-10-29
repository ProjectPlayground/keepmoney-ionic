import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {TranslateService} from "ng2-translate";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public translate: TranslateService) {}

}
