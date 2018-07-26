import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../../services/login/login.service";
import { HttpService } from "../../services/http/http.service";
import { MatSnackBar } from "@angular/material";
import { Usuario } from "../../models/usuario";
import { UsuarioService } from "../../services/service.index";
import { GLOBAL } from "../../services/global";
import { resolve } from "path";
let qs = require("querystringify");
@Component({
  selector: "hub-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.css"]
})
export class InicioComponent implements OnInit {
  public action;
  public type;
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
    this.action = localStorage.getItem("action");
    this.type = localStorage.getItem("type");
    this._usuarioService.usuario$.subscribe(repUsuario => {
      this.usuario = repUsuario;
    });

    let url = this.router.url;
    if (url !== "/inicio") {
      let urlCallback = url.split("?");
      this.params = qs.parse(urlCallback[1]);
      console.log(this.action);
      if (this.action && this.params.code) {
        let objPost = {
          code: this.params.code,
          type: this.params.state,
          usuario: this.usuario
        };
        switch (this.action) {
          case "add":
            this._usuarioService
              .addUserOauth(this.type, objPost)
              .then(resp => {
                console.log(resp);
                if (!resp) {
                  this.router.navigate(["/login"]);
                } else {
                  this.router.navigate(["/usuarios/ajustes"]);
                  this.cargarDatos(
                    "repositorios/oauth",
                    this.params.state,
                    this.usuario
                  );
                }
              })
              .catch(err => {
                console.log(err);
              });
            break;
          case "login":
            this._loginService
              .loginUserOauth(this.type, objPost)
              .subscribe(resp => {
                if (resp.error || !resp.usuario) {
                  this.router.navigate(["/login"]);
                } else {
                  console.log(resp);
                  this._usuarioService.guardarStorage(resp.usuario);
                  this.router.navigate(["/usuarios/ajustes"]);
                  this.cargarDatos(
                    "repositorios/oauth",
                    this.params.state,
                    resp.usuario
                  );
                }
              });
            break;
          case "refresh":
            console.log(this.action,this.type);
            this._loginService
              .refreshToken(this.type, this.usuario, this.params.state)
              .subscribe(resp => {
                this.cargarDatos(
                  "repositorios/oauth",
                  this.params.state,
                  resp.usuario
                ).then(resp => {
                  if (resp) {
                    this.router.navigate(["/usuarios/ajustes"], {
                      queryParams: { index: 1 }
                    });
                  }
                });
              });
            break;
          default:
            this.router.navigate(["/login"]);
            break;
        }
      } else {
        this.router.navigate(["/usuarios/ajustes"]);
      }
    } else {
      this.router.navigate(["/login"]);
    }
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
          this.cargarDatos("repositorios/oauth", tipo, this.usuario);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  cargarDatos(url, tipo, usuario) {
    return new Promise((resolve, reject) => {
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
          usuario: usuario
        })
        .subscribe(
          resp => {
            snackBarRef.dismiss();
            this.snackBarSuccess();
            resolve(true);
          },
          err => {
            reject(false);
          }
        );
    });
  }

  snackBarSuccess() {
    this.snackBar.open("Sus datos se guardaron exitosamente!", "", {
      panelClass: "background-success",
      duration: 2000
    });
  }
}
