import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login'
import {SignUpPage} from '../pages/signup/signup'
import {WelcomeTabsPage} from '../pages/tabs/welcome/welcome.tabs'
import { UserProvider } from '../providers/user'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignUpPage,
    WelcomeTabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignUpPage,
    WelcomeTabsPage
  ],
  providers: [UserProvider]
})
export class AppModule {}
