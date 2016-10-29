import { Component } from '@angular/core';

import {NavController, LoadingController, AlertController, Events} from 'ionic-angular';
import {TranslateService} from "ng2-translate";
import {IUser} from "../../interfaces/user.interface";
import {UserProvider} from "../../providers/user";
import {FormBuilder} from "@angular/forms";
import {User} from "../../user.model";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public user: IUser = new User("", "");
  public loginForm:any;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              private userProvider: UserProvider,
              private formBuilder: FormBuilder,
              private alertController:AlertController,
              public translate: TranslateService,
              public events: Events) {
    this.loginForm = formBuilder.group({ phone: [''], pin: ['']});
  }

  createAccount() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    this.userProvider.auth(this.user.phone, this.user.pin).subscribe(
      data => {
        loader.dismissAll();
        this.events.publish('user:login');
      },
      err => {
        loader.dismissAll();
        this.alertController.create({
          title: "Error",
          message: err.message
        }).present();
      },
      () => console.log('Auth')
    );
  }
}
