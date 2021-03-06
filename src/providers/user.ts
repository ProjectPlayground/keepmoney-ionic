import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {AppConfig} from "../app/app.config";

@Injectable()
export class UserProvider {

  constructor(public http: Http) {
  }

  createAccount(phone:String, pin: String):any {
    var json = JSON.stringify({ phone: phone, pin: pin});

    return this.http.post(`${ AppConfig.apiEndpoint }` + 'users',
      json, {
        headers: this.headers()
      })
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  auth(phone:String, pin:String):any {
    var json = JSON.stringify({ phone: phone, pin: pin});

    return this.http.post(`${ AppConfig.apiEndpoint }` + 'users/auth',
      json, {
        headers: this.headers()
      })
      .map(response => this.processUserAuth(response))
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  isLoggedIn():boolean {
    var userData = JSON.parse(window.localStorage.getItem('user'));
    return userData && userData['token'];
  }

  logOut():void {
    window.localStorage.setItem('user', null);
  }

  private processUserAuth(response):any {
    var userData = JSON.stringify({phone: response.json().phone, token: response.json().token})
    window.localStorage.setItem('user', userData);
    return response.json();
  }

  private headers():Headers {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return headers;
  }
}
