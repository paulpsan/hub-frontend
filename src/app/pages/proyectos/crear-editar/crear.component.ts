import { Usuario } from "./../../../models/usuario";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../../services/http.service";
import { Proyecto } from "../../../models/proyecto";

@Component({
  selector: "hub-crear",
  templateUrl: "./crear.component.html",
  styleUrls: ["./crear.component.css"]
})
export class CrearComponent implements OnInit {
  id: number;
  acciones: string;
  private sub: any;
  proyecto: Proyecto;
  userForm: FormGroup;
  identity;
  usuario: Usuario;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this.identity = JSON.parse(localStorage.getItem("identity"));
    console.log(this.identity);
    this._httpService
      .buscarId("usuarios", this.identity._id)
      .subscribe(response => {
        console.log(response);
        this.usuario = response;
        if (this.usuario.tipo == "local") {
          this.userForm = new FormGroup({
            nombre: new FormControl("", Validators.required),
            urlRepositorio: new FormControl("", Validators.required),
            descripcion: new FormControl("", Validators.required)
          });
        } else {
          this.userForm = new FormGroup({
            nombre: new FormControl("", Validators.required)
          });
        }
      });

    //cambiar el 6 por el id
    if (this.identity.tipo == "gitlab") {
      this._httpService
        .buscarId("usuarios", this.identity._id)
        .subscribe(response => {
          console.log(response);
          this.usuario = response;
          this.userForm = new FormGroup({
            nombre: new FormControl("", Validators.required),
            descripcion: new FormControl("", Validators.required)
          });
        });
    } else {
      if (this.identity.tipo == "github" || this.identity.tipo == "bitbucket") {
        this._httpService
          .buscarId("usuarios", this.identity._id)
          .subscribe(response => {
            console.log(response);
            this.usuario = response;
            this.userForm = new FormGroup({
              nombre: new FormControl("", Validators.required),
              descripcion: new FormControl("", Validators.required)
            });
          });
      }
    }
  }
  onSubmit() {
    if (this.userForm.valid) {
      let datos = this.userForm.controls["nombre"].value;
      console.log(datos);
      let proyecto: Proyecto;
      switch (this.usuario.tipo) {
        case "gitlab":
          proyecto = new Proyecto(
            null,
            datos.repo.name,
            datos.repo.description,
            datos.repo.http_url_to_repo,
            "avatar",
            ["categorias"],
            ["licencias"],
            "clasificacion",
            this.usuario._id,
            this.usuario.tipo,
            datos
          );
          break;
        case "github":
          proyecto = new Proyecto(
            null,
            datos.repo.name,
            datos.repo.description,
            datos.repo.url,
            "avatar",
            ["categorias"],
            ["licencias"],
            "clasificacion",
            this.usuario._id,
            this.usuario.tipo,
            datos
          );
          break;
        case "bitbucket":
          proyecto = new Proyecto(
            null,
            datos.repo.name,
            datos.repo.description,
            datos.repo.links.html.href,
            datos.repo.links.html.avatar,
            ["categorias"],
            ["licencias"],
            "clasificacion",
            this.usuario._id,
            this.usuario.tipo,
            datos
          );
          break;
        default:
          break;
      }

      this._httpService.adicionar("proyectos", proyecto).subscribe(response => {
        this.router.navigate(["/proyectos"]);
      });
      this.userForm.reset();
    }
  }
}
