import { error } from 'selenium-webdriver';
import { GLOBAL } from "./../../services/global";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "./../../services/login.service";

@Component({
  selector: "hub-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.css"]
})
export class InicioComponent implements OnInit {
  private url: string;
  private urlCallback: string;
  private code: string;
  private sub;

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
      this.urlCallback = this.url.split("?")[0];
      if (this.urlCallback == "/inicio") {
        this.code = this.url.split("=")[1];
        this.code = this.code.split("&")[0];
        if (this.code != ""&& GLOBAL.TOGGLE) {
          this._loginServise.getTokenGithub(this.code).subscribe(resp => {
            if (resp.error) {
              console.log(resp.error);
              // this.router.navigate(["/proyectos"]);
            } else {
              console.log(localStorage.getItem('token'));
              // console.log(resp.token);
              // this.router.navigate(["/inicio", resp.token]);
              // resp.token;
            }
            this.router.navigate(["/inicio"]);
            // GLOBAL.TOGGLE=true;
          });
          GLOBAL.TOGGLE=false;
        }
      }
    }
    if(localStorage.getItem('token')!=null){
      this.router.navigate(["/proyectos"]);
    }
  }
}
