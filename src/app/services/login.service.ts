import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
// import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { GLOBAL } from "./global";

@Injectable()
export class LoginService {
  private url: string;
  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }
  // github(): Observable<any[]> {
  //   return this._http
  //     .get(this.urlGithub + this.GITHUB_CLIENT_ID)
  //     .map((res: Response) => {
  //       console.log(res);
  //       return res;
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //       return Observable.throw(error || "Server error");
  //     });
  // }
  getTokenGithub(code: string) {
    // const obj= {
    //   client_id:this.GITHUB_CLIENT_ID,
    //   client_secret:this.GITHUB_CLIENT_SECRET,
    //   code:code,
    //   state:this.STATE,
    // };

    // let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    // let options = new RequestOptions({ headers: headers });

    // return this._http.post('https://github.com/login/oauth/access_token',obj,options)
    // .map((res:Response) => {return res})
    // .catch((error:any) => Observable.throw(error || 'Server error'));

    return this._http
      .get(this.url + "auth/github/" + code)
      .map((res: any) => {
        let token = res.token;
        if (res.token) {
          localStorage.setItem("token", token);
          localStorage.setItem("identity", JSON.stringify(res.usuario));
        }
        return res;
      })
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error || "Server error");
      });
  }
  getTokenGitlab(code: string) {
    return this._http
      .get(this.url + "auth/gitlab/" + code)
      .map((res: any) => {
        let token = res.token;
        if (res.token) {
          localStorage.setItem("token", token);
          localStorage.setItem("identity", JSON.stringify(res.usuario));
        }
        return res;
      })
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error || "Server error");
      });
  }
  getTokenBitbucket(code: string) {
    return this._http
      .get(this.url + "auth/bitbucket/" + code)
      .map((res: any) => {
        let token = res.token;
        if (res.token) {
          localStorage.setItem("token", token);
          localStorage.setItem("identity", JSON.stringify(res.usuario));
        }
        return res;
      })
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error || "Server error");
      });
  }
}
