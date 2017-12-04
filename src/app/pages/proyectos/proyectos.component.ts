import { FormGroup, FormControl } from "@angular/forms";
import { HubInterceptor } from '../../common/interceptor/hub.interceptor';
import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Proyecto } from '../../models/proyecto';
import { HttpService } from '../../services/http.service'
import { ProyectosService } from '../../services/proyectos.service';

@Component({
  selector: 'hub-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
 
  proyectos : Proyecto[];
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
    this.obtenerProyectos();
  }
  obtenerProyectos(){
    this._httpService.obtener('proyectos').subscribe(
      result =>{
        this.respuesta=result;
        this.proyectos=this.respuesta.datos;
        console.log (this.respuesta.datos);
      },
      err =>{
        console.log(err);
      }
    ) 
  }
  obtenerProyectosPag(){
    console.log(this.paginacion.pagina);
    this._httpService.obtenerPaginado('proyectos',this.paginacion).subscribe(
      result =>{
        this.respuesta=result;
        this.proyectos=this.respuesta.datos;
        console.log (this.respuesta.datos);
      },
      err =>{
        console.log(err);
      }
    )
  }
  mostrar(proyecto:Proyecto){
    this.idSelect=proyecto.id;
    this.mostrarToggle=!this.mostrarToggle;
  }
  //funcion dela paginacion
  pageEvent(event:string){
    console.log(event);
  }
  irProyecto(proyecto:Proyecto){
    if (proyecto) {
      this.router.navigate(['/proyectos', proyecto.id]);
    } 
  }
 
  adicionar(){
      this.router.navigate(['/proyectos/adicionar']);
  }

  eliminar(proyecto:Proyecto):void{
    console.log(proyecto);
    let dialogRef = this.dialog.open(ModalEliminarProyecto, {
      width: '350px',
      data: proyecto 
    });

    dialogRef.afterClosed().subscribe(result => {

      // this._proyectosService.eliminarId(result._id).subscribe(
      //       res => {
      //         //AQUI colocamos las notificaciones!!
      //         // setTimeout(()=>
      //         // { 
      //         //   this.obtenerProyectos();
      //         // }, 1000);
      //         // console.log('done');
      //       }
      // );
    });
  }
}
@Component({
  selector: 'modal-eliminar-proyecto',
  templateUrl: 'modal-eliminar-proyecto.html',
})
export class ModalEliminarProyecto {
  
    constructor(
      public dialogRef: MatDialogRef<ModalEliminarProyecto>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    cancelarClick(): void {
      this.dialogRef.close();
    }
  
  }