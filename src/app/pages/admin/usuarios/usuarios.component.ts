import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, PageEvent } from '@angular/material';
import { HttpService } from '../../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'hub-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public respuesta: any;
  public title = "Star Rating";
  public avatar;
  public buscar = "";
  public ordenar;
  public pagina = 1;
  public limite = 10;
  public total;
  public pageSizeOptions = [5, 10, 25, 100];
  public pageEvent: PageEvent;
  public usuarios;

  constructor(private _httpService: HttpService, private router: Router) { }

  ngOnInit() {

    this.obtenerDatos();
  }
  obtenerDatos(event?: PageEvent) {
    let pagData;
    if (event == null) {
      pagData = {
        ordenar: "nombre",
        pagina: 1,
        limite: 10
      };
    } else {
      pagData = {
        ordenar: "nombre",
        pagina: event.pageIndex + 1,
        limite: event.pageSize
      };
    }
    if (this.buscar != "") {
      pagData.buscar = this.buscar;
    }
    this._httpService.obtenerPaginado("usuarios/admin", pagData).subscribe(
      result => {
        console.log(result);
        this.respuesta = result;
        this.total = this.respuesta.paginacion.total;
        this.pagina = this.respuesta.paginacion.paginaActual - 1;
        this.limite = this.respuesta.paginacion.limite;
        this.usuarios = this.respuesta.datos;
        this.usuarios.map(usuarios => {
          return usuarios.request = ""
        })
      },
      err => {
        console.log(err);
      }
    );
  }
  setAdmin(event, usuario) {
    usuario.admin_group = event.checked;
    usuario.request = "start"
    this._httpService.editar('usuarios', usuario).subscribe(resp => {
      usuario.request = "finish"
      setTimeout(() => {
        usuario.request = ""
      }, 3000);
    })
  }
  salirGrupo(usuario, grupo) {
    if (confirm("Esta seguro de eliminar al usuario: " + usuario.nombre + " del grupo " + grupo.nombre)) {
      grupo.request = 'start';
      grupo.change = false;
      this._httpService.delete(`grupos/${grupo._id}/usuarios/${usuario._id}`).subscribe(result => {
        grupo.request = 'ok';
        this.obtenerDatos()
        console.log(result);
      }, err => {
        console.log(err);
        grupo.request = 'error'
      })
    }
  }
  bloqueadoUsuario(usuario) {
    if (confirm("Esta seguro de bloquear al usuario: " + usuario.nombre)) {
      usuario.request = 'start';
      usuario.change = false;
      this._httpService.post(`usuarios/${usuario._id}/bloquear`, usuario).subscribe(result => {
        usuario.request = 'ok';
        this.obtenerDatos()
        console.log(result);
      }, err => {
        console.log(err);
        usuario.request = 'error'
        this.obtenerDatos()
      })
    }
  }
  desbloquearUsuario(usuario) {
    if (confirm("Esta seguro de desbloquear al usuario: " + usuario.nombre)) {
      usuario.request = 'start';
      usuario.change = false;
      this._httpService.post(`usuarios/${usuario._id}/desbloquear`, usuario).subscribe(result => {
        usuario.request = 'ok';
        this.obtenerDatos()
        console.log(result);
      }, err => {
        console.log(err);
        usuario.request = 'error'
        this.obtenerDatos()
      })
    }
  }
}