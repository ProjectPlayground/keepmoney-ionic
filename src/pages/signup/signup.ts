import { Component } from '@angular/core';
import {NavController, LoadingController, AlertController} from 'ionic-angular';
import {UserProvider} from '../../providers/user'
import {IUser} from '../../interfaces/user.interface'
import {User} from "../../user.model";
import {FormBuilder} from "@angular/forms";
import {TranslateService} from "ng2-translate";

@Component({
  selector: 'page-sign-up',
  templateUrl: 'signup.html',
  providers: [UserProvider]
})
export class SignUpPage {
  public user: IUser = new User("", "");
  public signUpForm:any;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              private userProvider: UserProvider,
              private formBuilder: FormBuilder,
              private alertController:AlertController,
              public translate: TranslateService) {
    this.signUpForm = formBuilder.group({ phone: [''], pin: ['']});
  }

  createAccount() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    this.userProvider.createAccount(this.user.phone, this.user.pin).subscribe(
      data => {
        loader.dismissAll();
        if (data.status == 200) {
          this.signUpForm.reset();
        }
      },
    err => {
      loader.dismissAll();
      this.alertController.create({
        title: "Error",
        message: err.message
      }).present();
      },
      () => console.log('Account creation complete')
    );
  }
}
