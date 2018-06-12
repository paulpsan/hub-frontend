import { Component, Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import "rxjs/Rx";
import { Observable } from "rxjs/Rx";
import { environment } from "../../environments/environment";
import { Usuario } from "../models/usuario";
import { SubirArchivoService } from "./subir-archivo.service";
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
    console.log("cargo storage");
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("identity"));
      // this.menu = JSON.parse(localStorage.getItem("menu"));
    } else {
      this.token = "";
      this.usuario = null;
      // this.menu = [];
    }
  }
  guardarStorage(usuario, menu?: any) {
    // localStorage.setItem('id', id );
    // localStorage.setItem("token", token);
    localStorage.setItem("identity", JSON.stringify(usuario));
    // localStorage.setItem('menu', JSON.stringify(menu) );

    this.usuario = usuario;
    // this.token = token;
    // this.menu = menu;
  }
}
