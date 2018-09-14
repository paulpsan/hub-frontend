import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../../services/http/http.service';
import { Proyecto } from '../../../../models/proyecto';
import {
  UsuarioService,
  SubirArchivoService
} from '../../../../services/service.index';
import { MatSelectChange } from '@angular/material';
import * as _ from 'lodash';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'hub-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  groupForm: FormGroup;
  imagenSubir: File;
  imagenTemp: any;
  itemSelect;
  showTable: boolean = false;
  usuariosSearch;
  usuario;
  usuarioSelect;
  usuarios = [];
  permisosGrupo = [
    { nombre: "privado", value: "private" },
    { nombre: "interno", value: "internal" },
    { nombre: "publico", value: "public" },
  ]
  permisosUsuario = [
    { nombre: "propietario", rol: "owner", access: "50" },
    { nombre: "mantenedor", rol: "maintainer", access: "40" },
    { nombre: "desarrollador", rol: "developer", access: "30" },
    { nombre: "reportero", rol: "reporter", access: "20" },
    { nombre: "invitado", rol: "guest", access: "10" },
  ]
  constructor(
    private router: Router,
    private _httpService: HttpService,
    private _usuarioService: UsuarioService,
    private _subirArchivoService: SubirArchivoService
  ) { }

  ngOnInit() {
    this._usuarioService.usuario$.subscribe(respUsuario => {
      console.log(respUsuario);
      this.usuario = respUsuario;
    });
    this.groupForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      path: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      visibilidad: new FormControl('', Validators.required),
      usuario: new FormControl(''),
      permiso: new FormControl(''),

    });
    this.usuarios.push({
      _id: this.usuario._id,
      nombre: this.usuario.nombre,
      user_id: this.usuario.usuarioGitlab,
      permiso: 'owner',
      access_level: 50,
    });

    this.groupForm.controls['usuario'].valueChanges.subscribe(resp => {
      let pagData = {
        ordenar: "nombre",
        pagina: 1,
        limite: 10,
        buscar: resp
      };
      this._httpService.obtenerPaginado("usuarios", pagData).subscribe(
        (result: any) => {
          this.usuariosSearch = result.datos
        },
        err => {
          console.log(err);
        }
      );
    })

  }


  seleccionImage(archivo: File) {
    console.log(this.imagenTemp, this.usuario);
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => (this.imagenTemp = reader.result);
  }

  onSubmit() {
    if (this.groupForm.valid) {
      let grupo = {
        nombre: this.groupForm.controls['nombre'].value,
        path: this.groupForm.controls['path'].value,
        descripcion: this.groupForm.controls['descripcion'].value,
        usuarios: this.usuarios,
        visibilidad: this.groupForm.controls['visibilidad'].value.value,
      }
      console.log(grupo);
      this._httpService.adicionar('grupos', grupo).subscribe(response => {
        console.log(response);
      });
      // this.groupForm.reset();
    }
  }
  addUser() {
    let user = this.usuariosSearch.find(usuario => {
      return usuario.nombre === this.groupForm.controls['usuario'].value;
    })
    if (user) {
      this.usuarios.push({
        _id: user._id,
        nombre: user.nombre,
        user_id: user.usuarioGitlab,
        permiso: this.groupForm.controls['permiso'].value.nombre,
        access_level: this.groupForm.controls['permiso'].value.access,
      });
    }
  }
  delUser(usuarios: any) {
    console.log(usuarios);
    let user = this.groupForm.controls['usuario'].value;
    this.usuarios.push({
      nombre: user,
      user_id: user,
      permiso: this.groupForm.controls['permiso'].value.nombre,
      access_level: this.groupForm.controls['permiso'].value.access,
    });
  }

  addSelect(event) {
    console.log(event);
    let option = event.option;
    let value = option.value;
    if ((value || '').trim() && !this.usuarios.find(usuario => {
      return usuario.nombre === value
    })) {
      let user = this.usuariosSearch.find(usuario => {
        return usuario.nombre === value;
      })
      console.log(user);
      this.usuarioSelect.push({
        nombre: user.nombre,
        _id: user._id,
        usuarioGitlab: user.usuarioGitlab,
        url: `${environment.gitlabAdmin.domain}/${user.login}`
      });
    }
  }
}
