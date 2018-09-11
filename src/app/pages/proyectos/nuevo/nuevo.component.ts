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
import * as _ from "lodash";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "hub-nuevo",
  templateUrl: "./nuevo.component.html",
  styleUrls: ["./nuevo.component.css"]
})
export class NuevoComponent implements OnInit {
  id: number;
  acciones: string;
  sub: any;
  proyecto: Proyecto;
  nuevoForm: FormGroup;
  imagenSubir: File;
  imagenTemp: any;
  usuario;
  usuarios: any[];
  categorias: any[];
  repositorios;
  showRepos = false;

  importar: boolean = false;

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

    this.nuevoForm = new FormGroup({
      nombre: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.required),
      urlRepositorio: new FormControl("", Validators.required),
      institucion: new FormControl("")
    });
    this.nuevoForm.controls["nombre"].valueChanges.subscribe(value => {
      this.nuevoForm.controls["urlRepositorio"].setValue(
        `${environment.gitlabAdmin.domain}/${this.usuario.login}/${value}`
      );
      console.log(value);
    });
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

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => (this.imagenTemp = reader.result);
  }
  deleteImage() {
    this.imagenTemp = null;
    this.imagenSubir = null;
  }

  onSubmit() {
    if (this.nuevoForm.valid) {
      let proyecto: Proyecto;
      proyecto = new Proyecto(
        null,
        this.nuevoForm.controls["nombre"].value,
        this.nuevoForm.controls["descripcion"].value,
        this.nuevoForm.controls["urlRepositorio"].value,
        null,
        this.usuario._id,
        this.usuario,
        "",
        "",
        "",
        { datos: [], valor: 0 },
        this.categorias,
        ["licencias"],
        this.usuarios,
        ""
      );

      this._httpService
        .adicionar("proyectos?nuevo=true", proyecto)
        .subscribe(response => {
          console.log(response);
          if (!response.mensaje) {
            if (this.imagenTemp) {
              this._subirArchivoService
                .subirArchivo(
                  this.imagenSubir,
                  "proyectos",
                  response.proyecto._id
                )
                .then((resp: any) => {
                  console.log(resp);
                  const objPatch = {
                    avatar: resp.proyecto.avatar
                  };
                  this._httpService
                    .patch("proyectos", response.proyecto._id, objPatch)
                    .subscribe(() => {
                      this.router.navigate(["/proyectos"]);
                    });
                });
            } else {
              this.router.navigate(["/proyectos"]);
            }
          } else {
            console.log("error ");
          }
        });
      this.nuevoForm.reset();
    }
  }
  setCategorias(categorias: any) {
    this.categorias = categorias;
  }
  setUsuarios(usuario: any) {
    this.usuarios = usuario;
  }
}
