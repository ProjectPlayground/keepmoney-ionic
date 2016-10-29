import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import {WelcomeTabsPage} from '../pages/tabs/welcome/welcome.tabs'
import {TranslateService} from 'ng2-translate/ng2-translate';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
  providers: [TranslateService]
})
export class MyApp {
  rootPage = WelcomeTabsPage;

  constructor(platform: Platform, private translateService: TranslateService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.initializeTranslateServiceConfig();
    });
  }

  initializeTranslateServiceConfig() {
    /*var prefix = 'assets/i18n/';
    var suffix = '.json';
    console.log(this.translateService)
    this.translateService.useStaticFilesLoader(prefix, suffix);

    var userLang = navigator.language.split('-')[0];
    userLang = /(ru|en)/gi.test(userLang) ? userLang : 'en';*/

    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }
}
