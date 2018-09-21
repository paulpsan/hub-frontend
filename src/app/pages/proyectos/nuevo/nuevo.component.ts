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
import { MatSelectChange, MatSnackBar } from "@angular/material";
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
  usuario;
  request;
  dataLoading;
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
    private _subirArchivoService: SubirArchivoService,
    private snackBar: MatSnackBar,
    private _messageDataService: MessageDataService
  ) {
    this.dataLoading = {
      content: 'Cargando .........',
      icon: false,
    }
  }

  ngOnInit() {
    this._usuarioService.usuario$.subscribe(repUsuario => {
      this.usuario = repUsuario;
    });

    this.nuevoForm = new FormGroup({
      nombre: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.required),
      urlRepositorio: new FormControl({ value: "", disabled: true }, Validators.required),
    });
    this.nuevoForm.controls["nombre"].valueChanges.subscribe(value => {
      this.setUrl(value)
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
        type: "Info",
      }
      this._messageDataService.changeMessage(objMessage);
      this.snackBar.openFromComponent(SnackbarComponent, {
        horizontalPosition: 'right',
        verticalPosition: "top",
        panelClass: "background-warning",
        duration: 5000
      });
      this.nuevoForm.controls["nombre"].setValue("");
    } else {
      if (this.nuevoForm.valid) {
        let proyecto: Proyecto;
        proyecto = new Proyecto(
          null,
          this.nuevoForm.controls["nombre"].value,
          this.nuevoForm.controls["descripcion"].value,
          "private",
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
          this.usuarios
        );
        proyecto.grupo = this.grupo || ""
        this.request = true;
        console.log(proyecto);
        this._httpService
          .adicionar("proyectos?nuevo=true", proyecto)
          .subscribe(response => {
            this.snackBar.dismiss();
            const objMessage = {
              text: "El proyecto fue creado exitosamente",
              type: "Info",
            }
            this._messageDataService.changeMessage(objMessage);
            this.snackBar.openFromComponent(SnackbarComponent, {
              horizontalPosition: 'right',
              verticalPosition: "top",
              panelClass: "background-success",
              duration: 5000
            });
            this.request = false

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
                this.nuevoForm.reset();
                this.router.navigate(["/proyectos"]);
              }
            } else {
              console.log("error ");
            }
          }, err => {
            console.log(err);
            let objMessage = {}
            if (err.error.message.path[0] == 'has already been taken') {
              console.log(typeof err.message);
              objMessage = {
                text: "El nombre del proyecto ya existe",
                type: "Info",
              }
            } else {
              objMessage = {
                text: err.message,
                type: "Info",
              }
            }

            this._messageDataService.changeMessage(objMessage);
            this.snackBar.openFromComponent(SnackbarComponent, {
              horizontalPosition: 'right',
              verticalPosition: "top",
              panelClass: "background-warning",
              duration: 5000
            });
            this.request = false
            console.log(err);
          });
      }
    }
  }
  setCategorias(categorias: any) {
    this.categorias = categorias;
  }
  setUsuarios(usuario: any) {
    this.usuarios = usuario;
  }
  setGrupo(grupo) {
    console.log(grupo);
    this.grupo = grupo;
    this.setUrl(this.nuevoForm.controls["nombre"].value)
  }

  setUrl(value) {
    if (this.grupo) {
      this.nuevoForm.controls["urlRepositorio"].setValue(
        `${environment.gitlabAdmin.domain}/${this.grupo.path}/${value}`
      );
    } else {
      this.nuevoForm.controls["urlRepositorio"].setValue(
        `${environment.gitlabAdmin.domain}/${this.usuario.login}/${value}`
      );
    }
  }
}
