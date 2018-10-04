import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  HttpService,
  UsuarioService,
  MessageDataService
} from "../../../../services/service.index";
import { MatSnackBar } from "@angular/material";
import { SnackbarComponent } from "../../../../shared/snackbar/snackbar.component";

@Component({
  selector: "hub-admin-proyectos-grupo",
  templateUrl: "./admin-proyectos-grupo.component.html",
  styleUrls: ["./admin-proyectos-grupo.component.css"]
})
export class AdminProyectosGrupoComponent implements OnInit {
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
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params["id"];
      this._httpService.buscarId("grupos", this.id).subscribe(grupo => {
        this.grupo = grupo
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
      })
      this.obtenerDatos();
    });
  }
  obtenerDatos() {
    this._httpService.obtener(`grupos/${this.id}/proyectos`).subscribe(resp => {
      this.proyectos = resp;
      console.log(this.permisosProyecto);
    });
  }
  guardar(proyecto) {
    console.log(proyecto);
    proyecto.request = "start";
    proyecto.change = false;
    this._httpService.editar(`grupos/${this.grupo._id}/proyectos`, proyecto).subscribe(
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

  eliminar(proyecto) {
    if (confirm("Esta seguro de eliminar el Proyecto: " + proyecto.nombre)) {
      console.log(proyecto);
      proyecto.request = "start";
      proyecto.change = false;
      this._httpService.eliminarId(`grupos/${this.grupo._id}/proyectos`, proyecto._id).subscribe(
        result => {
          console.log(result);
          proyecto.request = "ok";
          this.obtenerDatos();
        },
        err => {
          console.log(err);
          proyecto.request = "error";
          const objMessage = {
            text: err.error.message,
            type: "Info"
          };
          this._messageDataService.changeMessage(objMessage);
          this.snackBar.openFromComponent(SnackbarComponent, {
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: "background-warning",
            duration: 5000
          });

          this.obtenerDatos();
        }
      );
    }
  }
}
