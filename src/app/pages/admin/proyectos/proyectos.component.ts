import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material";
import { HttpService, UsuarioService } from "../../../services/service.index";
import { Router } from "@angular/router";

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
    private router: Router
  ) {}

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
    this._httpService.buscarId("usuarios", this.usuario._id).subscribe(resp => {
      this.usuario = resp;
    });
  }
  changeSelect(event, proyecto) {
    console.log(event);
    proyecto.change = true;
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

  eliminar(usuario) {}
}
