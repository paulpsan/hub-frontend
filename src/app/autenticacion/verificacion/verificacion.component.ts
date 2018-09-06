import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/service.index';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';

@Component({
  selector: 'hub-verificacion',
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.css']
})
export class VerificacionComponent implements OnInit {

  public usuario;
  public message;
  public messageSuccess: Boolean = false;
  public messageWarning: Boolean = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public _httpService: HttpService,
    public snackBar: MatSnackBar,
  ) {
    this.verificarToken();
  }

  ngOnInit() {
  }
  verificarToken() {
    this.activatedRoute.queryParams.subscribe(params => {
      let token = params["token"];
      if (token) {
        this._httpService
          .get("usuarios/verificacion?token=" + token)
          .subscribe(resp => {
            console.log(resp);
            this.message = resp.message;
            this.usuario = resp.usuario;
            this.messageSuccess = true;
          }, err => {
            console.log(err);
            this.message = err.error.message;
            this.messageWarning = true;
          });
      } else {
        this.message = "Tiene que introducir El token ";
        this.messageWarning = true;
        setTimeout(() => {
          this.router.navigate(["/auth/login"]);
        }, 200);
      }
      console.log(token);
    });
  }
}
