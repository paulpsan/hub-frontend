import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "./../../services/login.service";
import { HttpService } from "../../services/http.service";
import { MatSnackBar } from "@angular/material";
// import qs from "querystringify";
let qs = require("querystringify");
@Component({
  selector: "hub-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.css"]
})
export class InicioComponent implements OnInit {
  private url: string;
  private urlCallback;
  private code: string;
  private params;
  private cargando: Boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _loginService: LoginService,
    private _httpService: HttpService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.url = this.router.url;
    console.log(this.url);
    if (this.url !== "/inicio") {
      this.urlCallback = this.url.split("?");
      this.params = qs.parse(this.urlCallback[1]);
      console.log(this.params);
      // this.router.navigate(["/inicio"]);
      if (this.params.state === "github") {
        if (this.params.code != "") {
          this._loginService
            .getTokenGithub(this.params.code)
            .subscribe(resp => {
              if (resp.error) {
                this.router.navigate(["/login"]);
              } else {
                //pedir datos de commits y lenguajes
                let snackBarRef = this.snackBar.open(
                  "Se estan guardando los datos referentes a su cuenta!!",
                  "",
                  {
                    panelClass: "background-red"
                  }
                );
                this._httpService
                  .post("usuarios/datosgithub", resp)
                  .subscribe(resp => {
                    snackBarRef.dismiss();
                  });
                this.router.navigate(["/proyectos"]);
              }
            });
        }
      } else {
        if (this.params.state === "gitlab") {
          if (this.params.code != "") {
            this._loginService
              .getTokenGitlab(this.params.code)
              .subscribe(resp => {
                if (resp.error) {
                  this.router.navigate(["/login"]);
                } else {
                  console.log(resp);
                  let snackBarRef = this.snackBar.open(
                    "Se estan guardando los datos referentes a su cuenta!!",
                    "",
                    {
                      panelClass: "background-red"
                    }
                  );
                  this._httpService
                    .post("usuarios/datosgitlab", resp)
                    .subscribe(resp => {
                      snackBarRef.dismiss();
                    });
                  this.router.navigate(["/proyectos"]);
                }
              });
          }
        } else {
          if (this.params.state === "bitbucket") {
            if (this.params.code != "") {
              this._loginService.getTokenBitbucket(this.params.code).subscribe(
                resp => {
                  if (resp.error) {
                    this.router.navigate(["/login"]);
                  } else {
                    let snackBarRef = this.snackBar.open(
                      "Se estan guardando los datos referentes a su cuenta!!",
                      "",
                      {
                        panelClass: "background-red"
                      }
                    );
                    this._httpService
                      .post("usuarios/datosbitbucket", resp)
                      .subscribe(resp => {
                        snackBarRef.dismiss();
                      });
                    this.router.navigate(["/proyectos"]);
                  }
                },
                err => {
                  console.log(err);
                }
              );
            }
            console.log("gitlab", this.params.state);
          }
        }
      }
    }
    if (localStorage.getItem("token") != null) {
      this.router.navigate(["/proyectos"]);
    }
  }
}
