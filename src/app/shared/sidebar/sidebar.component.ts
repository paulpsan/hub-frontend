import { Component, OnInit } from "@angular/core";
import { UsuarioService, HttpService } from "../../services/service.index";

@Component({
  selector: "hub-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  step = 0;
  usuario;
  grupo;
  constructor(
    private _usuarioService: UsuarioService,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this._usuarioService.usuario$.subscribe(respUsuario => {
      this.usuario = respUsuario;

      this.obtenerGrupo();
      // if (respUsuario.Grupos >= 1) {
      //   this.grupo = respUsuario.Grupos[0];
      // }
      console.log(this.grupo);
    });
  }
  obtenerGrupo() {
    this._httpService
      .get(`usuarios/${this.usuario._id}/grupos`)
      .subscribe(
        result => {
          console.log(this.grupo);
          this.grupo = result.length >= 1 ? result : undefined;
        },
        err => {
        }
      );
  }
}
