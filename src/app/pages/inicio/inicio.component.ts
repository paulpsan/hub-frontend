import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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
  public params;
  public usuario: Usuario;
  public cargando: Boolean = true;

  constructor(
    private router: Router,
    private _loginService: LoginService,
    private _httpService: HttpService,
    private _usuarioService: UsuarioService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this._usuarioService.usuario$.subscribe(repUsuario => {
      this.usuario = repUsuario;
      console.log(repUsuario);
    });

    let url = this.router.url;
    console.log(this.usuario);
    if (url !== "/inicio") {
      let urlCallback = url.split("?");
      this.params = qs.parse(urlCallback[1]);
      switch (this.params.state) {
        case "github":
          if (this.params.code != "") {
            this._loginService
              .getTokenGithub(this.params.code)
              .subscribe(resp => {
                if (resp.error || !resp.usuario) {
                  this.router.navigate(["/login"]);
                } else {
                  //this.usuario=true adicionar repositorios
                  if (this.usuario._id) {
                    this.usuario.id_github = resp.usuario.id;
                    this.usuario.github = true;
                    this.actualizaUsuario(this.usuario, resp.token, "github");
                  } else {
                    console.log("nuevo");
                    this._usuarioService
                      .singOauth("github", resp.usuario, resp.token)
                      .subscribe(respUsuario => {
                        //guardar en storage
                        this._usuarioService.guardarStorage(
                          respUsuario.usuario,
                          respUsuario.token
                        );
                        this.router.navigate(["/usuarios/ajustes"]);

                        // if (this.estaActualizado(respUsuario)) {
                        this.CargarDatos(
                          "repositorios/oauth",
                          "github",
                          respUsuario.usuario,
                          respUsuario.token
                        );
                        // } else {
                        //   let snackBarRef = this.snackBar.open(
                        //     "Bienvenido sus datos se guardaron en fecha " +
                        //       new Date(respUsuario.usuario.fecha_modificacion) +
                        //       " Desea Actualizar los Datos?",
                        //     "Aceptar",
                        //     {
                        //       panelClass: "background-alert",
                        //       duration: 10000
                        //     }
                        //   );
                        //   snackBarRef.afterDismissed().subscribe(info => {
                        //     if (info.dismissedByAction === true) {
                        //       this.CargarDatos(
                        //         "repositorios/oauth",
                        //         "github",
                        //         respUsuario.usuario,
                        //         respUsuario.token
                        //       );
                        //     }
                        //   });
                        // }
                      });
                  }
                }
              });
          }
          break;
        case "gitlab":
          if (this.params.code != "") {
            this._loginService
              .getTokenGitlab(this.params.code)
              .subscribe(resp => {
                if (resp.error) {
                  this.router.navigate(["/login"]);
                } else {
                  if (this.usuario._id) {
                    this.usuario.id_gitlab = resp.usuario.id;
                    this.usuario.gitlab = true;
                    //no carga token al repositorio
                    this.actualizaUsuario(this.usuario, resp.token, "gitlab");
                  } else {
                    console.log("nuevo");
                    this._usuarioService
                      .singOauth("gitlab", resp.usuario, resp.token)
                      .subscribe(respUsuario => {
                        //guardar en storage
                        console.log(respUsuario);
                        this._usuarioService.guardarStorage(
                          respUsuario.usuario,
                          respUsuario.token
                        );
                        this.router.navigate(["/usuarios/ajustes"]);

                        // if (this.estaActualizado(respUsuario)) {
                        this.CargarDatos(
                          "repositorios/oauth",
                          "gitlab",
                          respUsuario.usuario,
                          respUsuario.token
                        );
                        // } else {
                        //   let snackBarRef = this.snackBar.open(
                        //     "Bienvenido sus datos se guardaron en fecha " +
                        //       new Date(respUsuario.usuario.fecha_modificacion) +
                        //       " Desea Actualizar los Datos?",
                        //     "Aceptar",
                        //     {
                        //       panelClass: "background-alert",
                        //       duration: 10000
                        //     }
                        //   );
                        //   snackBarRef.afterDismissed().subscribe(info => {
                        //     if (info.dismissedByAction === true) {
                        //       this.snackBarCargarDatos(
                        //         "repositorios/oauth",
                        //         "gitlab",
                        //         respUsuario.usuario,
                        //         respUsuario.token
                        //       );
                        //     }
                        //   });
                        // }
                      });
                  }
                }
              });
          }
          break;
        case "bitbucket":
          if (this.params.code != "") {
            this._loginService.getTokenBitbucket(this.params.code).subscribe(
              resp => {
                if (resp.error) {
                  this.router.navigate(["/login"]);
                } else {
                  if (this.usuario._id) {
                    this.usuario.id_bitbucket = resp.usuario.account_id;
                    this.usuario.bitbucket = true;
                    this.actualizaUsuario(
                      this.usuario,
                      resp.token,
                      "bitbucket"
                    );
                  } else {
                    this._usuarioService
                      .singOauth("bitbucket", resp.usuario, resp.token)
                      .subscribe(respUsuario => {
                        console.log(respUsuario);
                        //guardar en storage
                        this._usuarioService.guardarStorage(
                          respUsuario.usuario,
                          respUsuario.token
                        );
                        this.router.navigate(["/usuarios/ajustes"]);

                        // if (this.estaActualizado(respUsuario)) {
                        this.CargarDatos(
                          "repositorios/oauth",
                          "bitbucket",
                          respUsuario.usuario,
                          respUsuario.token
                        );
                        // } else {
                        //   let snackBarRef = this.snackBar.open(
                        //     "Bienvenido sus datos se guardaron en fecha " +
                        //       new Date(respUsuario.usuario.fecha_modificacion) +
                        //       " Desea Actualizar los Datos?",
                        //     "Aceptar",
                        //     {
                        //       panelClass: "background-alert",
                        //       duration: 10000
                        //     }
                        //   );
                        //   snackBarRef.afterDismissed().subscribe(info => {
                        //     if (info.dismissedByAction === true) {
                        //       this.CargarDatos(
                        //         "repositorios/oauth",
                        //         "bitbucket",
                        //         respUsuario.usuario,
                        //         respUsuario.token
                        //       );
                        //     }
                        //   });
                        // }
                      });
                  }
                }
              },
              err => {
                console.log(err);
              }
            );
          }
          break;
        default:
          this.router.navigate(["/proyectos"]);
          break;
      }
    }
    // if (localStorage.getItem("token") != null) {
    //
    // }
  }

  estaActualizado(resp) {
    return resp.usuario.fecha_creacion === resp.usuario.fecha_modificacion
      ? true
      : false;
  }
  actualizaUsuario(usuario, token, tipo) {
    this._usuarioService
      .actualizarUsuario(usuario)
      .then(response => {
        if (response) {
          this.router.navigate(["/usuarios/ajustes"]);
          this.CargarDatos("repositorios/oauth", tipo, this.usuario, token);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  CargarDatos(url, tipo, usuario, token?) {
    let snackBarRef = this.snackBar.open(
      "Bienvenido se estan guardando los datos referentes a su cuenta por favor espere un momento!!",
      "",
      {
        panelClass: "background-alert"
      }
    );
    this._httpService
      .post(url, {
        tipo: tipo,
        usuario: usuario,
        token: token
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
