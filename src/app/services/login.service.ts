import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';


@Injectable()
export class LoginService {
  private url: string;
  constructor(private _http: HttpClient) {
    this.url=GLOBAL.url

  }
  github():Observable<any[]> {
    return this._http.get(this.url+'login/github')
    .map((res:Response)=>{
      return res;
    })
    .catch((error:any)=>Observable.throw(error || 'Server error'))
  }
}
