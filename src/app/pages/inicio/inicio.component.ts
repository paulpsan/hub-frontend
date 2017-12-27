import { error } from "selenium-webdriver";
import { GLOBAL } from "./../../services/global";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "./../../services/login.service";
import qs from "querystringify";
@Component({
  selector: "hub-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.css"]
})
export class InicioComponent implements OnInit {
  private url: string;
  private urlCallback;
  private code: string;
  private sub;
  private params;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _loginServise: LoginService
  ) {}

  ngOnInit() {
    // this.sub = this.route.params.subscribe(params => {
    //   console.log(params);
    // });

    this.url = this.router.url;
    console.log(this.url);
    if (this.url != "/inicio") {
      this.urlCallback = this.url.split("?");

     console.log(this.urlCallback)
      this.params = qs.parse(this.urlCallback[1]);
      console.log(this.params);
      if (this.params.state === "hub-software-github") {

        console.log(this.params.code);

          if (this.params.code != ""&& GLOBAL.TOGGLE) {
          // if (this.code != "") {
            this._loginServise.getTokenGithub(this.params.code).subscribe(resp => {
              if (resp.error) {
                console.log(resp.error);
                this.router.navigate(["/login"]);
              } else {
                console.log(localStorage.getItem("token"));
                this.router.navigate(["/proyectos"]);
                // console.log(resp.token);
                // this.router.navigate(["/inicio", resp.token]);
                // resp.token;
              }
              // this.router.navigate(["/inicio"]);

            });
            GLOBAL.TOGGLE=false;
          }
      }else{
        if(this.params.state === "hub-software-gitlab"){

          if (this.params.code != ""&& GLOBAL.TOGGLE) {
            // if (this.code != "") {
              this._loginServise.getTokenGitlab(this.params.code).subscribe(resp => {
                if (resp.error) {
                  console.log(resp.error);
                  this.router.navigate(["/login"]);
                } else {
                  console.log(localStorage.getItem("token"));
                  this.router.navigate(["/proyectos"]);
                  // console.log(resp.token);
                  // this.router.navigate(["/inicio", resp.token]);
                  // resp.token;
                }
                // this.router.navigate(["/inicio"]);
              });
              GLOBAL.TOGGLE=false;
            }
          console.log("gitlab",this.params.state);
        }
      }





    }

    if (localStorage.getItem("token") != null) {
      this.router.navigate(["/proyectos"]);
    }
  }
}
