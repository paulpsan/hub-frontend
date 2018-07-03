import { Component, OnInit, Input, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { HttpService } from "../../../../services/http/http.service";
import { UsuarioService } from "../../../../services/service.index";

@Component({
  selector: "hub-cuenta",
  templateUrl: "./cuenta.component.html",
  styleUrls: ["./cuenta.component.css"]
})
export class CuentaComponent implements OnInit {
  usuario;
  local: boolean = false;
  github: boolean = false;
  gitlab: boolean = false;
  bitbucket: boolean = false;
  cuentas: boolean = false;
  config;
  constructor(
    private router: Router,
    private _httpService: HttpService,
    private dialog: MatDialog,
    private _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this._usuarioService.usuario$.subscribe(repUsuario => {
      this.usuario = repUsuario;
    });
    this.local = true;
    this.github = this.usuario.github;
    this.gitlab = this.usuario.gitlab;
    this.bitbucket = this.usuario.bitbucket;
    this.config = {
      github: this.usuario.github,
      gitlab: this.usuario.gitlab,
      bitbucket: this.usuario.bitbucket
    };
    if (((this.github == this.gitlab) == this.bitbucket) == false) {
      this.cuentas = true;
    }
    console.log(this.cuentas);
  }

  desvincular(cadena) {
    let dialogRef = this.dialog.open(ModalEliminarCuenta, {
      width: "450px",
      data: { usuario: this.usuario, tipo: cadena }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.config = {
          github: this.usuario.github,
          gitlab: this.usuario.gitlab,
          bitbucket: this.usuario.bitbucket
        };
        // this._httpService.eliminarId("usuarios", result._id).subscribe(res => {
        //   this.router.navigate(["/login"]);
        // });
      }
    });
  }
}
@Component({
  selector: "modal-eliminar-cuenta",
  templateUrl: "modal-eliminar-cuenta.html"
})
export class ModalEliminarCuenta {
  constructor(
    public dialogRef: MatDialogRef<ModalEliminarCuenta>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private _httpService: HttpService,
    private _usuarioService: UsuarioService
  ) {}
  aceptar(): void {
    switch (this.data.tipo) {
      case "github":
        this.data.usuario.github = false;
        this._usuarioService.actualizarUsuario(this.data.usuario);
        break;
      case "gitlab":
        this.data.usuario.gitlab = false;
        this._usuarioService.actualizarUsuario(this.data.usuario);
        break;
      case "bibucket":
        this.data.usuario.bibucket = false;
        this._usuarioService.actualizarUsuario(this.data.usuario);
        break;
      default:
        break;
    }
    this._httpService
      .post("repositorios/desvincular/" + this.data.tipo, this.data.usuario)
      .subscribe();
  }
  cancelarClick(): void {
    this.dialogRef.close();
  }
}
