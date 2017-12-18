import { HttpService } from '../../services/http.service';

import { HubInterceptor } from '../../common/interceptor/hub.interceptor';
import { MaterialModule } from '../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StarRatingModule } from 'angular-star-rating';

import { ChartsModule } from "ng2-charts/ng2-charts";

import { EditarComponent } from './crear-editar/editar.component';
import { CrearComponent } from './crear-editar/crear.component';
import { ProyectosComponent } from './proyectos.component';
import { ProyectosRoutingModule } from './proyectos-routing.module';
import { ProyectosService } from '../../services/proyectos.service';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { CodigoComponent } from './proyecto/charts/codigo.component';
import { CommitsComponent } from './proyecto/charts/commits.component';
import { LenguajesComponent } from './proyecto/charts/lenguajes.component';
import { ComunModule } from '../../common/comun.module';
import { ListarComponent ,ModalEliminarProyecto } from './listar/listar.component';

@NgModule({
  declarations:[
    ModalEliminarProyecto,
    CrearComponent,
    EditarComponent,
    ProyectosComponent,
    ProyectoComponent,
    CodigoComponent,
    CommitsComponent,
    LenguajesComponent,
    ListarComponent
  ],
  imports:[
    CommonModule,
    MaterialModule,
    ProyectosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    ComunModule,
    StarRatingModule.forRoot(),

  ],
  exports:[
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HubInterceptor,
      multi: true
    },
    ProyectosService,
    HttpService
  ],
  entryComponents: [ModalEliminarProyecto]
})
export class ProyectosModule   {
}
