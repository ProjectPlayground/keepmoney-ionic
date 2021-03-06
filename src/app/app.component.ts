import { Component } from '@angular/core';
import {Platform, Events} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import {WelcomeTabsPage} from '../pages/tabs/welcome/welcome.tabs'
import {TranslateService} from 'ng2-translate/ng2-translate';
import {UserProvider} from "../providers/user";
import {BoardTabsPage} from "../pages/tabs/board/board.tabs";

import * as moment_ from 'moment';
export const moment =  moment_["default"];

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
  providers: [TranslateService]
})
export class MyApp {
  rootPage = null;

  constructor(platform: Platform, private translateService: TranslateService, events: Events, private users:UserProvider) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.initializeTranslateServiceConfig();
      this.setUpTab();
      events.subscribe('user:login', () => this.setUpTab());
      events.subscribe('user:logout', () => {
        users.logOut();
        this.setUpTab();
        this.setUpMoment();
      });
    });
  }

  initializeTranslateServiceConfig() {
    /*var userLang = navigator.language.split('-')[0];
    userLang = /(ru|en)/gi.test(userLang) ? userLang : 'en';*/

    /*this.translateService.setDefaultLang('en');
    this.translateService.use('ru');*/
  }

  setUpTab() {
    this.rootPage = this.users.isLoggedIn() ? BoardTabsPage : WelcomeTabsPage;
  }

  setUpMoment() {
    moment.fn.weekdayWithStartWeekday = function (targetWeekday, startDayOfWeek) {
      var weekday = (this.day() + 7 - startDayOfWeek) % 7;
      return this.add("d", targetWeekday - weekday);
    }
    moment().weekdayWithStartWeekday(0, 1);
  }
}
