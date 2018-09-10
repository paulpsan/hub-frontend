import { Usuario } from "../../../models/usuario";
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
  selector: "hub-importar",
  templateUrl: "./importar.component.html",
  styleUrls: ["./importar.component.css"]
})
export class ImportarComponent implements OnInit {
  id: number;
  acciones: string;
  sub: any;
  proyecto: Proyecto;
  proyForm: FormGroup;
  imagenSubir: File;
  imagenTemp: any;
  itemSelect;
  usuario;
  repositorios;
  usuarios: any[];
  categorias: any[];
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
    this._httpService
      .obtener("repositorios/" + this.usuario._id + "/usuarios")
      .subscribe(response => {
        const objRepo = [];
        for (const repo of response.datos) {
          if (repo.visibilidad) {
            this.repositorios = repo;
            this.showRepos = true;
            objRepo.push(repo);
          }
        }
        this.repositorios = objRepo;
        if (this.repositorios.length === 0) {
          this.router.navigate(["/repositorios"]);
        }
      });
    this.proyForm = new FormGroup({
      nombre: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.required),
      urlRepositorio: new FormControl("", Validators.required),
      institucion: new FormControl("", Validators.required)
    });
    this.proyForm.controls["nombre"].valueChanges.subscribe(value => {
      this.proyForm.controls["urlRepositorio"].setValue(
        `${environment.gitlabAdmin.domain}/${this.usuario.login}/${value}`
      );
      console.log(value);
    });
  }
  setValuesRepo(event: MatSelectChange) {
    this.itemSelect = event.value;
    this.proyForm.setValue({
      nombre: this.itemSelect.nombre,
      descripcion: this.itemSelect.descripcion,
      urlRepositorio: `${environment.gitlabAdmin.domain}/${
        this.usuario.login
      }/${this.itemSelect.nombre}`,
      institucion: ""
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

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => (this.imagenTemp = reader.result);
  }

  onSubmit() {
    if (this.proyForm.valid) {
      const datos = this.itemSelect;
      let proyecto: Proyecto;
      proyecto = new Proyecto(
        null,
        this.proyForm.controls["nombre"].value,
        this.proyForm.controls["descripcion"].value,
        this.proyForm.controls["urlRepositorio"].value,
        datos._id,
        this.usuario._id,
        this.usuario,
        datos.avatar,
        datos.tipo,
        this.itemSelect.html_url,
        { datos: [], valor: 0 },
        this.categorias,
        ["licencias"],
        this.usuarios,
        datos.commits
      );

      console.log(proyecto);
      this._httpService.post("proyectos?import=true", proyecto).subscribe(response => {
        console.log(response);
        // this.getUsuariosCommit(response);
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
      this.proyForm.reset();
    }
  }

  setCategorias(categorias: any) {
    this.categorias = categorias;
  }
  setUsuarios(usuario: any) {
    this.usuarios = usuario;
  }
}
