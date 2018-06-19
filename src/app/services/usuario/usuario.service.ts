import { Component, Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import "rxjs/Rx";
import { Observable } from "rxjs/Rx";
import { environment } from "../../../environments/environment";
import { Usuario } from "../../models/usuario";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import { Router } from "@angular/router";

@Injectable()
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any[] = [];
  private url: string;

  constructor(
    private _http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.url = environment.url;
    this.cargarStorage();
  }
  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
    } else {
      this.token = "";
      this.usuario = null;
    }
    console.log("cargo storage", this.usuario);
  }
  guardarStorage(id: string, usuario: Usuario, token?: string) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));

    this.usuario = usuario;
    // this.token = token;
  }
  actualizarUsuario(usuario) {
    let urlApi = this.url + "usuarios/" + usuario._id;
    // url += '?token=' + this.token;

    return this._http
      .patch(urlApi, usuario)
      .map((resp: any) => {
        if (usuario._id === this.usuario._id) {
          console.log(this.usuario, resp);
          this.guardarStorage(resp.id, resp);
        }
        return resp;
      })
      .catch(err => {
        return Observable.throw(err);
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
    this.usuario = null;
    this.token = "";
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    this.router.navigate(["/login"]);
  }
  login(usuario: Usuario) {
    let urlApi = this.url + "auth/local";
    return this._http.post(urlApi, usuario).catch(err => {
      return Observable.throw(err);
    });
  }
}
