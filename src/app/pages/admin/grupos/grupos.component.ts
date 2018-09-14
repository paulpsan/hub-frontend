import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { HttpService } from '../../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'hub-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

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
  public grupos;

  constructor(private _httpService: HttpService, private router: Router) { }

  ngOnInit() {

    this.obtenerDatos();
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
    this._httpService.obtenerPaginado("grupos", pagData).subscribe(
      result => {
        this.respuesta = result;
        this.total = this.respuesta.paginacion.total;
        this.pagina = this.respuesta.paginacion.paginaActual - 1;
        this.limite = this.respuesta.paginacion.limite;
        this.grupos = this.respuesta.datos;
        this.grupos.map(grupos => {
          return grupos.request = ""
        })

      },
      err => {
        console.log(err);
      }
    );
  }
}