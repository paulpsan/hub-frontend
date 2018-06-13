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
    this.cargarStorage();
  }
  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("identity"));
      // this.menu = JSON.parse(localStorage.getItem("menu"));
    } else {
      this.token = "";
      this.usuario = null;
      // this.menu = [];
    }
    console.log("cargo storage",this.usuario);
  }
  guardarStorage(usuario, menu?: any) {
    // localStorage.setItem('id', id );
    // localStorage.setItem("token", token);
    console.log(usuario);
    localStorage.setItem("identity", JSON.stringify(usuario));
    // localStorage.setItem('menu', JSON.stringify(menu) );

    this.usuario = usuario;
    // this.token = token;
    // this.menu = menu;
  }
  actualizarUsuario(usuario) {
    let url = environment.url + "usuarios/" + usuario._id;
    // url += '?token=' + this.token;

    return this._http
      .patch(url, usuario)
      .map((resp: any) => {
        console.log(this.usuario,resp);
        if (usuario._id === this.usuario._id) {
          let usuarioDB = resp;
          this.guardarStorage(usuarioDB);
        }
        return true;
      })
      .catch(err => {
        return Observable.throw(err);
      });
  }
}
