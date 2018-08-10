import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
// import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class LoginService {
  private url: string;
  constructor(private _http: HttpClient) {
    this.url = environment.url;
  }

  refreshToken(params, usuario, tipo) {
    return this._http
      .post(this.url + `auth/refresh/${params}`, {
        code: params.code,
        usuario,
        tipo
      })
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error || 'Server error');
      });
  }
  getToken(type: string, code: string) {
    return this._http
      .get(this.url + `auth/${type}/${code}`)
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error || 'Server error');
      });
  }
  // obtiene el usuario Oauth
  loginUserOauth(type: string, object) {
    return this._http
      .post(this.url + `auth/login/${type}`, object)
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error || 'Server error');
      });
  }
}
