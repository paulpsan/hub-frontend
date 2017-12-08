import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';


@Injectable()
export class LoginService {
  private url: string;
  private urlGithub:string='https://github.com/login/oauth/authorize?client_id=';
  private GITHUB_CLIENT_ID: string = 'becb33a39e525721517c';
  private GITHUB_CLIENT_SECRET: string= '36338cdf7057d2086495a241fa3d053766da55c1'
  constructor(private _http: Http) {
    this.url=GLOBAL.url
  }
  github():Observable<any[]> {
    return this._http.get(this.urlGithub+this.GITHUB_CLIENT_ID)
    .map((res:Response)=>{
    console.log(res);
      return res;
    })
    .catch((error:any)=>{
      console.log(error);
      return Observable.throw(error || 'Server error');
    })
  }
  getTokenGithub(code:string):Observable<any[]> {
    const obj= {
      client_id:this.GITHUB_CLIENT_ID,
      client_secret:this.GITHUB_CLIENT_SECRET,
      code:code
    };

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post('https://github.com/login/oauth/access_token',obj,options)
    .map((res:Response) => {return res})
    .catch((error:any) => Observable.throw(error || 'Server error'));

    // return this._http.get(this.urlGithub+this.GITHUB_CLIENT_ID)
    // .map((res:Response)=>{
    // console.log(res);
    //   return res;
    // })
    // .catch((error:any)=>{
    //   console.log(error);
    //   return Observable.throw(error || 'Server error');
    // })
  }




}
