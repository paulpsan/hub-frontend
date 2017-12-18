import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../services/http.service";
import { error } from "selenium-webdriver";
import { Usuario } from "../../models/usuario";
import { BooleanLiteral } from "typescript";
import { Console } from '@angular/core/src/console';
import { setTimeout } from 'timers';

@Component({
  selector: "hub-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  private urlGithub: string = "https://github.com/login/oauth/authorize?client_id=";
  private GITHUB_CLIENT_ID: string = "becb33a39e525721517c";
  private GITHUB_CLIENT_SECRET: string = "36338cdf7057d2086495a241fa3d053766da55c1";
  private STATE: string = "hub-software";

  loginForm: FormGroup;
  public usuario: Usuario;
  public token;
  public identity;
  public errorMessage;

  constructor(
    private router: Router,
    private _authService: AuthService
  ) {}

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
      password: new FormControl("", Validators.required),
    });
  }

  loginGH() {
    window.location.href =
      this.urlGithub + this.GITHUB_CLIENT_ID + "&state=" + this.STATE;

    // this._loginService.github().subscribe(
    //   result => {
    //     console.log (result);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }
  loginGL() {
    // this.router.navigateByUrl("http://www.cnn.com/");
    window.location.href = "https://www.google.com";
  }
  loginBB() {
    this.router.navigate(["/auth/bitbucket"]);
  }
  onSubmit() {
    let email = this.loginForm.controls["email"].value;
    let password = this.loginForm.controls["password"].value;

    this._authService.login('usuarios/login',{email:email,password:password}).subscribe(
      response =>{
        this.identity=response;
        localStorage.setItem('identity',JSON.stringify(this.identity))
        this.router.navigate(['/inicio']);
        // setTimeout(()=>{
        //   this.router.navigate(['/proyectos']);
        // },300);
      },
      error=>{
        let errorMessage=<any>error;
        console.log(errorMessage.error);
        if (errorMessage!=null){
          this.errorMessage=errorMessage.error.message;
        }
      }
    )
  }
}
