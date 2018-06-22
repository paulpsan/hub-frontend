import { Component, OnInit, Input, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { HttpService } from "../../../../services/http/http.service";

@Component({
  selector: "hub-cuenta",
  templateUrl: "./cuenta.component.html",
  styleUrls: ["./cuenta.component.css"]
})
export class CuentaComponent implements OnInit {
  local: Boolean = false;
  github: Boolean = false;
  gitlab: Boolean = false;
  bitbucket: Boolean = false;
  config;
  @Input() usuario;
  constructor(
    private router: Router,
    private _httpService: HttpService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log(this.usuario);
    this.local = true;
    this.github = this.usuario.id_github;
    this.gitlab = this.usuario.id_gitlab;
    this.bitbucket = this.usuario.id_bitbucket;
    this.config = {
      github: this.usuario.github,
      gitlab: this.usuario.gitlab,
      bitbucket: this.usuario.bitbucket
    };
  }

  desvincular(cadena) {
    let dialogRef = this.dialog.open(ModalEliminarCuenta, {
      width: "450px",
      data: { usuario: this.usuario, tipo: cadena }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
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
    private _httpService: HttpService
  ) {}
  aceptar(): void {
    this._httpService
      .post("repositorios/desvincular/" + this.data.tipo, this.data.usuario)
      .subscribe();
  }
  cancelarClick(): void {
    this.dialogRef.close();
  }
}
