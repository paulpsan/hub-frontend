import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService, UsuarioService, MessageDataService } from '../../../../services/service.index';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../../../../shared/snackbar/snackbar.component';

@Component({
  selector: 'hub-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  solicitudFrom: FormGroup
  usuario;
  solicitud;
  estado: boolean = false
  constructor(
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
      entidad: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.minLength(5)),
      path: new FormControl("", Validators.required),
      cargo: new FormControl("", Validators.required),
    });

  }
  onSubmit() {

    let data = {
      fk_usuario: this.usuario._id,
      entidad: this.solicitudFrom.controls["entidad"].value,
      descripcion: this.solicitudFrom.controls["descripcion"].value,
      path: this.solicitudFrom.controls["path"].value,
      cargo: this.solicitudFrom.controls["cargo"].value,
    }
    this._httpService.post("solicitudes", data).subscribe(
      (result: any) => {
        console.log(result);
        const objMessage = {
          text: "Su solicitud se realizo exitosamente,''",
          type: "Info",
        }
        this._messageDataService.changeMessage(objMessage);
        this.snackBar.openFromComponent(SnackbarComponent, {
          horizontalPosition: 'right',
          verticalPosition: "top",
          panelClass: "background-success",
          duration: 5000
        });
      },
      err => {
        const objMessage = {
          text: err,
          type: "Info",
        }
        this._messageDataService.changeMessage(objMessage);
        this.snackBar.openFromComponent(SnackbarComponent, {
          horizontalPosition: 'right',
          verticalPosition: "top",
          panelClass: "background-warning",
          duration: 5000
        });
        console.log(err);
      }
    );
  }
}
