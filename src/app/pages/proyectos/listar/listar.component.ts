import { FormGroup, FormControl } from "@angular/forms";
import { HubInterceptor } from '../../../common/interceptor/hub.interceptor';
import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Proyecto } from '../../../models/proyecto';
import { HttpService } from '../../../services/http.service'
import { ProyectosService } from '../../../services/proyectos.service';

@Component({
  selector: 'hub-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  proyectos : any[];
  private respuesta: any;
  private mostrarToggle:boolean=false;
  private idSelect;
  private paginacion;

  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  constructor(private _proyectosService: ProyectosService, private router: Router, private dialog:MatDialog,private _httpService:HttpService ) {
    this.paginacion={
      pagina:'1',
      limite:'2'
    };
   }
  ngOnInit() {
    console.log("listando proyectos");
    this.obtenerProyectos();
  }
  obtenerProyectos(){
    this._httpService.obtener('proyectos').subscribe(
      result =>{
        this.respuesta=result;
        this.proyectos=this.respuesta.datos;
        console.log (this.proyectos);
      },
      err =>{
        console.log(err);
      }
    )
  }
  // obtenerProyectosPag(){
  //   console.log(this.paginacion.pagina);
  //   this._httpService.obtenerPaginado('proyectos',this.paginacion).subscribe(
  //     result =>{
  //       this.respuesta=result;
  //       this.proyectos=this.respuesta.datos;
  //       console.log (this.respuesta.datos);
  //     },
  //     err =>{
  //       console.log(err);
  //     }
  //   )
  // }
  mostrar(proyecto:Proyecto){
    this.idSelect=proyecto._id;
    this.mostrarToggle=!this.mostrarToggle;
  }
  //funcion dela paginacion
  pageEvent(event:string){
    console.log(event);
  }
  irProyecto(proyecto:Proyecto){
    if (proyecto) {
      this.router.navigate(['/proyectos', proyecto._id]);
    }
  }

  adicionar(){
      this.router.navigate(['/proyectos/adicionar']);
  }
}
