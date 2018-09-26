import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import {
  HttpService,
  UsuarioService,
  MessageDataService
} from "../../../../../../services/service.index";
import { SnackbarComponent } from "../../../../../../shared/snackbar/snackbar.component";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "hub-usuarios-proyecto",
  templateUrl: "./usuarios-proyecto.component.html",
  styleUrls: ["./usuarios-proyecto.component.css"]
})
export class UsuariosProyectoComponent implements OnInit {
  id: any;
  userForm: FormGroup;
  proyecto;
  usuario;
  usuariosSearch;

  edit: boolean = false;
  permisosUsuario = [
    { nombre: "desarrollador", rol: "developer", access: "30" },
    { nombre: "reportero", rol: "reporter", access: "20" },
    { nombre: "invitado", rol: "guest", access: "10" }
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private _usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private _messageDataService: MessageDataService
  ) { }
  ngOnInit() {
    // this._usuarioService.usuario$.subscribe(respUsuario => {
    //   this.usuario = respUsuario;
    //   console.log(this.usuario);
    //   this._httpService.buscarId("grupos", this.usuario._id).subscribe(proyecto => {
    //     this.proyecto = proyecto
    //   })
    // });
    this.userForm = new FormGroup({
      nombre: new FormControl("", Validators.required),
      permiso: new FormControl("", Validators.required)
    });

    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.obtenerDatos();
    });
  }
  obtenerDatos() {
    this._httpService.obtener(`proyectos/${this.id}`).subscribe(resp => {
      this.proyecto = resp;
      // this.proyecto.Usuarios.map(usuario => {
      //   usuario.request = '';
      //   usuario.change = false;
      //   return usuario
      // })
      console.log(resp);
    });
  }

  guardar(usuario) {
    console.log(usuario);
    usuario.request = "start";
    usuario.change = false;
    let data = {
      fk_usuario: usuario._id,
      fk_proyecto: this.proyecto._id,
      access_level: usuario.UsuarioProyecto.access_level,

    };
    console.log(data);
    this._httpService.patch(`proyectos/${this.id}/usuarios`, usuario._id, data).subscribe(
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
  addUser(event) {
    console.log(event);
    event.proyectoGitlab = this.proyecto.proyectoGitlab;
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
        this.obtenerDatos();
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

  eliminar(usuario) {
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
      this._httpService.delete(`proyectos/${this.proyecto._id}/usuarios/${usuario._id}`).subscribe(
        result => {
          usuario.request = "ok";
          this.obtenerDatos();
          console.log(result);
        },
        err => {
          console.log(err);
          usuario.request = "error";
        }
      );
    }
  }
}
