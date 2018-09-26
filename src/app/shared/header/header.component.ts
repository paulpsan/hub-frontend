import { AuthService } from "../../services/auth/auth.service";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Component, OnInit, OnChanges } from "@angular/core";
import { environment } from "../../../environments/environment";
import { UsuarioService } from "../../services/usuario/usuario.service";
import { HttpService } from "../../services/service.index";

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
      path: "/proyectos",
      admin: false
    },
    {
      label: "Usuarios",
      path: "/usuarios",
      admin: false
    },
    {
      label: "Mis Repositorios",
      path: "/repositorios",
      admin: false
    },
    {
      label: "Admin",
      path: "",
      admin: true
    }
  ];

  constructor(
    private _httpService: HttpService,
    public _usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit() {
    this._usuarioService.usuario$.subscribe(repUsuario => {
      this.usuario = repUsuario;
      this.badges = this._usuarioService.isCompleteInfo();
      this.badgeCount = this.badges.length;
    });
    this._httpService.buscarId("usuarios", this.usuario._id).subscribe(resp => {
      console.log(resp);
      this._usuarioService.guardarStorage(resp, localStorage.getItem("token"));
      if (resp.admin) {
        this.navLinks[3].path = "/admin/solicitudes";
        this.navLinks[3].admin = false;
      }
      if (resp.admin_grupo) {
        this.navLinks[3].path = "/admin/institucion/grupos";
        this.navLinks[3].admin = false;
      }
      this.usuario = resp;
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
