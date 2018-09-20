import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../../services/service.index";

@Component({
  selector: "hub-admin",
  templateUrl: "./admin-institucion.component.html",
  styleUrls: ["./admin-institucion.component.css"]
})
export class AdminInstitucionComponent implements OnInit {
  usuario;
  constructor(private _usuarioService: UsuarioService) {
    this._usuarioService.usuario$.subscribe(respUsuario => {
      this.usuario = respUsuario;
    });
  }
  ngOnInit() {}
}
