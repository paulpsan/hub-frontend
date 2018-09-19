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
  proyectos;
  grupo;
  permisosProyecto = [
    { nombre: "privado", value: "private" },
    { nombre: "interno", value: "internal" },
    { nombre: "publico", value: "public" }
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
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.obtenerDatos()
    });
  }
  obtenerDatos() {
    this._httpService.obtener(`grupos/${this.id}/proyectos`).subscribe(resp => {
      this.grupo = resp
      if (resp.Proyectos.length >= 1)
        this.proyectos = resp.Proyectos
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
