import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { UserProvider } from '../providers/user'
import {TranslateService, TranslateModule, TranslateStaticLoader, TranslateLoader} from "ng2-translate";
import {Http} from "@angular/http";

import {WelcomeTabsPage} from '../pages/tabs/welcome/welcome.tabs'
import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login'
import {SignUpPage} from '../pages/signup/signup'
import {OperationsPage} from "../pages/operations/operations";
import {BoardTabsPage} from "../pages/tabs/board/board.tabs";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignUpPage,
    WelcomeTabsPage,
    BoardTabsPage,
    OperationsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignUpPage,
    WelcomeTabsPage,
    BoardTabsPage,
    OperationsPage
  ],
  providers: [TranslateService, UserProvider]
})
export class AppModule {}

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}
