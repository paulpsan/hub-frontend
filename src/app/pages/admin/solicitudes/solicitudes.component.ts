import { Component, OnInit, Inject } from "@angular/core";
import {
  HttpService,
  MessageDataService
} from "../../../services/service.index";
import {
  PageEvent,
  MatSnackBar,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from "@angular/material";
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
  public pageSizeOptions = [5, 10, 25, 100];
  public total;
  constructor(
    private _httpService: HttpService,
    private snackBar: MatSnackBar,
    private _messageDataService: MessageDataService,
    private dialog: MatDialog
  ) { }

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
  aprobar(solicitud) {
    let obj = solicitud;
    solicitud.request = "start";
    solicitud.change = false;
    solicitud.estado = "aprobado";
    this._httpService
      .post(`solicitudes/${solicitud._id}/aprobar`, solicitud)
      .subscribe(
        (resp: any) => {
          solicitud.estado = resp.estado;
          solicitud.request = "ok";
          console.log(solicitud);
          this.obtenerDatos();
          const objMessage = {
            text: "El Usuario ha sido Aprobado para ser Titular",
            type: "Info"
          };
          this._messageDataService.changeMessage(objMessage);
          this.snackBar.openFromComponent(SnackbarComponent, {
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: "background-success",
            duration: 5000
          });
        },
        err => {
          console.log(err);
          const objMessage = {
            text: err.error.message,
            type: "Info"
          };
          this.obtenerDatos();
          this._messageDataService.changeMessage(objMessage);
          this.snackBar.openFromComponent(SnackbarComponent, {
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: "background-warning",
            duration: 5000
          });
          solicitud.request = "error";
          solicitud.estado = "solicitado";

          console.log(err);
        }
      );
  }
  rechazar(solicitud) {
    solicitud.request = "start";
    solicitud.change = false;
    solicitud.estado = "rechazado";
    let dialogRef = this.dialog.open(ModalTextSolicitud, {
      width: "450px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        solicitud.motivo = result;
        this._httpService
          .post(`solicitudes/${solicitud._id}/rechazar`, solicitud)
          .subscribe(
            (resp: any) => {
              solicitud.request = "ok";
              this.obtenerDatos();
              const objMessage = {
                text: "La Solicitud del Usuario ha sido rechazado",
                type: "Info"
              };
              this._messageDataService.changeMessage(objMessage);
              this.snackBar.openFromComponent(SnackbarComponent, {
                horizontalPosition: "right",
                verticalPosition: "top",
                panelClass: "background-success",
                duration: 5000
              });
            },
            err => {
              console.log(err);
              this.obtenerDatos();
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
    });
  }
}

@Component({
  selector: "modal-text-solicitud",
  templateUrl: "modal-text-solicitud.html"
})
export class ModalTextSolicitud {
  motivo;
  constructor(
    public dialogRef: MatDialogRef<ModalTextSolicitud>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  cancelarClick(): void {
    this.dialogRef.close();
  }
}
