import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "./../../services/login/login.service";
import { HttpService } from "../../services/http/http.service";
import { MatSnackBar } from "@angular/material";
import { Usuario } from "../../models/usuario";
import { UsuarioService } from "../../services/service.index";
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
  private usuario: Usuario;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _loginService: LoginService,
    private _httpService: HttpService,
    private _usuarioService: UsuarioService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.url = this.router.url;
    console.log(this.usuario);
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
              if (resp.error || !resp.usuario) {
                this.router.navigate(["/login"]);
              } else {
                console.log(resp);
                this._usuarioService
                  .crearUsuarioOauth("github", this.usuario, resp.token)
                  .subscribe(respUsuario => {
                    this.usuario = respUsuario;
                    if (respUsuario.usuario) {
                      this.router.navigate([
                        "/usuarios/ajustes/" + respUsuario.usuario._id
                      ]);
                      // this.crearUsuario("github");

                      //pedir datos de commits y lenguajes
                      // let usuario = {
                      //   _id: resp.usuario._id,
                      //   login: resp.usuario.login,
                      //   email: resp.usuario.email
                      // };
                      if (
                        respUsuario.usuario.fecha_creacion ===
                        respUsuario.usuario.fecha_modificacion
                      ) {
                        this.snackBarCargarDatos(
                          "usuarios/datosgithub",
                          respUsuario
                        );
                      } else {
                        let snackBarRef = this.snackBar.open(
                          "Bienvenido sus datos se guardaron en fecha " +
                            new Date(respUsuario.usuario.fecha_modificacion) +
                            " Desea Actualizar los Datos?",
                          "Aceptar",
                          {
                            panelClass: "background-alert",
                            duration: 10000
                          }
                        );
                        snackBarRef.afterDismissed().subscribe(info => {
                          if (info.dismissedByAction === true) {
                            this.snackBarCargarDatos(
                              "usuarios/datosgithub",
                              respUsuario
                            );
                          }
                        });
                      }

                      // if (!this.usuario) {
                      //   this.router.navigate(["/proyectos"]);
                      // }
                    }
                  });
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
                  let usuario = {
                    _id: resp.usuario._id,
                    login: resp.usuario.login,
                    email: resp.usuario.email
                  };
                  if (
                    resp.usuario.fecha_creacion ===
                    resp.usuario.fecha_modificacion
                  ) {
                    this.snackBarCargarDatos("usuarios/datosgitlab", resp);
                  } else {
                    let snackBarRef = this.snackBar.open(
                      "Bienvenido sus datos se guardaron en fecha " +
                        new Date(resp.usuario.fecha_modificacion) +
                        " Desea Actualizar los Datos?",
                      "Aceptar",
                      {
                        panelClass: "background-alert",
                        duration: 10000
                      }
                    );
                    snackBarRef.afterDismissed().subscribe(info => {
                      if (info.dismissedByAction === true) {
                        this.snackBarCargarDatos("usuarios/datosgitlabb", resp);
                      }
                    });
                  }
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
                    let usuario = {
                      _id: resp.usuario._id,
                      login: resp.usuario.login,
                      email: resp.usuario.email
                    };
                    if (
                      resp.usuario.fecha_creacion ===
                      resp.usuario.fecha_modificacion
                    ) {
                      this.snackBarCargarDatos("usuarios/datosbitbucket", resp);
                    } else {
                      let snackBarRef = this.snackBar.open(
                        "Bienvenido sus datos se guardaron en fecha " +
                          new Date(resp.usuario.fecha_modificacion) +
                          " Desea Actualizar los Datos?",
                        "Aceptar",
                        {
                          panelClass: "background-alert",
                          duration: 10000
                        }
                      );
                      snackBarRef.afterDismissed().subscribe(info => {
                        if (info.dismissedByAction === true) {
                          this.snackBarCargarDatos(
                            "usuarios/datosbitbucket",
                            resp
                          );
                        }
                      });
                    }
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
  crearUsuario(nombre: String) {
    console.log(nombre);
  }
  snackBarCargarDatos(url, response) {
    let snackBarRef = this.snackBar.open(
      "Bienvenido se estan guardando los datos referentes a su cuenta por favor espere un momento!!",
      "",
      {
        panelClass: "background-alert"
      }
    );
    this._httpService
      .post(url, {
        usuario: response.usuario,
        token: response.token
      })
      .subscribe(resp => {
        snackBarRef.dismiss();
        this.snackBarSuccess();
      });
  }

  snackBarSuccess() {
    this.snackBar.open("Sus datos se guardaron exitosamente!", "", {
      panelClass: "background-success",
      duration: 1000
    });
  }
}
