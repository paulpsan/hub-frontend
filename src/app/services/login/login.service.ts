import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
// import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { environment } from "../../../environments/environment";

@Injectable()
export class LoginService {
  private url: string;
  constructor(private _http: HttpClient) {
    this.url = environment.url;
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
  refreshToken(params, usuario) {
    return this._http
      .post(this.url + `auth/refresh/${params.state}`, {code:params.code,usuario})
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error || "Server error");
      });
  }

  getTokenGithub(code: string) {
    return this._http
      .get(this.url + "auth/github/" + code)
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error || "Server error");
      });
  }
  getTokenGitlab(code: string) {
    return this._http
      .get(this.url + "auth/gitlab/" + code)
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error || "Server error");
      });
  }
  getTokenBitbucket(code: string) {
    return this._http
      .get(this.url + "auth/bitbucket/" + code)
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error || "Server error");
      });
  }
}
