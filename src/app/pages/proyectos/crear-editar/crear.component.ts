import { Usuario } from "./../../../models/usuario";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../../services/http/http.service";
import { Proyecto } from "../../../models/proyecto";
import { UsuarioService } from "../../../services/service.index";
import { MatSelectChange } from "@angular/material";

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
  proyForm: FormGroup;
  itemSelect;
  usuario;
  repositorios;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this._usuarioService.usuario$.subscribe(repUsuario => {
      this.usuario = repUsuario;
    });
    this._httpService
      .obtener("repositorios/" + this.usuario._id + "/usuarios")
      .subscribe(response => {
        let objRepo = [];
        for (const repo of response.datos) {
          if (repo.visibilidad) {
            this.repositorios = repo;
            objRepo.push(repo);
          }
        }
        this.repositorios = objRepo;
        this.proyForm = new FormGroup({
          nombre: new FormControl("", Validators.required),
          descripcion: new FormControl("", Validators.required),
          urlRepositorio: new FormControl("", Validators.required)
        });
        console.log(this.repositorios);
      });
  }
  selectChange(event: MatSelectChange) {
    this.itemSelect = event.value;
    console.log(event);
  }
  onSubmit() {
    if (this.proyForm.valid) {
      let datos = this.itemSelect;
      let descripcion = this.proyForm.controls["descripcion"].value;
      let proyecto: Proyecto;
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
        datos.commits
      );
      this._httpService.adicionar("proyectos", proyecto).subscribe(response => {
        this.router.navigate(["/proyectos"]);
      });
      this.proyForm.reset();
    }
  }
}
