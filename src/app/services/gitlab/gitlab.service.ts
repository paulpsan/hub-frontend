import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GitlabService {
  private url: string;

  constructor(
    private _http: HttpClient,

  ) {
    this.url = environment.url;

  }

  createUser(usuario, token,domain) {

    return this._http
      .post(`${this.url}usuarios/gitlab`, { usuario, token, domain})
      .catch((error: any) => {
        return Observable.throw(error || "Server error");
      });
  }
}
