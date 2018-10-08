import { Component, OnInit } from "@angular/core";
import { PageEvent, MatSnackBar } from "@angular/material";
import {
  HttpService,
  UsuarioService,
  MessageDataService
} from "../../../../services/service.index";
import { Router } from "@angular/router";
import { SnackbarComponent } from "../../../../shared/snackbar/snackbar.component";

@Component({
  selector: "hub-grupos",
  templateUrl: "./grupos.component.html",
  styleUrls: ["./grupos.component.css"]
})
export class GruposComponent implements OnInit {
  public usuario;
  public respuesta: any;
  public title = "Star Rating";
  public avatar;
  public buscar = "";
  public ordenar;
  public pagina = 1;
  public limite = 10;
  public total;
  public pageSizeOptions = [5, 10, 25, 100];
  public pageEvent: PageEvent;
  public grupos = [];
  public grupo: any;
  permisosGrupo = [
    { nombre: "privado", value: "private" },
    { nombre: "interno", value: "internal" },
    { nombre: "publico", value: "public" }
  ];
  constructor(
    private _httpService: HttpService,
    private _usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar,
    private _messageDataService: MessageDataService
  ) {}

  ngOnInit() {
    this._usuarioService.usuario$.subscribe(respUsuario => {
      this.usuario = respUsuario;
    });
    this.obtenerGrupo();
  }
  obtenerGrupo() {
    if (this.usuario) {
      this.grupo = this.usuario.Grupos.find(grupo => {
        return (
          grupo.UsuarioGrupo.admin == true &&
          grupo.UsuarioGrupo.fk_usuario == this.usuario._id
        );
      });
      if(this.grupo){
        this._httpService.buscarId("grupos", this.grupo._id).subscribe(resp => {
          this.grupos = [resp];
        });
      }
    } else {
      this.ngOnInit();
    }
  }
  changeSelect(event, grupo) {
    console.log(event);
    grupo.change = true;
  }
  guardar(grupo) {
    console.log(grupo);
    grupo.request = "start";
    grupo.change = false;
    this._httpService.editar("grupos", grupo).subscribe(
      result => {
        console.log(result);
        grupo.request = "ok";
        this.obtenerGrupo();
      },
      err => {
        console.log(err);
        grupo.request = "error";
        const objMessage = {
          text: err.error.message,
          type: "Info"
        };
        this._messageDataService.changeMessage(objMessage);
        this.snackBar.openFromComponent(SnackbarComponent, {
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: "background-warning",
          duration: 5000
        });
        this.obtenerGrupo();
      }
    );
  }

  eliminar(usuario) {}
}
