import { AuthService } from "./../../services/auth/auth.service";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Component, OnInit, OnChanges } from "@angular/core";
import { environment } from "../../../environments/environment";
import { UsuarioService } from "../../services/usuario/usuario.service";

@Component({
  selector: "hub-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnChanges {
  public urlAvatar;
  public usuario;
  title = "hub";
  navLinks: any[] = [
    {
      label: "Proyectos",
      path: "/proyectos"
    },
    {
      label: "Usuarios",
      path: "/usuarios"
    }
    // {
    //   label:'Organizaciones',
    //   path:'/organizaciones'
    // },
  ];

  constructor(
    private _authService: AuthService,
    public _usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit() {

    this.usuario = this._usuarioService.usuario;
    console.log(this.usuario);
    if (this.usuario.avatar.indexOf(this.usuario._id + "-") == 0) {
      this.urlAvatar =
        environment.url + "upload/usuarios/" + this.usuario.avatar;
    } else {
      this.urlAvatar = this.usuario.avatar;
    }
  }
  logout() {
    this._usuarioService.logout();
  }
  ngOnChanges(changes) {
    console.log(changes);
  }
}
