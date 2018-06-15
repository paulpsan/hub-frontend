import { Usuario } from "./../../../models/usuario";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../../services/http/http.service";
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
  usuario;
  repositorios;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    console.log(this.usuario);
    this._httpService
      .obtener("repositorios/" + this.usuario._id + "/usuarios")
      .subscribe(response => {
        console.log(response);
        this.repositorios = response;
        if (this.usuario.tipo == "local") {
          this.userForm = new FormGroup({
            nombre: new FormControl("", Validators.required),
            urlRepositorio: new FormControl("", Validators.required),
            descripcion: new FormControl("", Validators.required)
          });
        } else {
          this.userForm = new FormGroup({
            nombre: new FormControl("", Validators.required),
            descripcion: new FormControl("", Validators.required)
          });
        }
      });

    //cambiar el 6 por el id
    if (this.usuario.tipo == "gitlab") {
      this._httpService
        .obtener("repositorios/" + this.usuario._id + "/usuarios")
        .subscribe(response => {
          console.log(response);
          this.repositorios = response;
          this.userForm = new FormGroup({
            nombre: new FormControl("", Validators.required),
            descripcion: new FormControl("", Validators.required)
          });
        });
    } else {
      if (this.usuario.tipo == "github" || this.usuario.tipo == "bitbucket") {
        this._httpService
          .obtener("repositorios/" + this.usuario._id + "/usuarios")
          .subscribe(response => {
            console.log(response);
            this.repositorios = response;
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
      let descripcion = this.userForm.controls["descripcion"].value;
      let proyecto: Proyecto;
      this._httpService
        .buscarId("repositorios", datos._id)
        .subscribe(repositorio => {
          console.log(repositorio);

          switch (this.usuario.tipo) {
            case "gitlab":
              proyecto = new Proyecto(
                null,
                datos.nombre,
                datos.descripcion,
                datos.html_url,
                datos.avatar,
                ["categorias"],
                ["licencias"],
                ["clasificacion"],
                ["usuarios"],
                "commits",
                new Date("2018-05-05"),
                new Date("2018-05-05"),
                this.usuario.tipo,
                datos,
                repositorio._id
              );
              break;
            case "github":
              proyecto = new Proyecto(
                null,
                datos.nombre,
                datos.descripcion,
                datos.html_url,
                datos.avatar,
                ["categorias"],
                ["licencias"],
                ["clasificacion"],
                ["usuarios"],
                "commits",
                new Date("2018-05-05"),
                new Date("2018-05-05"),
                this.usuario.tipo,
                datos,
                repositorio._id
              );
              break;
            case "bitbucket":
              proyecto = new Proyecto(
                null,
                datos.nombre,
                datos.descripcion,
                datos.html_url,
                datos.avatar,
                ["categorias"],
                ["licencias"],
                ["clasificacion"],
                ["usuarios"],
                "commits",
                new Date("2018-05-05"),
                new Date("2018-05-05"),
                this.usuario.tipo,
                datos,
                repositorio._id
              );
              break;
            default:
              let urlRepositorio = this.userForm.controls["urlRepositorio"]
                .value;
              proyecto = new Proyecto(
                null,
                datos,
                descripcion,
                urlRepositorio,
                "avatar",
                ["categorias"],
                ["licencias"],
                ["clasificacion"],
                ["usuarios"],
                "commits",
                new Date("2018-05-05"),
                new Date("2018-05-05"),
                this.usuario.tipo,
                [],
                repositorio._id
              );
              break;
          }
          console.log(proyecto);
          this._httpService
            .adicionar("proyectos", proyecto)
            .subscribe(response => {
              this.router.navigate(["/proyectos"]);
            });
          this.userForm.reset();
        });
    }
  }
}
