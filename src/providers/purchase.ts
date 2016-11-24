import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {DateTime} from "ionic-angular";

@Injectable()
export class PurchaseProvider {

  constructor(public http: Http) {
  }

  getAll():any {
    return this.http.get('https://api-keepmoney.herokuapp.com/purchases', {headers: this.headers()})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  create(title:string, date:DateTime, amount:number, tags:string[]):any {
    var json = JSON.stringify({ title: title, date: date, amount: amount, tags: tags});
    return this.http.post('https://api-keepmoney.herokuapp.com/purchases', json, {headers: this.headers()})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  update(id:string, title:string, date:DateTime, amount:number, tags:string[]):any {
    var json = JSON.stringify({ _id: id, title: title, date: date, amount: amount, tags: tags});
    return this.http.put('https://api-keepmoney.herokuapp.com/purchases', json, {headers: this.headers()})
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  remove(id:string):any {
    return this.http.post('https://api-keepmoney.herokuapp.com/purchases/'+id+'/delete', {}, {headers: this.headers()})
      .map(res => res.json())
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
