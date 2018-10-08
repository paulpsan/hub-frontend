import { Component, OnInit, OnDestroy } from "@angular/core";
import { UsuarioService, HttpService } from "../../services/service.index";

@Component({
  selector: "hub-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit, OnDestroy {
  step = 0;
  usuario;
  grupo;
  subscription;

  constructor(
    private _usuarioService: UsuarioService,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this.subscription = this._usuarioService.usuario$.subscribe(respUsuario => {
      this.usuario = respUsuario;
      console.log(this.grupo);
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
      if (this.grupo) {
        this._httpService.buscarId("grupos", this.grupo._id).subscribe(resp => {
          this.grupo = resp;
        });
      }
    } else {
      this.ngOnInit();
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
