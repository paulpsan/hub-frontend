import { AuthService } from "../../services/auth/auth.service";
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
  public badgeCount: number;
  public badges;
  title = "hub";
  navLinks: any[] = [
    {
      label: "Proyectos",
      path: "/proyectos"
    },
    {
      label: "Usuarios",
      path: "/usuarios"
    },
    {
      label: "Mis Repositorios",
      path: '/repositorios'
    },
    {
      label: "Admin",
      path: '/admin'
    },
  ];

  constructor(
    private _authService: AuthService,
    public _usuarioService: UsuarioService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this._usuarioService.usuario$.subscribe(repUsuario => {
      this.usuario = repUsuario;
      this.badges = this._usuarioService.isCompleteInfo();
      this.badgeCount = this.badges.length;
      console.log(this.badges);
    });
  }
  logout() {
    this._usuarioService.logout();
  }
  ngOnChanges(changes) {
    console.log(changes);
  }
  setUsuario() {
    this.router.navigate(["/inicio"]);
    setTimeout(() => {
      this.router.navigate(["/usuarios", this.usuario._id]);
    }, 1);
  }
  resolveBadge(badge) {
    console.log(badge);
    this.router.navigate(["/usuarios/ajustes"]);
  }
}
