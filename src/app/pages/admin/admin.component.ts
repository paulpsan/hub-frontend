import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../../services/service.index";

@Component({
  selector: "hub-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  usuario;
  constructor(private _usuarioService: UsuarioService) {
    this._usuarioService.usuario$.subscribe(respUsuario => {
      this.usuario = respUsuario;
    });
  }
  ngOnInit() {}
}
