import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Injectable()
export class UserProvider {

  constructor(public http: Http) {
    console.log('Hello User Provider');
  }

  createAccount(phone:String, pin: String):any {
    var json = JSON.stringify({ phone: phone, pin: pin});
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('/api/users',
      json, {
        headers: headers
      })
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

}
