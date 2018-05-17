import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "./../../services/auth.service";
import { HttpService } from "../../services/http.service";
import { Usuario } from "../../models/usuario";
import { GLOBAL } from "./../../services/global";
import { environment } from "../../../environments/environment";

@Component({
  selector: "hub-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  private urlGitlab: string = "https://gitlab.geo.gob.bo/oauth/authorize?client_id=";
  // private urlGitlab: string = "https://gitlab.com/oauth/authorize?client_id=";
  private GITLAB_CLIENT_ID: string = "5fd3c547dbc17e2d3f77a0c81a4fae588d3f31007f626a64489814d3900a315d";
  // aplicacion en gitlab.com
  // private GITLAB_CLIENT_ID: string = "68b23d8cc8bdf2e9414f2b486456596bbd23e9d44e1c56c16e91298747b94485";

  private GITLAB_CLIENT_SECRET: string = "f08b68a537601fa7e0aab9d013c4f312d64adfc8d2967a1445cac741229c0a2f";
  // aplicacion en gitlab.com
  // private GITLAB_CLIENT_SECRET: string = "99cca0cab45bf79a844763ec81db38e34915cbb8e8a5f6006a097707c4278d5b";

  private STATE_GITLAB: string = "hub-software-gitlab";

  // private CALLBACK_GITLAB:string ="https://test.adsib.gob.bo/softwarelibre/inicio";
  private CALLBACK_GITLAB: string = "http://localhost:4200/inicio";

  public usuario: Usuario;
  public token;
  public identity;
  public errorMessage;

  loginForm: FormGroup;

  constructor(private router: Router, private _authService: AuthService) {}

  ngOnInit() {
    console.log(localStorage);
    this._authService.logout();

    // this.identity=this._authService.getIdentity();
    // this.token=this._authService.getToken();
    // console.log(this.identity,this.token);

    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
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

    // this._loginService.github().subscribe(
    //   result => {
    //     console.log (result);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }
  //login gitlab
  loginGL() {
    // this.router.navigateByUrl("http://www.cnn.com/");
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
          this.identity = response;
          localStorage.setItem("identity", JSON.stringify(this.identity));
          localStorage.setItem("token", JSON.stringify(this.identity));
          this.router.navigate(["/inicio"]);
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
