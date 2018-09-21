import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material";
import { HttpService, UsuarioService } from "../../../services/service.index";
import { Router } from "@angular/router";

@Component({
  selector: "hub-admin-grupos",
  templateUrl: "./admin-grupos.component.html",
  styleUrls: ["./admin-grupos.component.css"]
})
export class AdminGruposComponent implements OnInit {
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
  public grupos = [];
  permisosGrupo = [
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
    this._httpService.obtenerPaginado("grupos", pagData).subscribe(resp => {
      this.respuesta = resp;
      this.total = this.respuesta.paginacion.total;
      this.pagina = this.respuesta.paginacion.paginaActual - 1;
      this.limite = this.respuesta.paginacion.limite;
      this.grupos = this.respuesta.datos;
    });
    this._httpService.buscarId("usuarios", this.usuario._id).subscribe(resp => {
      this.usuario = resp;
    });
  }
  changeSelect(event, grupo) {
    console.log(event);
    grupo.change = true;
  }
  guardar(grupo) {
    console.log(grupo);
    grupo.request = "start";
    grupo.change = false;
    this._httpService.editar("grupos", grupo).subscribe(
      result => {
        console.log(result);
        grupo.request = "ok";
        this.obtenerDatos();
      },
      err => {
        console.log(err);
        grupo.request = "error";
        this.obtenerDatos();
      }
    );
  }

  eliminar(usuario) {}
}
