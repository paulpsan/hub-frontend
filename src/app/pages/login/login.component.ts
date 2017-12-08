
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "hub-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  private urlGithub:string='https://github.com/login/oauth/authorize?client_id=';
  private GITHUB_CLIENT_ID: string = 'becb33a39e525721517c';
  private GITHUB_CLIENT_SECRET: string= '36338cdf7057d2086495a241fa3d053766da55c1'

  constructor(private router: Router) {}

  ngOnInit() {}
  loginGH() {
    window.location.href=this.urlGithub+this.GITHUB_CLIENT_ID;

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
    window.location.href="https://www.google.com";
  }
  loginBB() {
    this.router.navigate(["/auth/bitbucket"]);
  }
  onSubmit() {

  }
}
