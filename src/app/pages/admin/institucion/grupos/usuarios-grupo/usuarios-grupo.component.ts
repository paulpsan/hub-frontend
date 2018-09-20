import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService, UsuarioService, MessageDataService } from '../../../../../services/service.index';
import { SnackbarComponent } from '../../../../../shared/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'hub-usuarios-grupo',
  templateUrl: './usuarios-grupo.component.html',
  styleUrls: ['./usuarios-grupo.component.css']
})
export class UsuariosGrupoComponent implements OnInit {
  id: any;
  userForm: FormGroup;
  grupo;
  usuario;
  usuariosSearch;

  edit: boolean = false;
  permisosUsuario = [
    { nombre: "propietario", rol: "owner", access: "50" },
    { nombre: "mantenedor", rol: "maintainer", access: "40" },
    { nombre: "desarrollador", rol: "developer", access: "30" },
    { nombre: "reportero", rol: "reporter", access: "20" },
    { nombre: "invitado", rol: "guest", access: "10" },
  ]
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private _usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private _messageDataService: MessageDataService
  ) {


  }
  ngOnInit() {
    // this._usuarioService.usuario$.subscribe(respUsuario => {
    //   this.usuario = respUsuario;
    //   console.log(this.usuario);
    //   this._httpService.buscarId("grupos", this.usuario._id).subscribe(grupo => {
    //     this.grupo = grupo
    //   })
    // });
    this.userForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      permiso: new FormControl('', Validators.required)
    });


    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.obtenerDatos()
    });
  }
  obtenerDatos() {
    this._httpService.obtener(`grupos/${this.id}/usuarios`).subscribe(resp => {
      this.grupo = resp
      this.grupo.Usuarios.map(usuario => {
        usuario.request = '';
        usuario.change = false;
        return usuario
      })
      console.log(resp);
    })
  }

  guardar(usuario) {
    usuario.request = 'start';
    usuario.change = false;
    let data = {
      fk_usuario: usuario._id,
      fk_grupo: this.grupo._id,
      access_level: usuario.UsuarioGrupo.access_level,
      usuarioGitlab: usuario.usuarioGitlab,
      grupoGitlab: this.grupo.id_gitlab,
      nombre: this.permisosUsuario.find(permiso =>
        permiso.access == usuario.UsuarioGrupo.access_level
      ).nombre
    }
    console.log(data);
    this._httpService.patch(`grupos/usuario`, usuario._id, data).subscribe(result => {
      usuario.request = 'ok';
      console.log(result);
    }, err => {
      console.log(err);
      usuario.request = 'error'
    })
  }
  addUser(event) {
    console.log(event);
    event.idGrupoGitlab = this.grupo.id_gitlab
    event.idGrupo = this.grupo._id
    this._httpService.post(`grupos/${this.id}/usuarios`, event).subscribe(resp => {
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
    }, err => {
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
    })

  }

  eliminar(usuario) {
    if (confirm("Esta seguro de eliminar al usuario: " + usuario.nombre)) {
      usuario.request = 'start';
      usuario.change = false;
      let data = {
        fk_usuario: usuario._id,
        fk_grupo: this.grupo._id,
        usuarioGitlab: usuario.usuarioGitlab,
        grupoGitlab: this.grupo.id_gitlab,
      }
      console.log(data);
      this._httpService.post(`grupos/usuario/${usuario._id}`, data).subscribe(result => {
        usuario.request = 'ok';
        this.obtenerDatos()
        console.log(result);
      }, err => {
        console.log(err);
        usuario.request = 'error'
      })
    }

  }
}
