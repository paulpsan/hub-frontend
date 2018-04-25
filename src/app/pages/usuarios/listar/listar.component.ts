import { HubInterceptor } from "../../../common/interceptor/hub.interceptor";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

import { Usuario } from "../../../models/usuario";
import { HttpService } from "../../../services/http.service";

@Component({
  selector: "hub-listar",
  templateUrl: "./listar.component.html",
  styleUrls: ["./listar.component.css"]
})
export class ListarComponent implements OnInit {
  public respuesta: any;
  public title = "Star Rating";
  public avatar;
  usuarios: any[];
  starList: boolean[] = [true, true, true, true, true]; // create a list which contains status of 5 stars

  constructor(private _httpService: HttpService, private router: Router) {}

  ngOnInit() {
    this.obtenerUsuarios();
  }

  // obtenerUsuarios(){
  //   this._httpService.obtener().subscribe(
  //     result =>{
  //       this.usuarios=result.datos;
  //       console.log (result);
  //     },
  //     err =>{
  //       console.log(err);
  //     }
  //   )
  // }
  // Recibe de respuesta un objeto de tipo Usuarios

  //Setea estrellas haciendo click
  // setStar(data: any) {
  //   this.rating = data + 1;
  //   for (var i = 0; i <= 4; i++) {
  //     if (i <= data) {
  //       this.starList[i] = false;
  //     } else {
  //       this.starList[i] = true;
  //     }
  //   }
  // }
  obtenerCommits() {
    for (const usuario of this.usuarios) {
      let commits = 0;
      let lenguajes = [];
      for (const repo of usuario.datos) {
        commits += repo.commits.length;
        if (usuario.tipo == "github") {
          let cadena = JSON.stringify(repo.lenguajes).split('"');
          for (let index = 0; index < cadena.length; index++) {
            if (index % 2 != 0) {
              if (lenguajes.indexOf(cadena[index]) == -1) {
                lenguajes.push(cadena[index]);
              }
            }
          }
        } else {
          lenguajes.push(repo.lenguajes);
        }
      }
      usuario.commits = commits;
      usuario.lenguajes = lenguajes;
    }
    console.log(this.usuarios);
  }
  obtenerLenguajes() {}

  obtenerUsuarios() {
    this._httpService.obtener("usuarios").subscribe(
      result => {
        this.respuesta = result;
        this.usuarios = this.respuesta.datos;
        this.obtenerCommits();
        this.obtenerLenguajes();
        console.log(result);
      },
      err => {
        console.log(err);
      }
    );
  }
  irUsuario(usuario) {
    switch (usuario.tipo) {
      case "github": {
        this.router.navigate(["/usuarios/", usuario._id]);
        //statements;
        break;
      }
      case "gitlab": {
        this.router.navigate(["/usuarios/", usuario._id]);
        //statements;
        break;
      }
      case "bitbucket": {
        this.router.navigate(["/usuarios/bitbucket", usuario._id]);
        //statements;
        break;
      }
      default: {
        this.router.navigate(["/usuarios/", usuario._id]);
        break;
      }
    }
  }

  adicionarUsuario() {
    this.router.navigate(["/usuarios/adicionar"]);
  }
}
