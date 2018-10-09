import { Usuario } from "../../../models/usuario";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../../services/http/http.service";
import { Proyecto } from "../../../models/proyecto";
import {
  UsuarioService,
  SubirArchivoService,
  MessageDataService
} from "../../../services/service.index";
import { MatSelectChange, MatSnackBar, MatDialog } from "@angular/material";
import * as _ from "lodash";
import { environment } from "../../../../environments/environment";
import { SnackbarComponent } from "../../../shared/snackbar/snackbar.component";
import { ModalLicencia } from "../nuevo/nuevo.component";

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
  grupo;
  dominio;
  usuario;
  request;
  dataLoading;
  repositorios;
  categorias: any[] = [];
  usuarios: any[];
  showRepos = false;
  showEntidades = false;
  avanzado = false;
  importar: boolean = false;
  data = {
    sistemasOperativos: "",
    lenguajes: "",
    baseDatos: "",
    dependencias: "",
    alcances: "",
    reglasDesarrollo: "",
    reglasContribucion: "",
    funcionalidades: "",
    comunicacion: "",
    errores: ""
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private _usuarioService: UsuarioService,
    private _subirArchivoService: SubirArchivoService,
    private snackBar: MatSnackBar,
    private _messageDataService: MessageDataService,
    private dialog: MatDialog

  ) {
    this.dominio = environment.gitlabAdmin.domain;
    this.dataLoading = {
      content: "Cargando .........",
      icon: false
    };
  }

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
      version: new FormControl("", Validators.required)
    });
    this.proyForm.controls["nombre"].valueChanges.subscribe(value => {
      this.setUrl(value);
    });
  }

  setValuesRepo(event: MatSelectChange) {
    this.itemSelect = event.value;
    this.proyForm.setValue({
      nombre: this.itemSelect.nombre,
      descripcion: this.itemSelect.descripcion,
      urlRepositorio: `${this.usuario.login}/${this.itemSelect.nombre}`,
      version: ""
    });
    this.proyForm.controls["nombre"].valueChanges.subscribe(value => {
      this.setUrl(value);
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

  onSubmit() {
    if (this.proyForm.controls["nombre"].value.split(" ").length > 1) {
      const objMessage = {
        text: "El nombre del proyecto es invalido",
        type: "Info"
      };
      this._messageDataService.changeMessage(objMessage);
      this.snackBar.openFromComponent(SnackbarComponent, {
        horizontalPosition: "right",
        verticalPosition: "top",
        panelClass: "background-warning",
        duration: 5000
      });
      this.proyForm.controls["nombre"].setValue("");
    } else {
      this.request = true;
      if (this.proyForm.valid) {
        const datos = this.itemSelect;
        let proyecto = {
          nombre: this.proyForm.controls["nombre"].value,
          descripcion: this.proyForm.controls["descripcion"].value,
          visibilidad: "public",
          path: this.proyForm.controls["urlRepositorio"].value,
          version: this.proyForm.controls["version"].value,
          fk_usuario: this.usuario._id,
          fk_repositorio: this.itemSelect._id,
          usuario: this.usuario,
          avatar: "",
          origenUrl: this.itemSelect.html_url,
          clasificacion: { datos: [], valor: 0 },
          categorias: this.categorias,
          usuarios: this.usuarios,
          grupo: this.grupo || "",
          es_grupo: this.grupo ? true : false,
          sistemas_operativos: this.data.sistemasOperativos,
          lenguajes: this.data.lenguajes,
          base_datos: this.data.baseDatos,
          dependencias: this.data.dependencias,
          alcances: this.data.alcances,
          reglas_desarrollo: this.data.reglasDesarrollo,
          reglas_contribucion: this.data.reglasContribucion,
          funcionalidades: this.data.funcionalidades,
          comunicacion: this.data.comunicacion,
          errores: this.data.errores
        };
        this.request = true;
        console.log(proyecto);
        let url = this.grupo ? `grupos/${this.grupo._id}/proyectos?import=true` : `proyectos?import=true`;
        console.log(proyecto);
        this._httpService.adicionar(url, proyecto).subscribe(
          response => {
            this.snackBar.dismiss();
            const objMessage = {
              text: "El proyecto fue creado exitosamente",
              type: "Info"
            };
            this._messageDataService.changeMessage(objMessage);
            this.snackBar.openFromComponent(SnackbarComponent, {
              horizontalPosition: "right",
              verticalPosition: "top",
              panelClass: "background-success",
              duration: 5000
            });
            this.request = false;

            if (!response.mensaje) {

              // this._httpService.post(`proyectos/${response.proyecto._id}/licencias`, this.usuario).subscribe();

              this._httpService.get(`proyectos/${response.proyecto._id}/repositorio`).subscribe(
                () => {
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
                    this.proyForm.reset();
                    this.router.navigate(["/proyectos"]);
                  }
                })
            } else {
              console.log("error ");
            }
          },
          err => {
            console.log(err);
            let objMessage = {};
            if (err.error.message.path[0] == "has already been taken") {
              console.log(typeof err.message);
              objMessage = {
                text: "El nombre del proyecto ya existe",
                type: "Info"
              };
            } else {
              objMessage = {
                text: err.message,
                type: "Info"
              };
            }

            this._messageDataService.changeMessage(objMessage);
            this.snackBar.openFromComponent(SnackbarComponent, {
              horizontalPosition: "right",
              verticalPosition: "top",
              panelClass: "background-warning",
              duration: 5000
            });
            this.request = false;
            console.log(err);
          }
        );
      }
    }
  }
  deleteImage() {
    this.imagenTemp = null;
    this.imagenSubir = null;
  }
  setCategorias(categorias: any) {
    this.categorias = categorias;
  }
  setUsuarios(usuarios: any) {
    console.log(usuarios);
    this.usuarios = usuarios;
  }
  setGrupo(grupo) {
    console.log(grupo);
    this.grupo = grupo;
    this.setUrl(this.proyForm.controls["nombre"].value);
    this.showEntidades = grupo ? true : false;
  }
  setUrl(value) {
    if (this.grupo) {
      this.proyForm.controls["urlRepositorio"].setValue(
        `${this.grupo.path}/${value}`
      );
    } else {
      this.proyForm.controls["urlRepositorio"].setValue(
        `${this.usuario.login}/${value}`
      );
    }
  }
  openLicencia() {
    let dialogRef = this.dialog.open(ModalLicencia, {
      // height: '820px',
      // width: '920px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
