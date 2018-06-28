import { Usuario } from "./../../../models/usuario";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../../services/http/http.service";
import { Proyecto } from "../../../models/proyecto";
import {
  UsuarioService,
  SubirArchivoService
} from "../../../services/service.index";
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
  imagenSubir: File;
  imagenTemp: string;
  itemSelect;
  usuario;
  repositorios;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private _usuarioService: UsuarioService,
    private _subirArchivoService: SubirArchivoService
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
        console.log(this.repositorios);
      });
    this.proyForm = new FormGroup({
      nombre: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.required),
      urlRepositorio: new FormControl("", Validators.required)
    });
  }
  setValues(event: MatSelectChange) {
    this.itemSelect = event.value;
    this.proyForm.setValue({
      nombre: this.itemSelect.nombre,
      descripcion: this.itemSelect.descripcion,
      urlRepositorio: this.itemSelect.html_url
    });
    console.log(event);
  }
  seleccionImage(archivo: File) {
    console.log(this.imagenTemp, this.usuario);
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf("image") < 0) {
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => (this.imagenTemp = reader.result);
  }

  onSubmit() {
    if (this.proyForm.valid) {
      let datos = this.itemSelect;
      let proyecto: Proyecto;
      proyecto = new Proyecto(
        null,
        this.proyForm.controls["nombre"].value,
        this.proyForm.controls["descripcion"].value,
        this.proyForm.controls["urlRepositorio"].value,
        datos._id,
        datos.avatar,
        ["categorias"],
        ["licencias"],
        ["clasificacion"],
        ["usuarios"],
        datos.commits
      );

      this._httpService.adicionar("proyectos", proyecto).subscribe(response => {
        if (!response.mesage) {
          if (this.imagenTemp) {
            this._subirArchivoService
              .subirArchivo(this.imagenSubir, "proyectos", response._id)
              .then((resp: any) => {
                this.setDatosProyecto();
                console.log(resp);
                let objPatch = {
                  avatar: resp.proyecto.avatar
                };
                this._httpService
                  .patch("proyectos", response._id, objPatch)
                  .subscribe(() => {
                    this.router.navigate(["/proyectos"]);
                  });
              });
          } else {
            this.router.navigate(["/proyectos"]);
          }
        } else {
          console.log("errror ");
        }
      });
      this.proyForm.reset();
    }
  }
  setDatosProyecto() {
    
  }
}
