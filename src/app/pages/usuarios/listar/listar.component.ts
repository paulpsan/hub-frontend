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
  usuarios: Usuario[];
  private respuesta: any;
  title = "Star Rating";
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

  obtenerUsuarios() {
    this._httpService.obtener("usuarios").subscribe(
      result => {
        this.respuesta = result;
        this.usuarios = this.respuesta.datos;
        console.log(result);
      },
      err => {
        console.log(err);
      }
    );
  }
  irUsuario(usuario) {
    if (usuario) {
      this.router.navigate(["/usuarios/", usuario._id]);
    }
  }

  adicionarUsuario() {
    this.router.navigate(["/usuarios/adicionar"]);
  }
}
