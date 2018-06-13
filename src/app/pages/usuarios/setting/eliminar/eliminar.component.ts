import { Component, OnInit, Inject, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { HttpService } from "../../../../services/http/http.service";

@Component({
  selector: "hub-eliminar",
  templateUrl: "./eliminar.component.html",
  styleUrls: ["./eliminar.component.css"]
})
export class EliminarComponent implements OnInit {
  @Input() usuario;

  constructor(
    private router: Router,
    private _httpService: HttpService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  eliminarUsuario(usuario: any): void {
    console.log(usuario);
    let dialogRef = this.dialog.open(ModalEliminarUsuario, {
      width: "350px",
      data: usuario
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this._httpService.eliminarId("usuarios", result._id).subscribe(res => {
          //AQUI colocamos las notificaciones!!
          // setTimeout(()=>
          // {
          //   this.obtenerUsuarios();
          // }, 1000);
          // console.log('done');
          this.router.navigate(["/login"]);
        });
      }
    });
  }
}
@Component({
  selector: "modal-eliminar-usuario",
  templateUrl: "modal-eliminar-usuario.html"
})
export class ModalEliminarUsuario {
  constructor(
    public dialogRef: MatDialogRef<ModalEliminarUsuario>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelarClick(): void {
    this.dialogRef.close();
  }
}
