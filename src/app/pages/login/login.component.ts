import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Usuario } from "../../models/usuario";
import { GLOBAL } from "./../../services/global";
import { environment } from "../../../environments/environment";
import { UsuarioService } from "../../services/service.index";

@Component({
  selector: "hub-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public usuario: Usuario;
  public token;
  public errorMessage;

  loginForm: FormGroup;

  constructor(private router: Router, public _usuarioService: UsuarioService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required)
    });
  }
  //login github
  loginGH() {
    GLOBAL.TOGGLE = true;
    window.location.href =
      environment.github.domain +
      environment.github.clientId +
      "&state=" +
      environment.github.state;
  }
  //login gitlab
  loginGL() {
    GLOBAL.TOGGLE = true;
    window.location.href =
      environment.gitlabGeo.domain +
      environment.gitlabGeo.clientId +
      "&redirect_uri=" +
      environment.gitlabGeo.callbackURL +
      "&response_type=code" +
      "&state=" +
      environment.gitlabGeo.state;
  }
  loginBB() {
    GLOBAL.TOGGLE = true;
    window.location.href =
      environment.bitbucket.domain +
      environment.bitbucket.clientId +
      "&redirect_uri=" +
      environment.bitbucket.callbackURL +
      "&response_type=code" +
      "&state=" +
      environment.bitbucket.state;
  }
  onSubmit() {
    let email = this.loginForm.controls["email"].value;
    let password = this.loginForm.controls["password"].value;
    let usuario = new Usuario(
      null,
      "",
      email,
      password,
      "usuario",
      "",
      "local",
      "true"
    );
    this._usuarioService
    .login(usuario)
    .then(response => {
      if (response) {
        this.router.navigate(["/usuarios/ajustes"]);
      }
    })
    .catch(error => {
      let errorMessage = <any>error;
      if (errorMessage != null) {
        this.errorMessage = errorMessage.error.message;
      }
    });
  }
}
