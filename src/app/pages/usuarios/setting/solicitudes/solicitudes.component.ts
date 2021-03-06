import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  HttpService,
  UsuarioService,
  MessageDataService
} from "../../../../services/service.index";
import { MatSnackBar } from "@angular/material";
import { SnackbarComponent } from "../../../../shared/snackbar/snackbar.component";
import { Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: "hub-solicitudes",
  templateUrl: "./solicitudes.component.html",
  styleUrls: ["./solicitudes.component.css"]
})
export class SolicitudesComponent implements OnInit, OnDestroy {
  solicitudFrom: FormGroup;
  usuario;
  solicitud;
  dominio;
  estado: boolean = false;
  subscription;
  constructor(
    private router: Router,
    private _httpService: HttpService,
    private _usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private _messageDataService: MessageDataService
  ) {
    this.dominio = environment.gitlabAdmin.domain;
  }

  ngOnInit() {
    this.subscription = this._usuarioService.usuario$.subscribe(repUsuario => {
      this.usuario = repUsuario;
      console.log(this.usuario);
    });
    this.solicitudFrom = new FormGroup({
      institucion: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.minLength(5)),
      path: new FormControl("", Validators.required),
      cargo: new FormControl("", Validators.required)
    });
    this.getSolicitud();
  }
  onSubmit() {
    let data = {
      fk_usuario: this.usuario._id,
      institucion: this.solicitudFrom.controls["institucion"].value,
      descripcion: this.solicitudFrom.controls["descripcion"].value,
      path: this.solicitudFrom.controls["path"].value,
      cargo: this.solicitudFrom.controls["cargo"].value,
      estado: "solicitado"
    };
    let noValido = / /;
    if (!noValido.test(data.path)) {
      this._httpService.post("solicitudes", data).subscribe(
        (result: any) => {
          console.log(result);
          const objMessage = {
            text: "Su solicitud se realizo exitosamente,''",
            type: "Info"
          };
          this._messageDataService.changeMessage(objMessage);
          this.snackBar.openFromComponent(SnackbarComponent, {
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: "background-success",
            duration: 5000
          });
          this.getSolicitud();
          this.estado = false;
        },
        err => {
          console.log(err);
          const objMessage = {
            text: err.message,
            type: "Info"
          };
          if (err.error) {
            objMessage.text = err.error.message;
          }

          this._messageDataService.changeMessage(objMessage);
          this.snackBar.openFromComponent(SnackbarComponent, {
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: "background-warning",
            duration: 5000
          });
          console.log(err);
        }
      );
    } else {
      const objMessage = {
        text: "El Path no debe contener espacios",
        type: "Info"
      };
      this._messageDataService.changeMessage(objMessage);
      this.snackBar.openFromComponent(SnackbarComponent, {
        horizontalPosition: "right",
        verticalPosition: "top",
        panelClass: "background-warning",
        duration: 5000
      });
      this.solicitudFrom.controls["path"].setValue("");
    }
  }
  getSolicitud() {
    this._httpService.buscarId("solicitudes", this.usuario._id).subscribe(
      resp => {
        console.log(resp.length);
        this.solicitud = resp;
      },
      err => {
        console.log(err);
        if (err.status == 404) {
          this.solicitud = err.statusText;
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
