import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService, UsuarioService, SubirArchivoService, LoadDataService, MessageDataService } from '../../../services/service.index';
import { MatSnackBar } from '@angular/material';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'hub-proyectos-personales',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  usuario;
  usuarios;
  proyectos;
  grupos;

  siguiente = new EventEmitter<any>();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {
    order: [[0, "desc"]],
    pagingType: "full_numbers",
    lengthMenu: [[5, 10, 50, -1], [5, 10, 50, "All"]],
    language: {
      search: "Buscar",
      lengthMenu: "Mostrar _MENU_ entradas",
      info: "Mostrar Pagina _PAGE_ de _PAGES_",
      paginate: {
        first: "Primero",
        previous: "Anterior",
        next: "Siguiente",
        last: "Ultimo"
      }
    }
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private _usuarioService: UsuarioService,
    private _subirArchivoService: SubirArchivoService,
    private _loadDataService: LoadDataService,
    private snackBar: MatSnackBar,
    private _messageDataService: MessageDataService
  ) {
  }

  ngOnInit() {

    this._usuarioService.usuario$.subscribe(repUsuario => {
      this.usuario = repUsuario;
      console.log(this.usuario);
      if (this.usuario.Grupos)
        this.grupos = this.usuario.Grupos.length >= 1 ? this.usuario.Grupos : undefined;
      this.obtenerProyectos();
      this.dtTrigger.next();
    });
  }
  obtenerProyectos() {
    this._httpService
      .get(`usuarios/${this.usuario._id}/proyectos`)
      .subscribe(
        result => {
          this.proyectos = result.length >= 1 ? result : undefined;
        },
        err => {
        }
      );
  }
  editar(proyecto) {
    this.router.navigate(["repositorios/editar", proyecto._id])
  }

  salir(grupo) {
    if (
      confirm("Esta seguro de salir del grupo " + grupo.nombre)
    ) {
      grupo.request = "start";
      grupo.change = false;
      this._httpService
        .delete(`grupos/${grupo._id}/usuarios/${this.usuario._id}`)
        .subscribe(
          result => {
            grupo.request = "ok";
            this._httpService
              .obtener(`usuarios/${this.usuario._id}`)
              .subscribe(resp => {
                this.grupos = resp.Grupos;
              });
          },
          err => {
            grupo.request = "error";
          }
        );
    }
  }
}
