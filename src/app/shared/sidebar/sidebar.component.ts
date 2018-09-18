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
  constructor(private _usuarioService: UsuarioService,
    private _httpService: HttpService,
  ) {

  }

  ngOnInit() {
    this._usuarioService.usuario$.subscribe(respUsuario => {
      this.usuario = respUsuario;
      this._httpService.buscarId("usuarios", this.usuario._id).subscribe(resp => {
        this.grupo = resp.Grupos[0];
        console.log(this.grupo);
      })
    });

  }
}
