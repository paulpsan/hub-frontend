import { Component, OnInit , Injectable} from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { GLOBAL } from './global';
import { Proyecto } from '../models/proyecto';


@Injectable()
export class ProyectosService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
    // this.url = 'https://gitlab.geo.gob.bo/api/v4/projects/';

  }
  getProyectos(){
    let myParams = new HttpParams();
    myParams=myParams.append('pagina','1');
    myParams=myParams.append('limite','2');
    console.log(myParams);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    // headers.append('Authorization', pin);
    // let options = new RequestOptions({ headers: headers });
    return this._http.get(this.url+'proyectos'+'?tsp='+Date.now(),{params:myParams})
    .map((res:Response)=>{
      return res;
    })
    .catch((error:any)=>Observable.throw(error || 'Server error'))

  }
  buscarId(id:number):Observable<Proyecto>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http.get(this.url+'proyectos/' + id)
    .map((res:Response) => {return res})
    .catch((error:any) => Observable.throw(error || 'Error'));
  }

  adicionar(proyecto:Proyecto):Observable<Proyecto>{
    return this._http.post(this.url+'proyectos', proyecto)
    .map((res:Response) => {return res})
    .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  editar(proyecto:Proyecto):Observable<Proyecto[]>{
    return this._http.put(this.url+'proyectos/'+proyecto._id , proyecto)
    .map((res:Response) => {return res})
    .catch((error:any) => Observable.throw(error || 'Server error'));
  }
  eliminarId(id: number): Observable<boolean> {
    return this._http.delete(this.url+'proyectos/' + id)
      .map((res:Response) =>{return res})
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

}
