import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import "rxjs";
import "rxjs/add/observable/throw";

import { Observable, BehaviorSubject } from "rxjs";
import { environment } from "../../../environments/environment";
import { Usuario } from "../../models/usuario";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import { Router } from "@angular/router";

@Injectable()
export class UsuarioService {
  private url: string;
  private token: string;
  private usuario: BehaviorSubject<any> = new BehaviorSubject({});
  public usuario$: Observable<any> = this.usuario.asObservable();

  constructor(
    private _http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.url = environment.url;
    this.getCurrentUser().then(exists => {
      let usuario = exists;
      if (usuario) {
        this.usuario.next(usuario);
      }
    });
  }
  guardarStorage(usuario: Usuario, token?: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    this.usuario.next(usuario);
  }

  getCurrentUser() {
    if (JSON.parse(localStorage.getItem("usuario")) == null) {
      return Promise.resolve(false);
    }
    return new Promise((resolve, reject) => {
      resolve(JSON.parse(localStorage.getItem("usuario")));
    });
  }

  isCompleteInfo() {
    let user = JSON.parse(localStorage.getItem("usuario"));
    let respuesta = []
    if(user){
      if (!user.nombre||user.nombre==="") {
        respuesta.push("Complete el campo del Nombre")
      }
      if (!user.descripcion||user.descripcion==="") {
        respuesta.push("Complete el campo del Descripcion")
      }
      if (!user.email||user.email==="" ) {
        respuesta.push("Complete el campo del Email")
      }
    }
    return respuesta
  }

  addUserOauth(type: string, object) {
    return new Promise((resolve, reject) => {
      this._http.post(this.url + `auth/add/${type}`, object).subscribe(
        usuarioAdd => {
          console.log(usuarioAdd);
          localStorage.setItem("usuario", JSON.stringify(usuarioAdd));
          this.usuario.next(usuarioAdd);
          resolve(true);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  actualizarUsuario(usuario) {
    let urlApi = this.url + "usuarios/" + usuario._id;
    return new Promise((resolve, reject) => {
      this._http.patch(urlApi, usuario).subscribe(
        usuarioPatch => {
          localStorage.setItem("usuario", JSON.stringify(usuarioPatch));
          this.usuario.next(usuarioPatch);
          resolve(true);
        },
        error => {
          reject(Observable.throw(error));
        }
      );
    });
  }

  singOauth(tipo: string, usuarioOauth, token) {
    return this._http
      .post(this.url + "usuarios/oauth/" + tipo, { usuarioOauth, token })
      .catch((error: any) => {
        console.log(error);
        return Observable.throw(error || "Server error");
      });
  }

  adiUsuarioOauth(tipo: string, usuario, token) {
    return this._http
      .put(this.url + "usuarios/oauth" + tipo, { usuario, token, tipo })
      .catch((error: any) => {
        return Observable.throw(error || "Server error");
      });
  }

  logout() {
    // this.usuario = null;
    this.token = "";
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("action");
    localStorage.removeItem("type");
    localStorage.removeItem("isLoadinData");
    this.router.navigate(["/login"]);
  }

  login(usuario: Usuario) {
    let urlApi = this.url + "auth/local";
    return new Promise((resolve, reject) => {
      this._http.post(urlApi, usuario).subscribe(
        (respuesta: any) => {
          //guardamos a al local storage
          console.log(respuesta);
          localStorage.setItem("usuario", JSON.stringify(respuesta.usuario));
          localStorage.setItem("token", respuesta.token);
          this.usuario.next(respuesta.usuario);
          resolve(true);
        },
        (error: Response) => {
          reject(error);
        }
      );
    });
  }
}
