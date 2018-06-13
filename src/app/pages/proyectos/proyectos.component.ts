import { FormGroup, FormControl } from "@angular/forms";
import { HubInterceptor } from '../../common/interceptor/hub.interceptor';
import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Proyecto } from '../../models/proyecto';
import { HttpService } from "../../services/http/http.service";
import { ProyectosService } from "../../services/proyecto/proyectos.service";

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

  }

}
