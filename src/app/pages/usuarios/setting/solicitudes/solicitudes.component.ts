import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  HttpService,
  UsuarioService,
  MessageDataService
} from "../../../../services/service.index";
import { MatSnackBar } from "@angular/material";
import { SnackbarComponent } from "../../../../shared/snackbar/snackbar.component";
import { Router } from "@angular/router";

@Component({
  selector: "hub-solicitudes",
  templateUrl: "./solicitudes.component.html",
  styleUrls: ["./solicitudes.component.css"]
})
export class SolicitudesComponent implements OnInit {
  solicitudFrom: FormGroup;
  usuario;
  solicitud;
  estado: boolean = false;
  constructor(
    private router: Router,
    private _httpService: HttpService,
    private _usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private _messageDataService: MessageDataService
  ) { }

  ngOnInit() {
    this._usuarioService.usuario$.subscribe(repUsuario => {
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
        if (err.error.errors) {
          objMessage.text = "Ya esta Solicitado esa URL"
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
  }
  getSolicitud() {
    this._httpService
      .buscarId("solicitudes", this.usuario._id)
      .subscribe(resp => {
        this.solicitud = resp;
      }, err => {
        console.log(err);
        if (err.status == 404) {
          this.solicitud = err.statusText;
        }
      });
  }
}
