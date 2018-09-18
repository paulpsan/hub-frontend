import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { HttpService, UsuarioService } from '../../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'hub-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  public usuario;
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
  public grupos = [];
  permisosGrupo = [
    { nombre: "privado", value: "private" },
    { nombre: "interno", value: "internal" },
    { nombre: "publico", value: "public" }
  ];
  constructor(private _httpService: HttpService, private _usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
    this._usuarioService.usuario$.subscribe(respUsuario => {
      this.usuario = respUsuario;
      this.obtenerDatos();
    });
  }
  obtenerDatos(event?: PageEvent) {
    this._httpService.buscarId("usuarios", this.usuario._id).subscribe(resp => {
      this._httpService.buscarId("grupos", resp.Grupos[0]._id).subscribe(resp => {
        this.grupos.push(resp);
      })
      console.log(this.grupos);
    })
  }
  changeSelect(event, grupo) {
    console.log(event);
    grupo.change = true;
  }
  guardar(grupo) {
    console.log(grupo);
    grupo.request = 'start';
    grupo.change = false;
    this._httpService.editar("grupos", grupo).subscribe(result => {
      console.log(result);
      grupo.request = 'ok';


    }, err => {
      console.log(err);
      grupo.request = 'error'
    })
  }

  eliminar(usuario) {

  }
}
