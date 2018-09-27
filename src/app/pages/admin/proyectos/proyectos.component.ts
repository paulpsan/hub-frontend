import { Component, OnInit } from "@angular/core";
import { PageEvent, MatSnackBar } from "@angular/material";
import { HttpService, UsuarioService, MessageDataService } from "../../../services/service.index";
import { Router } from "@angular/router";
import { SnackbarComponent } from "../../../shared/snackbar/snackbar.component";

@Component({
  selector: "hub-proyectos",
  templateUrl: "./proyectos.component.html",
  styleUrls: ["./proyectos.component.css"]
})
export class ProyectosComponent implements OnInit {
  public usuario;
  public respuesta: any;
  public title = "Star Rating";
  public avatar;
  public buscar = "";
  public ordenar;
  public pagina = 1;
  public limite = 10;
  public total;
  public pageSizeOptions = [5, 10, 25, 100];
  public pageEvent: PageEvent;
  public proyectos = [];
  permisosProyecto = [
    { nombre: "privado", value: "private" },
    { nombre: "interno", value: "internal" },
    { nombre: "publico", value: "public" }
  ];
  constructor(
    private _httpService: HttpService,
    private _usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar,
    private _messageDataService: MessageDataService
  ) { }

  ngOnInit() {
    this._usuarioService.usuario$.subscribe(respUsuario => {
      this.usuario = respUsuario;
      this.obtenerDatos();
    });
  }
  obtenerDatos(event?: PageEvent) {
    let pagData;
    if (event == null) {
      pagData = {
        ordenar: "estado",
        pagina: 1,
        limite: 10
      };
    } else {
      pagData = {
        ordenar: "estado",
        pagina: event.pageIndex + 1,
        limite: event.pageSize
      };
    }
    if (this.buscar != "") {
      pagData.buscar = this.buscar;
    }
    this._httpService.obtenerPaginado("proyectos", pagData).subscribe(resp => {
      this.respuesta = resp;
      this.total = this.respuesta.paginacion.total;
      this.pagina = this.respuesta.paginacion.paginaActual - 1;
      this.limite = this.respuesta.paginacion.limite;
      this.proyectos = this.respuesta.datos;
    });
    // this._httpService.buscarId("usuarios", this.usuario._id).subscribe(resp => {
    //   this.usuario = resp;
    // });
  }
  changeSelect(event, proyecto) {
    console.log(event);
    proyecto.change = true;
  }
  guardar(proyecto) {
    console.log(proyecto);
    proyecto.request = "start";
    proyecto.change = false;
    let url = proyecto.Grupos.length >= 1 ? `grupos/${proyecto.Grupos[0]._id}/proyectos` : `proyectos`

    this._httpService.editar(url, proyecto).subscribe(
      result => {
        console.log(result);
        proyecto.request = "ok";
        this.obtenerDatos();
      },
      err => {
        console.log(err);
        proyecto.request = "error";
        console.log(err);
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

  eliminar(proyecto) {
    if (confirm("Esta seguro de eliminar el Proyecto: " + proyecto.nombre)) {
      console.log(proyecto);
      proyecto.request = "start";
      proyecto.change = false;

      let url = proyecto.Grupos.length >= 1 ? `grupos/${proyecto.Grupos[0]._id}/proyectos` : `proyectos`
      console.log(url);
      this._httpService.eliminarId(url, proyecto._id).subscribe(
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
