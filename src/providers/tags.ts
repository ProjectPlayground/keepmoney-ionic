import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {DateTime} from "ionic-angular";

@Injectable()
export class TagsProvider {

  constructor(public http: Http) {
  }

  create(name:string):any {
    var json = JSON.stringify({ name: name});

    return this.http.post('/api/tags',
      json, {
        headers: this.headers()
      })
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  private headers():Headers {
    var headers = new Headers();
    var token = JSON.parse(window.localStorage.getItem('user'))['token'];
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    return headers;
  }
}
