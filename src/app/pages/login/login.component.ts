import { LoginService } from './../../services/login.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "hub-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,private _loginService: LoginService) {}

  ngOnInit() {}
  loginGH() {
    this._loginService.github().subscribe(
      result => {
        console.log (result);
      },
      err => {
        console.log(err);
      }
    );
  }
  loginGL() {
    this.router.navigate(["/login/gitlab"]);
  }
  loginBB() {
    this.router.navigate(["/login/bitbucket"]);
  }
  onSubmit() {

  }
}
