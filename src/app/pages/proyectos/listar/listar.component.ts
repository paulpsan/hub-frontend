import { FormGroup, FormControl } from "@angular/forms";
import { HubInterceptor } from "../../../common/interceptor/hub.interceptor";
import { Component, OnInit, Inject, HostBinding } from "@angular/core";
import { Router } from "@angular/router";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  PageEvent
} from "@angular/material";
import { Observable } from "rxjs";
import "rxjs";

import { Proyecto } from "../../../models/proyecto";
import { HttpService } from "../../../services/http/http.service";
import { ProyectosService } from "../../../services/proyecto/proyectos.service";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "hub-listar",
  templateUrl: "./listar.component.html",
  styleUrls: ["./listar.component.css"]
})
export class ListarComponent implements OnInit {
  public respuesta: any;
  public mostrarToggle: boolean = false;
  public idSelect;
  public paginacion;
  public buscar = "";
  public ordenar;
  public pagina = 1;
  public limite = 10;
  public total;
  public pageSizeOptions = [5, 10, 25, 100];
  public pageEvent: PageEvent;
  public dominio;
  proyectos: any[];
  starList: boolean[] = [true, true, true, true, true]; // create a list which contains status of 5 stars

  constructor(
    private _proyectosService: ProyectosService,
    private router: Router,
    private dialog: MatDialog,
    private _httpService: HttpService
  ) {
    this.dominio = environment.gitlabAdmin.domain
    this.paginacion = {
      pagina: "1",
      limite: "2"
    };
  }
  ngOnInit() {
    this.obtenerDatos();
  }
  obtenerProyectos() {
    this._httpService.obtener("proyectos").subscribe(
      result => {
        this.respuesta = result;
        this.proyectos = this.respuesta.datos;
        this.proyectos = this.proyectos.map(proyecto => {
          return proyecto.titular = proyecto.path.replace(proyecto.nombre, '')
        })
        console.log(this.proyectos);
      },
      err => {
        console.log(err);
      }
    );
  }
  obtenerDatos(event?: PageEvent) {
    let pagData;
    if (event == null) {
      pagData = {
        ordenar: "nombre",
        pagina: 1,
        limite: 10
      };
    } else {
      pagData = {
        ordenar: "nombre",
        pagina: event.pageIndex + 1,
        limite: event.pageSize
      };
    }
    if (this.buscar != "") {
      pagData.buscar = this.buscar;
    }
    this._httpService.obtenerPaginado("proyectos", pagData).subscribe(
      result => {
        this.respuesta = result;
        this.proyectos = this.respuesta.datos;
        this.total = this.respuesta.paginacion.total;
        this.pagina = this.respuesta.paginacion.paginaActual - 1;
        this.limite = this.respuesta.paginacion.limite;
        this.proyectos = this.proyectos.map(proyecto => {
          proyecto.titular = proyecto.path.split('/')[0]
          return proyecto
        })
        console.log(this.proyectos);
      },
      err => {
        console.log(err);
      }
    );
  }

  // obtenerProyectosPag(){
  //   console.log(this.paginacion.pagina);
  //   this._httpService.obtenerPaginado('proyectos',this.paginacion).subscribe(
  //     result =>{
  //       this.respuesta=result;
  //       this.proyectos=this.respuesta.datos;
  //       console.log (this.respuesta.datos);
  //     },
  //     err =>{
  //       console.log(err);
  //     }
  //   )
  // }
  mostrar(proyecto: Proyecto) {
    this.idSelect = proyecto._id;
    this.mostrarToggle = !this.mostrarToggle;
  }

  irProyecto(proyecto: Proyecto) {
    if (proyecto) {
      this.router.navigate(["/proyectos", proyecto._id]);
    }
  }

  importar() {
    this.router.navigate(["/proyectos/importar"]);
  }
  nuevo() {
    this.router.navigate(["/proyectos/nuevo"]);
  }
}
