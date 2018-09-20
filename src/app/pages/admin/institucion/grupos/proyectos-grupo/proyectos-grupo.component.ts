import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  HttpService,
  UsuarioService,
  MessageDataService
} from "../../../../../services/service.index";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "hub-proyectos-grupo",
  templateUrl: "./proyectos-grupo.component.html",
  styleUrls: ["./proyectos-grupo.component.css"]
})
export class ProyectosGrupoComponent implements OnInit {
  id: any;
  usuario;
  proyectos;
  grupo;
  permisosProyecto = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private _usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private _messageDataService: MessageDataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.obtenerDatos();
    });
  }
  obtenerDatos() {
    this._httpService.obtener(`grupos/${this.id}/proyectos`).subscribe(resp => {
      this.grupo = resp;
      this.permisosProyecto.push({ nombre: "privado", value: "private" });
      if (this.grupo.visibilidad == "internal") {
        this.permisosProyecto.push({
          nombre: "interno",
          value: "internal"
        });
      }
      if (this.grupo.visibilidad == "public") {
        this.permisosProyecto.push({
          nombre: "interno",
          value: "internal"
        });
        this.permisosProyecto.push({
          nombre: "publico",
          value: "public"
        });
      }
      console.log(this.permisosProyecto);
      if (resp.Proyectos.length >= 1) this.proyectos = resp.Proyectos;
      console.log(resp);
    });
  }
  guardar(proyecto) {
    console.log(proyecto);
    proyecto.request = "start";
    proyecto.change = false;
    this._httpService.editar("proyectos", proyecto).subscribe(
      result => {
        console.log(result);
        proyecto.request = "ok";
        this.obtenerDatos();
      },
      err => {
        console.log(err);
        proyecto.request = "error";
        this.obtenerDatos();
      }
    );
  }
  addUser(event) {
    console.log(event);
  }
  eliminar(event) {
    console.log(event);
  }
}
