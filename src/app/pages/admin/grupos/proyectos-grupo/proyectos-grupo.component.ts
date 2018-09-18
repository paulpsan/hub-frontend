import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService, UsuarioService, MessageDataService } from '../../../../services/service.index';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'hub-proyectos-grupo',
  templateUrl: './proyectos-grupo.component.html',
  styleUrls: ['./proyectos-grupo.component.css']
})
export class ProyectosGrupoComponent implements OnInit {
  id: any;
  usuario;
  proyecto;
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
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.obtenerDatos()
    });
  }
  obtenerDatos() {
    this._httpService.obtener(`grupos/${this.id}/proyectos`).subscribe(resp => {
      
      console.log(resp);
    })
  }
  addUser(event) {
    console.log(event);
  }
  eliminar(event) {
    console.log(event);

  }
}
