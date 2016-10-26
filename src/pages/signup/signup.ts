import { Component } from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import { UserProvider} from '../../providers/user'
import { IUser } from '../../interfaces/user.interface'
import {User} from "../../user.model";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'page-sign-up',
  templateUrl: 'signup.html',
  providers: [UserProvider]
})
export class SignUpPage {
  public user: IUser = new User("", "");
  public signUpForm:any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private userProvider: UserProvider, private formBuilder: FormBuilder) {
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
      console.log(err);
      },
      () => console.log('Account creation complete')
    );

  }
}
