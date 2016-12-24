import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {DateTime} from "ionic-angular";
import _ from 'underscore';
import {AppConfig} from '../app/app.config'
import {Purchase} from "../models/purchase";
import {PurchaseUtils} from "../utils/purchase.utils";

@Injectable()
export class PurchaseProvider {

  constructor(public http: Http) {

  }

  getAll(): Observable<Purchase[]> {
    return this.http.get(`${ AppConfig.apiEndpoint }` + 'purchases', {headers: this.headers()})
      .map(res => PurchaseUtils.parseList(res.json()))
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  create(title:string, date:DateTime, amount:number, tags:string[]): Observable<Purchase[]> {
    var json = JSON.stringify({ title: title, date: date, amount: amount, tags: tags});
    return this.http.post(`${ AppConfig.apiEndpoint }` + 'purchases', json, {headers: this.headers()})
      .map(res => PurchaseUtils.parseList(res.json()['collection']))
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  update(id:string, title:string, date:DateTime, amount:number, tags:string[]): Observable<Purchase[]> {
    var json = JSON.stringify({ _id: id, title: title, date: date, amount: amount, tags: tags});
    return this.http.put(`${ AppConfig.apiEndpoint }` + 'purchases', json, {headers: this.headers()})
      .map(res => PurchaseUtils.parseList(res.json()['collection']))
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  remove(id:string): Observable<Purchase[]> {
    return this.http.post(`${ AppConfig.apiEndpoint }` + 'purchases/'+id+'/delete', {}, {headers: this.headers()})
      .map(res => PurchaseUtils.parseList(res.json()['collection']))
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  getTotalMoneySpent(purchases: any): any {
    let totalAmount = 0;

    _.each(purchases, function (purchase) {
      totalAmount += purchase['amount'];
    });

    return totalAmount;
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
