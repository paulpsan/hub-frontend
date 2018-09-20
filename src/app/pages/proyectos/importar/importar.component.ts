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
import { MatSelectChange, MatSnackBar } from "@angular/material";
import * as _ from "lodash";
import { environment } from "../../../../environments/environment";
import { SnackbarComponent } from "../../../shared/snackbar/snackbar.component";

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
  request;
  dataLoading;
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
      institucion: new FormControl("")
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
    this.request = true;
    if (this.proyForm.valid) {
      const datos = this.itemSelect;
      let proyecto: Proyecto;
      proyecto = new Proyecto(
        null,
        this.proyForm.controls["nombre"].value,
        this.proyForm.controls["descripcion"].value,
        "private",
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
            this.proyForm.reset();
            this.router.navigate(["/proyectos"]);
          }
        } else {
          console.log("error ");
        }
      }, err => {
        console.log(err);
        let objMessage = {}
        if (err.error.message.path[0]== 'has already been taken') {
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

  setCategorias(categorias: any) {
    this.categorias = categorias;
  }
  setUsuarios(usuarios: any) {
    console.log(usuarios);
    this.usuarios = usuarios;
  }
}
