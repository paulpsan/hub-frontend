import { Component, Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import "rxjs/Rx";
import { Observable } from "rxjs/Rx";
import { environment } from "../../../environments/environment";

@Injectable()
export class HttpService {
  public token;
  private url: string;
  constructor(private _http: HttpClient) {
    this.url = environment.url;
    // this.url ='https://test.adsib.gob.bo/api_backend/api/usuarios';
  }
  //obtiene datos de forma general

  obtener(tipo: string) {
    return this._http
      .get(this.url + tipo)
      .catch((error: any) => Observable.throw(error || "Server error"));
  }
  //obtiene y busca datos de forma general
  obtenerPaginado(tipo: string, obj): Observable<any[]> {
    let myParams = new HttpParams();
    if (obj.buscar != undefined) {
      myParams = myParams.append("buscar", obj.buscar);
    }
    myParams = myParams.append("ordenar", obj.ordenar);
    myParams = myParams.append("pagina", obj.pagina);
    myParams = myParams.append("limite", obj.limite);
    return this._http
      .get(this.url + tipo + "?tsp=" + Date.now(), { params: myParams })
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  obtenerUsuarios(tipo: string, repo: any, token: any): Observable<any> {
    return this._http
      .post(this.url + tipo + "/usuarios/" + repo.id, { repo, token })
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  buscarId(tipo: string, id: number): Observable<any> {
    let headers = new Headers({ "Content-Type": "application/json" });
    return this._http
      .get(this.url + tipo + "/" + id + "?tsp=" + Date.now())
      .catch((error: any) => Observable.throw(error || "Error"));
  }

  adicionar(tipo: string, objeto: any): Observable<any> {
    return this._http
      .post(this.url + tipo, objeto)
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  editar(tipo: string, objeto: any): Observable<any[]> {
    return this._http
      .patch(this.url + tipo + "/" + objeto._id, objeto)
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  eliminarId(tipo: string, id: number): Observable<boolean> {
    return this._http
      .delete(this.url + tipo + "/" + id)
      .catch((error: any) => Observable.throw(error || "Server error"));
  }
  get(tipo: string) {
    return this._http
      .get(this.url + tipo)
      .catch((error: any) => Observable.throw(error || "Server error"));
  }
  post(tipo: string, objeto: any): Observable<any> {
    return this._http
      .post(this.url + tipo, objeto)
      .catch((error: any) => Observable.throw(error || "Server error"));
  }
  patch(tipo: string, id: any, objeto: any): Observable<any> {
    return this._http
      .patch(this.url + tipo + "/" + id, objeto)
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

}
