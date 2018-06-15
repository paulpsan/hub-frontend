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

  obtener(nombre: string): Observable<any[]> {
    return this._http
      .get(this.url + nombre)
      .map((res: Response) => {
        return res;
      })
      .catch((error: any) => Observable.throw(error || "Server error"));
  }
  //obtiene y busca datos de forma general
  obtenerPaginado(nombre: string, obj): Observable<any[]> {
    let myParams = new HttpParams();
    if (obj.buscar != undefined) {
      myParams = myParams.append("buscar", obj.buscar);
    }
    myParams = myParams.append("ordenar", obj.ordenar);
    myParams = myParams.append("pagina", obj.pagina);
    myParams = myParams.append("limite", obj.limite);
    return this._http
      .get(this.url + nombre + "?tsp=" + Date.now(), { params: myParams })
      .map((res: Response) => {
        return res;
      })
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  obtenerUsuarios(nombre: string, repo: any, token: any): Observable<any> {
    return this._http
      .post(this.url + nombre + "/usuarios/" + repo.id, { repo, token })
      .map((res: Response) => {
        return res;
      })
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  buscarId(nombre: string, id: number): Observable<any> {
    let headers = new Headers({ "Content-Type": "application/json" });
    return this._http
      .get(this.url + nombre + "/" + id + "?tsp=" + Date.now())
      .map((res: Response) => {
        return res;
      })
      .catch((error: any) => Observable.throw(error || "Error"));
  }

  post(nombre: string, objeto: any): Observable<any> {
    return this._http
      .post(this.url + nombre, objeto)
      .map((res: Response) => {
        return res;
      })
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  adicionar(nombre: string, objeto: any): Observable<any> {
    return this._http
      .post(this.url + nombre, objeto)
      .map((res: Response) => {
        return res;
      })
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  editar(nombre: string, objeto: any): Observable<any[]> {
    return this._http
      .patch(this.url + nombre + "/" + objeto._id, objeto)
      .map((res: Response) => {
        return res;
      })
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  eliminarId(nombre: string, id: number): Observable<boolean> {
    return this._http
      .delete(this.url + nombre + "/" + id)
      .map((res: Response) => {
        return res;
      })
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

}