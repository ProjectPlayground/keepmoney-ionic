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
import {TagsPopover} from "../popovers/tags/tags.popover";
import {TagsProvider} from "../providers/tags";
import {PurchasePageProvider} from "../providers/purchase.page";
import {OrderByPipe} from "../pipes/array.order.by.pipe";
import {PurchasesFilter} from "../components/filter/purchases/filter.purchases";
import {ChartsPage} from "../pages/charts/charts";
import '../../node_modules/chart.js/dist/Chart.min.js'; // and
import { ChartsModule } from 'ng2-charts/components/charts/charts';
import {TagCreateInput} from "../components/tag/create-input/tag.create.input";


@NgModule({
  declarations: [
    MyApp,

    WelcomeTabsPage,
    HomePage,
    LoginPage,
    SignUpPage,

    BoardTabsPage,
    PurchasesPage,
    ChartsPage,

    PurchaseCreateEditModal,

    TagsPopover,
    ArrayFilterPipe,
    OrderByPipe,

    PurchasesFilter,
    TagCreateInput
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    MomentModule,
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    WelcomeTabsPage,
    HomePage,
    LoginPage,
    SignUpPage,

    BoardTabsPage,
    PurchasesPage,
    ChartsPage,

    PurchaseCreateEditModal,

    TagsPopover,

    PurchasesFilter,
    TagCreateInput
  ],
  providers: [TranslateService, UserProvider, PurchaseProvider, TagsProvider, PurchasePageProvider]
})
export class AppModule {}

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}
