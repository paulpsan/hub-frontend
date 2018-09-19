import { Component, OnInit } from "@angular/core";
import { HttpService, MessageDataService } from "../../../services/service.index";
import { PageEvent, MatSnackBar } from "@angular/material";
import { SnackbarComponent } from "../../../shared/snackbar/snackbar.component";

@Component({
  selector: "hub-solicitudes",
  templateUrl: "./solicitudes.component.html",
  styleUrls: ["./solicitudes.component.css"]
})
export class SolicitudesComponent implements OnInit {
  public solicitudes;
  public respuesta;
  public buscar = "";
  public ordenar;
  public pagina = 1;
  public limite = 10;
  public total;
  constructor(private _httpService: HttpService,
    private snackBar: MatSnackBar,
    private _messageDataService: MessageDataService) { }

  ngOnInit() {
    this.obtenerDatos();
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
    this._httpService.obtenerPaginado("solicitudes", pagData).subscribe(
      result => {
        this.respuesta = result;
        this.total = this.respuesta.paginacion.total;
        this.pagina = this.respuesta.paginacion.paginaActual - 1;
        this.limite = this.respuesta.paginacion.limite;
        this.solicitudes = this.respuesta.datos;
        this.solicitudes.map(solicitud => {
          solicitud.request = "";
          solicitud.change = false;
          return solicitud;
        });
      },
      err => {
        console.log(err);
      }
    );
  }
  setAdmin(solicitud) {
    solicitud.request = "start";
    solicitud.change = false;
    solicitud.estado = "aprobado";
    this._httpService.editar("solicitudes", solicitud).subscribe(
      resp => {
        solicitud = resp
        solicitud.request = "ok";
      },
      err => {
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
        solicitud.request = "error";
        console.log(err);
      }
    );
  }
}
