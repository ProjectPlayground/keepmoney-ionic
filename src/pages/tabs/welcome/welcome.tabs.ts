import { Component } from '@angular/core';

import { LoginPage } from '../../login/login';
import { SignUpPage } from '../../signup/signup';
import {TranslateService} from "ng2-translate";

@Component({
  templateUrl: 'welcome.tabs.html'
})
export class WelcomeTabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  loginPage: any = LoginPage;
  signupPage: any = SignUpPage;

  constructor(public translate: TranslateService) {
  }
}
