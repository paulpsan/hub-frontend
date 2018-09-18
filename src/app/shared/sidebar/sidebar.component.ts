import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../../services/service.index";

@Component({
  selector: "hub-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  step = 0;
  usuario;
  constructor(private _usuarioService: UsuarioService) {
    this._usuarioService.usuario$.subscribe(respUsuario => {
      this.usuario = respUsuario;
    });
  }
  ngOnInit() {}
}
