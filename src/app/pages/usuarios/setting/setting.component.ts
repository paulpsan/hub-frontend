import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../../services/http.service";

@Component({
  selector: "hub-setting",
  templateUrl: "./setting.component.html",
  styleUrls: ["./setting.component.css"]
})
export class SettingComponent implements OnInit {
  sub;
  id;
  usuario;
  selectedIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
      this._httpService.buscarId("usuarios", this.id).subscribe(usuario => {
        this.usuario = usuario;
        console.log(this.usuario);
      });
    });
  }

  next(idUsuario) {
    console.log(idUsuario);
    this.selectedIndex++;
  }
}