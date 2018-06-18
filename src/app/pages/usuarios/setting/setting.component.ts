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
    this.usuario = this._usuarioService.usuario;
    console.log(this.usuario);

    // this.sub = this.route.params.subscribe(params => {
    //   this.id = params["id"];
    //   this._httpService.buscarId("usuarios", this.id).subscribe(usuario => {
    //     this.usuario = usuario;
    //     console.log(this.usuario);
    //   });
    // });
  }
  selectTab(index) {
    this.selectedIndex = index;
  }
  next(object) {
    this.showTabs = object.value;
    this.selectedIndex = object.index;
  }
}
