import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "../../services/http/http.service";
import { MatSnackBar, MatDialog, PageEvent } from "@angular/material";
let qs = require("querystringify");
@Component({
  selector: "hub-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.css"]
})
export class InicioComponent implements OnInit {
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

  proyectos: any[];
  starList: boolean[] = [true, true, true, true, true]; // create a list which contains status of 5 stars

  constructor(
    private router: Router,
    private _httpService: HttpService
  ) {
    this.paginacion = {
      pagina: "1",
      limite: "2"
    };
  }
  ngOnInit() {
    this.obtenerDatos();
  }
  obtenerProyectos() {
    this._httpService.obtener("proyectos/public").subscribe(
      result => {
        this.respuesta = result;
        this.proyectos = this.respuesta.datos;
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
    this._httpService.obtenerPaginado("publicos", pagData).subscribe(
      result => {
        this.respuesta = result;
        this.proyectos = this.respuesta.datos;
        this.total = this.respuesta.paginacion.total;
        this.pagina = this.respuesta.paginacion.paginaActual - 1;
        this.limite = this.respuesta.paginacion.limite;
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
  mostrar(proyecto) {
    this.idSelect = proyecto._id;
    this.mostrarToggle = !this.mostrarToggle;
  }

  irProyecto(proyecto) {
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
