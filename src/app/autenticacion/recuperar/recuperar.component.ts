import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpService, MessageDataService } from "../../services/service.index";
import { MatSnackBar } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { SnackbarComponent } from "../../shared/snackbar/snackbar.component";

@Component({
  selector: "hub-recuperar",
  templateUrl: "./recuperar.component.html",
  styleUrls: ["./recuperar.component.css"]
})
export class RecuperarComponent implements OnInit {
  passFormGroup: FormGroup;
  usuario;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public _httpService: HttpService,
    public snackBar: MatSnackBar,
    private _messageDataService: MessageDataService
  ) {
    this.verificarToken();
  }

  ngOnInit() {
    this.passFormGroup = new FormGroup({
      password: new FormControl("", [Validators.required])
      // confirmarPassword: new FormControl("", [Validators.required])
    });
  }
  guardar() {
    const password = this.passFormGroup.controls["password"].value;
    if (this.usuario) {
      this.usuario.password = password;
    }
    this._httpService
      .post("usuarios/contrasena", { usuario: this.usuario })
      .subscribe(resp => {
        const objMessage = { text: "Se almaceno Correctamente", type: "info" };
        this._messageDataService.changeMessage(objMessage);
        this.snackBar.openFromComponent(SnackbarComponent, {
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: "background-success",
          duration: 3000
        });
        this.router.navigate(["/auth/login"]);
        console.log(resp);
      });
    // this._usuarioService.
  }
  verificarToken() {
    this.activatedRoute.queryParams.subscribe(params => {
      let token = params["token"];
      if (token) {
        this._httpService
          .get("usuarios/verificacion?token=" + token)
          .subscribe(resp => {
            this.usuario = resp.usuario;
          });
      } else {
        const objMessage = {
          text: "Token Invalido o Expirado",
          type: "Warning"
        };
        this._messageDataService.changeMessage(objMessage);
        this.snackBar.openFromComponent(SnackbarComponent, {
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: "background-warning",
          duration: 3000
        });
        this.router.navigate(["/auth/login"]);
      }
      console.log(token);
    });
  }
}
