import { Component, Injectable} from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { GLOBAL } from './global';
import { Usuario }from '../models/usuario'

@Injectable()
export class UsuariosService {
  private url: string;
  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
    // this.url ='https://test.adsib.gob.bo/api_backend/api/usuarios';
  }
  obtener():Observable<Usuario[]>{
    // let headers = new Headers({ 'Content-Type': 'application/json' });

    return this._http.get(this.url+'usuarios'+'?tsp='+Date.now())
    .map((res:Response)=>{
      return res;
    })
    .catch((error:any)=>Observable.throw(error || 'Server error'))
  }

  buscarId(id:number):Observable<Usuario>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http.get(this.url+'usuarios/' + id)
    .map((res:Response) => {return res})
    .catch((error:any) => Observable.throw(error || 'Error'));
  }

  adicionar(usuario:Usuario):Observable<Usuario>{
    return this._http.post(this.url+'usuarios', usuario)
    .map((res:Response) => {return res})
    .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  editar(usuario:Usuario):Observable<Usuario[]>{
    return this._http.put(this.url+'usuarios/'+usuario._id , usuario)
    .map((res:Response) => {return res})
    .catch((error:any) => Observable.throw(error || 'Server error'));
  }
  eliminarId(id: number): Observable<boolean> {
    return this._http.delete(this.url+'usuarios/' + id)
      .map((res:Response) =>{return res})
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  // obtener(){
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   // headers.append('Authorization', pin);
  //   // let options = new RequestOptions({ headers: headers });
  //   return this._http.get(this.url).map(res => res.json());
  // }
}
