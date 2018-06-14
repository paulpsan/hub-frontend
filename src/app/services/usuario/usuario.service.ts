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
      this.usuario = JSON.parse(localStorage.getItem("identity"));
    } else {
      this.token = "";
      this.usuario = null;
    }
    console.log("cargo storage", this.usuario);
  }
  guardarStorage(id: string, usuario: Usuario, token?: string) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    console.log(usuario);
    localStorage.setItem("identity", JSON.stringify(usuario));

    this.usuario = usuario;
    // this.token = token;
  }
  actualizarUsuario(usuario) {
    let urlApi = this.url + "usuarios/" + usuario._id;
    // url += '?token=' + this.token;

    return this._http
      .patch(urlApi, usuario)
      .map((resp: any) => {
        console.log(this.usuario, resp);
        if (usuario._id === this.usuario._id) {
          let usuarioDB = resp;
          this.guardarStorage(usuarioDB.id, usuarioDB);
        }
        return true;
      })
      .catch(err => {
        return Observable.throw(err);
      });
  }
  crearUsuarioOauth(nombre: string, usuario, token) {
    return this._http
      .post(this.url + "usuarios/" + nombre, { usuario, token })
      .map((res: any) => {
        this.guardarStorage(res.usuario._id, res.usuario, res.token);
        return res;
      })
      .catch((error: any) => {
        console.log(error);
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
    return this._http
      .post(urlApi, usuario)
      .map((resp: any) => {
        this.guardarStorage(resp.usuario.id, resp.usuario, resp.token);
        return resp;
      })
      .catch(err => {
        return Observable.throw(err);
      });
  }
}
