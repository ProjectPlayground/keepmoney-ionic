import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Injectable()
export class TagsProvider {

  constructor(public http: Http) {
  }

  create(name:string):any {
    var json = JSON.stringify({ name: name});

    return this.http.post('http://6778586a.ngrok.io/tags',
      json, {
        headers: this.headers()
      })
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  update(id:string, name:string):any {
    var json = JSON.stringify({_id: id, name: name});

    return this.http.put('http://6778586a.ngrok.io/tags',
      json, {
        headers: this.headers()
      })
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  remove(id:string):any {
    return this.http.post('http://6778586a.ngrok.io/tags/'+id+'/delete', {
        headers: this.headers()
      })
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
