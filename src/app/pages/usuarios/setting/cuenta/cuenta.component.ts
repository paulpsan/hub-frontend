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
  gitlab: Boolean = false;
  github: Boolean = false;
  bitbucket: Boolean = false;
  sub;
  id;
  @Input() usuario;
  constructor(
    private router: Router,
    private _httpService: HttpService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log(this.usuario);
    for (const cuenta of this.usuario.cuentas) {
      this.github = cuenta == "github" ? true : false;
      this.gitlab = cuenta == "gitlab" ? true : false;
      this.bitbucket = cuenta == "bitbucket" ? true : false;
    }
  }
  desvincular(cadena) {

    let dialogRef = this.dialog.open(ModalEliminarCuenta, {
      width: "350px",
      data: this.usuario
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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelarClick(): void {
    this.dialogRef.close();
  }
}
