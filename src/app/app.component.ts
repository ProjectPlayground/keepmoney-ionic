import { Component } from '@angular/core';
import {Platform, Events} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import {WelcomeTabsPage} from '../pages/tabs/welcome/welcome.tabs'
import {TranslateService} from 'ng2-translate/ng2-translate';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
  providers: [TranslateService]
})
export class MyApp {
  rootPage = WelcomeTabsPage;

  constructor(platform: Platform, private translateService: TranslateService, events: Events) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.initializeTranslateServiceConfig();
      /*this.events.subscribe('user:login', () => {

      });*/
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
