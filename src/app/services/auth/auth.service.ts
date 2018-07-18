import { Component, Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { HttpClient, HttpParams } from "@angular/common/http";
import "rxjs";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable()
export class AuthService {
  public usuario;
  public token;
  private url: string;

  constructor(private _http: HttpClient) {
    this.url = environment.url;
  }

  login(nombre: string, objeto: any) {
    return this._http
      .post(this.url + nombre, objeto)
      .map((res: Response) => {
        // console.log(res.json());
        localStorage.setItem("token", res["token"]);
        localStorage.setItem("usuario", JSON.stringify(res["usuario"]));
        return res;
      })
      .catch((error: any) => Observable.throw(error || "Server error"));
  }
  logout() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    localStorage.clear();
  }
  getusuario() {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario != "undefined") {
      this.usuario = usuario;
    } else {
      this.usuario = null;
    }
    return this.usuario;
  }
  getToken() {
    let token = localStorage.getItem("token");
    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }
}
