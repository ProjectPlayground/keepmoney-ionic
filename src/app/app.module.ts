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
import {PurchasesPage} from "../pages/purchases/purchases";
import {BoardTabsPage} from "../pages/tabs/board/board.tabs";
import {PurchaseCreateEditModal} from "../modals/purchase/create-edit/purchase.modal";
import {MomentModule} from "angular2-moment";
import {PurchaseProvider} from "../providers/purchase";
import {ArrayFilterPipe} from "../pipes/array.filter.pipe";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignUpPage,
    WelcomeTabsPage,
    BoardTabsPage,
    PurchasesPage,
    PurchaseCreateEditModal,
    ArrayFilterPipe,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignUpPage,
    WelcomeTabsPage,
    BoardTabsPage,
    PurchasesPage,
    PurchaseCreateEditModal
  ],
  providers: [TranslateService, UserProvider, PurchaseProvider]
})
export class AppModule {}

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}
