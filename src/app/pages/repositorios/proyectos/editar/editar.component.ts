import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  HttpService,
  MessageDataService
} from "../../../../services/service.index";
import { environment } from "../../../../../environments/environment";
import { MatSnackBar } from "@angular/material";
import { SnackbarComponent } from "../../../../shared/snackbar/snackbar.component";

@Component({
  selector: "hub-editar",
  templateUrl: "./editar.component.html",
  styleUrls: ["./editar.component.css"]
})
export class EditarComponent implements OnInit {
  id: number;
  acciones: string;
  private prueba: string = "prueba";
  private sub: any;
  private proyecto;
  dominio;
  showBasico: boolean = false;
  showLogo: boolean = false;
  showLicencias: boolean = false;
  projectForm: FormGroup;
  permisosProyecto = [
    { nombre: "privado", value: "private" },
    { nombre: "interno", value: "internal" },
    { nombre: "publico", value: "public" }
  ];
  permisosUsuario = [
    // { nombre: "propietario", rol: "owner", access: "50" },
    // { nombre: "mantenedor", rol: "maintainer", access: "40" },
    { nombre: "desarrollador", rol: "developer", access: "30" },
    { nombre: "reportero", rol: "reporter", access: "20" },
    { nombre: "invitado", rol: "guest", access: "10" }
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private snackBar: MatSnackBar,
    private _messageDataService: MessageDataService
  ) {
    this.dominio = environment.gitlabAdmin.domain;
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
    });
    this.obtenerProyecto();
    this.projectForm = new FormGroup({
      nombre: new FormControl(),
      // logotipo: new FormControl(),
      descripcion: new FormControl(),
      // categorias: new FormControl(''),
      // usuarios: new FormControl(''),
      // grupo: new FormControl(''),
      path: new FormControl({ value: "", disabled: true }),
      version: new FormControl(),
      // visibilidad: new FormControl("", Validators.required),

      sistemasOperativos: new FormControl(),
      lenguajes: new FormControl(),
      baseDAtos: new FormControl(),
      dependencias: new FormControl(),
      alcances: new FormControl(),
      reglasDesarrollo: new FormControl(),
      reglasContribucion: new FormControl(),
      funcionalidades: new FormControl(),
      comunicacion: new FormControl(),
      errores: new FormControl()

      // nombre: new FormControl('', Validators.required)
    });
  }
  obtenerProyecto() {
    this._httpService.buscarId("proyectos", this.id).subscribe(result => {
      console.log(result);
      this.proyecto = result;
      this.cargarDatos();
    });
  }
  cargarDatos() {
    console.log(this.proyecto);
    this.projectForm.setValue({
      nombre: this.proyecto.nombre,
      descripcion: this.proyecto.descripcion,
      path: this.proyecto.path,
      version: this.proyecto.version || "",
      sistemasOperativos: this.proyecto.sistemas_operativos || "",
      lenguajes: this.proyecto.lenguajes || "",
      baseDAtos: this.proyecto.base_datos || "",
      dependencias: this.proyecto.dependencias || "",
      alcances: this.proyecto.alcances || "",
      reglasDesarrollo: this.proyecto.reglas_desarrollo || "",
      reglasContribucion: this.proyecto.reglas_contribucion || "",
      funcionalidades: this.proyecto.funcionalidades || "",
      comunicacion: this.proyecto.comunicacion || "",
      errores: this.proyecto.errores || ""

      // visibilidad: this.proyecto.visibilidad
      // licencias:this.proyecto.licencia
    });
  }
  onSubmit() {
    if (this.projectForm.valid) {
      let proyecto = {
        _id: this.id,
        nombre: this.projectForm.controls["nombre"].value,
        descripcion: this.projectForm.controls["descripcion"].value,
        path: this.projectForm.controls["path"].value,
        version: this.projectForm.controls["version"].value,
        sistemas_operativos: this.projectForm.controls["sistemasOperativos"]
          .value,
        lenguajes: this.projectForm.controls["lenguajes"].value,
        base_datos: this.projectForm.controls["baseDAtos"].value,
        dependencias: this.projectForm.controls["dependencias"].value,
        alcances: this.projectForm.controls["alcances"].value,
        reglas_desarrollo: this.projectForm.controls["reglasDesarrollo"].value,
        reglas_contribucion: this.projectForm.controls["reglasContribucion"]
          .value,
        funcionalidades: this.projectForm.controls["funcionalidades"].value,
        comunicacion: this.projectForm.controls["comunicacion"].value,
        errores: this.projectForm.controls["errores"].value,
        visibilidad: this.proyecto.visibilidad,
        categorias: this.proyecto.categorias
      };
      this._httpService.editar("proyectos", proyecto).subscribe(resp => {
        console.log(resp);
        this.router.navigate(["/repositorios"]);
      });
    }
  }
  eliminar() {
    if (
      confirm("Esta seguro de eliminar el Proyecto: " + this.proyecto.nombre)
    ) {
      console.log(this.proyecto);
      this.proyecto.request = "start";
      this.proyecto.change = false;
      this._httpService.eliminarId(`proyectos`, this.proyecto._id).subscribe(
        result => {
          console.log(result);
          this.proyecto.request = "ok";
          this.router.navigate(["/repositorios"]);
        },
        err => {
          console.log(err);
          this.proyecto.request = "error";
          const objMessage = {
            text: err.error.message,
            type: "Info"
          };
          this._messageDataService.changeMessage(objMessage);
          this.snackBar.openFromComponent(SnackbarComponent, {
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: "background-warning",
            duration: 5000
          });
        }
      );
    }
  }
  eliminarUsuario(usuario) {
    if (confirm("Esta seguro de eliminar al usuario: " + usuario.nombre)) {
      usuario.request = "start";
      usuario.change = false;
      let data = {
        fk_usuario: usuario._id,
        fk_proyecto: this.proyecto._id,
        usuarioGitlab: usuario.usuarioGitlab,
        proyectoGitlab: this.proyecto.proyectoGitlab
      };
      console.log(data);
      this._httpService
        .delete(`proyectos/${this.proyecto._id}/usuarios/${usuario._id}`)
        .subscribe(
          result => {
            usuario.request = "ok";
            this.obtenerProyecto();
          },
          err => {
            console.log(err);
            usuario.request = "error";
          }
        );
    }
  }
  guardarUsuario(usuario) {
    console.log(usuario);
    usuario.request = "start";
    usuario.change = false;
    let data = {
      fk_usuario: usuario._id,
      fk_proyecto: this.proyecto._id,
      access_level: usuario.UsuarioProyecto.access_level
    };
    console.log(data);
    this._httpService
      .patch(`proyectos/${this.id}/usuarios`, usuario._id, data)
      .subscribe(
        result => {
          usuario.request = "ok";
          console.log(result);
        },
        err => {
          console.log(err);
          usuario.request = "error";
        }
      );
  }
  download() {
    this._httpService.getDocument(`proyectos/${this.id}/documento`).subscribe(
      res => {
        console.log("start download:", res);
        var newBlob = new Blob([res], { type: "application/pdf" });
        var url = window.URL.createObjectURL(newBlob);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.setAttribute("style", "display: none");
        a.href = url;
        a.download = "documento.pdf";
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      },
      err => {
        console.log(err);
      }
    );
  }
  setCategorias(event) {
    console.log(event);
    this.proyecto.categorias = event;
  }

  addUser(event) {
    console.log(event);
    event.idProyecto = this.proyecto._id;
    this._httpService.post(`proyectos/${this.id}/usuarios`, event).subscribe(
      resp => {
        const objMessage = {
          text: "Se adiciono exitosamente",
          type: "Info"
        };
        this._messageDataService.changeMessage(objMessage);
        this.snackBar.openFromComponent(SnackbarComponent, {
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: "background-success",
          duration: 5000
        });
        this.obtenerProyecto();
      },
      err => {
        const objMessage = {
          text: err.error.message,
          type: "Info"
        };
        this._messageDataService.changeMessage(objMessage);
        this.snackBar.openFromComponent(SnackbarComponent, {
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: "background-warning",
          duration: 5000
        });
      }
    );
  }
}
