import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  HttpService,
  MessageDataService
} from "../../../services/service.index";
import { MatSnackBar } from "@angular/material";
import { SnackbarComponent } from "../../snackbar/snackbar.component";

@Component({
  selector: "hub-input-usuario",
  templateUrl: "./usuario.component.html",
  styleUrls: ["./usuario.component.css"]
})
export class UsuarioComponent implements OnInit {
  userForm: FormGroup;
  usuariosSearch;
  usuario;
  permisosUsuario = [
    // { nombre: "propietario", rol: "owner", access: "50" },
    // { nombre: "mantenedor", rol: "maintainer", access: "40" },
    { nombre: "desarrollador", rol: "developer", access: "30" },
    { nombre: "reportero", rol: "reporter", access: "20" },
    { nombre: "invitado", rol: "guest", access: "10" }
  ];
  @Output()
  emitUser = new EventEmitter<any>();
  constructor(
    private _httpService: HttpService,
    private snackBar: MatSnackBar,
    private _messageDataService: MessageDataService
  ) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      nombre: new FormControl("", Validators.required),
      permiso: new FormControl("", Validators.required)
    });
    this.userForm.controls["nombre"].valueChanges.subscribe(resp => {
      let pagData = {
        ordenar: "nombre",
        pagina: 1,
        limite: 10,
        buscar: resp
      };
      this._httpService.obtenerPaginado("usuarios", pagData).subscribe(
        (result: any) => {
          this.usuariosSearch = result.datos;
        },
        err => {
          console.log(err);
        }
      );
    });
  }
  guardar() {
    let usuario = this.usuariosSearch.find(user => {
      return user.nombre == this.userForm.controls["nombre"].value;
    });
    console.log(usuario);
    if (!usuario) {
      const objMessage = {
        text: "No existe el usuario.",
        type: "Advertencia"
      };
      this._messageDataService.changeMessage(objMessage);
      this.snackBar.openFromComponent(SnackbarComponent, {
        horizontalPosition: "right",
        verticalPosition: "top",
        panelClass: "background-warning",
        duration: 5000
      });
    } else {
      let usuarioEmit = {
        _id: usuario._id,
        nombre: usuario.nombre,
        usuarioGitlab: usuario.usuarioGitlab,
        access_level: this.userForm.controls["permiso"].value,
        nombre_permiso: this.permisosUsuario.find(
          permiso => permiso.access == this.userForm.controls["permiso"].value
        ).nombre
      };
      this.emitUser.emit(usuarioEmit);
    }
    this.userForm.reset();
  }
  onSubmit() {

  }
}
