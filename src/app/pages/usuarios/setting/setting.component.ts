import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../../services/http/http.service";
import { UsuarioService } from "../../../services/service.index";

@Component({
  selector: "hub-setting",
  templateUrl: "./setting.component.html",
  styleUrls: ["./setting.component.css"]
})
export class SettingComponent implements OnInit {
  sub;
  id;
  usuario;
  showTabs: Boolean = true;
  selectedIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.route.queryParams.filter(params => params.index).subscribe(params => {
      this.selectedIndex = params.index;
    });
    this._usuarioService.usuario$.subscribe(repUsuario => {
      this.usuario = repUsuario;
    });
    this.showTabs = false;
    console.log(this.selectedIndex);
    // this.sub = this.route.params.subscribe(params => {
    //   this.id = params["id"];
    //   this._httpService.buscarId("usuarios", this.id).subscribe(usuario => {
    //     this.usuario = usuario;
    //     console.log(this.usuario);
    //   });
    // });
  }
  tabChanged(event) {
    this.selectedIndex = event;
  }
  next(object) {
    console.log("emmit", object);
    if (this.usuario.estado) {
      this.showTabs = object.value;
      this.selectedIndex = object.index;
    }
  }
}
