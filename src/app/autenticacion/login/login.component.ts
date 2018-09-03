import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { GLOBAL } from '../../services/global';
import { environment } from '../../../environments/environment';
import { UsuarioService, MessageDataService } from '../../services/service.index';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';

@Component({
  selector: 'hub-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public token;
  public errorMessage;
  public gitlab: boolean = true;

  loginForm: FormGroup;

  constructor(
    private router: Router,
    public _usuarioService: UsuarioService,
    public snackBar: MatSnackBar,
    private _messageDataService: MessageDataService
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }
  // login github
  login(auth) {
    localStorage.setItem('action', 'login');
    switch (auth) {
      case 'github':
        localStorage.setItem('type', auth);
        window.location.href =
          environment.github.domain +
          environment.github.clientId +
          '&state=' +
          environment.github.state;
        break;
      case 'gitlab':
        localStorage.setItem('type', 'gitlab');
        window.location.href =
          environment.gitlab.domain +
          environment.gitlab.clientId +
          '&redirect_uri=' +
          environment.gitlab.callbackURL +
          '&response_type=code' +
          '&state=' +
          environment.gitlab.state;
        break;
      case 'gitlabGeo':
        localStorage.setItem('type', 'gitlab');
        window.location.href =
          environment.gitlabGeo.domain +
          environment.gitlabGeo.clientId +
          '&redirect_uri=' +
          environment.gitlabGeo.callbackURL +
          '&response_type=code' +
          '&state=' +
          environment.gitlabGeo.state;
        break;
      case 'bitbucket':
        localStorage.setItem('type', auth);
        window.location.href =
          environment.bitbucket.domain +
          environment.bitbucket.clientId +
          '&redirect_uri=' +
          environment.bitbucket.callbackURL +
          '&response_type=code' +
          '&state=' +
          environment.bitbucket.state;
        break;

      default:
        break;
    }
  }

  onSubmit() {
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;
    const usuario = new Usuario(
      null,
      '',
      email,
      password,
      'usuario',
      '',
      'local',
      'true'
    );
    // this._usuarioService.loginLocal(usuario).subscribe(
    //   resp => {
    //     console.log(resp);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
    this._usuarioService
      .login(usuario)
      .then(response => {
        console.log(response);
        if (response) {
          this.router.navigate(['/usuarios/ajustes']);
        }
      })
      .catch(error => {
        const errorMessage = <any>error;
        if (errorMessage.error.message != null) {
          console.log(errorMessage);
          const objMessage = {
            text: errorMessage.error.message,
            type: "Info",
          }
          this._messageDataService.changeMessage(objMessage);
          this.snackBar.openFromComponent(SnackbarComponent, {
            horizontalPosition: 'right',
            verticalPosition: "top",
            panelClass: "background-success",
            duration: 3000
          });
          // this.errorMessage = errorMessage.error.message;
        } else {
          const objMessage = {
            text: 'Error en Servidor o Servidor No Disponible',
            type: "Advertencia",
          }
          this._messageDataService.changeMessage(objMessage);
          this.snackBar.openFromComponent(SnackbarComponent, {
            horizontalPosition: 'right',
            verticalPosition: "top",
            panelClass: "background-warning",
            duration: 3000
          });
        }
      });
  }
}
