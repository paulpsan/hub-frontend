import { Component, OnInit, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../../services/http/http.service";
import { Proyecto } from "../../../models/proyecto";
import {
  UsuarioService,
  SubirArchivoService,
  MessageDataService
} from "../../../services/service.index";
import { MatSelectChange, MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import * as _ from "lodash";
import { environment } from "../../../../environments/environment";
import { SnackbarComponent } from "../../../shared/snackbar/snackbar.component";

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
  itemSelect;
  grupo;
  dominio;
  usuario;
  request;
  dataLoading;
  usuarios: any[];
  categorias: any[] = [];
  repositorios;
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

    this.nuevoForm = new FormGroup({
      nombre: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.required),
      urlRepositorio: new FormControl("", Validators.required),
      version: new FormControl("", Validators.required)
    });
    this.nuevoForm.controls["nombre"].valueChanges.subscribe(value => {
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
  deleteImage() {
    this.imagenTemp = null;
    this.imagenSubir = null;
  }

  onSubmit() {
    if (this.nuevoForm.controls["nombre"].value.split(" ").length > 1) {
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
      this.nuevoForm.controls["nombre"].setValue("");
    } else {
      if (this.nuevoForm.valid) {
        let proyecto = {
          nombre: this.nuevoForm.controls["nombre"].value,
          descripcion: this.nuevoForm.controls["descripcion"].value,
          visibilidad: "public",
          path: this.nuevoForm.controls["urlRepositorio"].value,
          version: this.nuevoForm.controls["version"].value,
          fk_usuario: this.usuario._id,
          usuario: this.usuario,
          avatar: "",
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
        let url = this.grupo
          ? `grupos/${this.grupo._id}/proyectos`
          : `proyectos`;

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
              this._httpService.post(`proyectos/${response.proyecto._id}/licencias`, this.usuario).subscribe();
              //cargamos datos de commits del proyecto
              this._httpService.get(`proyectos/${response.proyecto._id}/gitlab`).subscribe(
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
                    this.nuevoForm.reset();
                    this.router.navigate(["/proyectos"]);
                  }
                })

            } else {
              console.log("error ");
              this.request = false;
            }
          },
          err => {
            console.log(err);
            this.request = false;
            let objMessage = {};
            if (err.error.message.path) {
              console.log(typeof err.message);
              objMessage = {
                text: "El nombre del proyecto ya existe",
                type: "Info"
              };
            } else {
              objMessage = {
                text: err.error.message,
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
            console.log(err);
          }
        );
      }
    }
  }
  setCategorias(categorias: any) {
    this.categorias = categorias;
  }
  setUsuarios(usuarios: any) {
    this.usuarios = usuarios;
  }
  setGrupo(grupo) {
    console.log(grupo);
    this.grupo = grupo;
    this.setUrl(this.nuevoForm.controls["nombre"].value);

    this.showEntidades = grupo ? true : false;
  }

  setUrl(value) {
    if (this.grupo) {
      this.nuevoForm.controls["urlRepositorio"].setValue(
        `${this.grupo.path}/${value}`
      );
    } else {
      this.nuevoForm.controls["urlRepositorio"].setValue(
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
@Component({
  selector: "modal-licencia",
  templateUrl: "modal-licencia.html"
})
export class ModalLicencia {
  pdfSrc: string = '/assets/pdf/Licencia.pdf';
  dataLoading: any = {
    title: ""
  };
  constructor(
    public dialogRef: MatDialogRef<ModalLicencia>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // this.dataLoading.title = "cargando"
  }
  loading() {
    this.dataLoading = undefined;
  }
  cancelarClick(): void {
    this.dialogRef.close();
  }
}
