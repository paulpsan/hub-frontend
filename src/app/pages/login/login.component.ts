import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "./../../services/auth/auth.service";
import { HttpService } from "../../services/http/http.service";
import { Usuario } from "../../models/usuario";
import { GLOBAL } from "./../../services/global";
import { environment } from "../../../environments/environment";

@Component({
  selector: "hub-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public usuario: Usuario;
  public token;
  public identity;
  public errorMessage;

  loginForm: FormGroup;

  constructor(private router: Router, private _authService: AuthService) {}

  ngOnInit() {
    console.log(localStorage);
    this._authService.logout();
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.email,
      ]),
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

    this._authService
      .login("auth/local", {
        email: email,
        password: password,
        tipo: "local"
      })
      .subscribe(
        response => {
          console.log(response);
          console.log(localStorage.getItem("identity"));
          // this.identity = response;
          // localStorage.setItem(
          //   "identity",
          //   JSON.stringify(this.identity.usuario)
          // );
          // localStorage.setItem("token", JSON.stringify(this.identity.token));
          this.router.navigate(["/usuarios/ajustes/" + response.usuario._id]);
          // setTimeout(()=>{
          //   this.router.navigate(['/proyectos']);
          // },300);
        },
        error => {
          let errorMessage = <any>error;
          console.log(errorMessage.error);
          if (errorMessage != null) {
            this.errorMessage = errorMessage.error.message;
          }
        }
      );
  }
}
