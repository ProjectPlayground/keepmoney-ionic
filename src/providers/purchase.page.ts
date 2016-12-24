import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {AppConfig} from '../app/app.config'
import {IPurchasePage} from "../interfaces/purchase.page";
import {PurchaseUtils} from "../utils/purchase.utils";
import {TagUtils} from "../utils/tag.utils";

@Injectable()
export class PurchasePageProvider {

  constructor(public http: Http) {
  }

  get(): Observable<IPurchasePage> {
    return this.http.get(`${ AppConfig.apiEndpoint }` + 'mobile/page/purchases',
      { headers: this.headers() })
      .map(res => {
        return {
          purchases: PurchaseUtils.parseList(res.json()['purchases']),
          tags: TagUtils.parseList(res.json()['tags'])
        };
      })
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  private headers():Headers {
    var headers = new Headers();
    var token = JSON.parse(window.localStorage.getItem('user'))['token'];
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Authorization', token);
    return headers;
  }
}
