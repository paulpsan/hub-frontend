import { HttpService } from "../../services/http/http.service";

import { HubInterceptor } from "../../common/interceptor/hub.interceptor";
import { MaterialModule } from "../../material/material.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SharedModule } from "../../shared/shared.module";
import { PipesModule } from "../../pipes/pipes.module";

import { EditarComponent } from "./crear-editar/editar.component";
import { CrearComponent } from "./crear-editar/crear.component";
import { ProyectosComponent } from "./proyectos.component";
import { ProyectosRoutingModule } from "./proyectos-routing.module";
import { ProyectosService } from "../../services/proyecto/proyectos.service";
import {
  ProyectoComponent,
  ModalEliminarProyecto
} from "./proyecto/proyecto.component";
import { ComunModule } from "../../common/comun.module";
import { ListarComponent } from "./listar/listar.component";
import { NuevoComponent } from './nuevo/nuevo.component';
import { ImportarComponent } from './importar/importar.component';

@NgModule({
  declarations: [
    ModalEliminarProyecto,
    CrearComponent,
    EditarComponent,
    ProyectosComponent,
    ProyectoComponent,
    ListarComponent,
    NuevoComponent,
    ImportarComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    ProyectosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComunModule,
    SharedModule,
    PipesModule
  ],
  exports: [],
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
export class ProyectosModule {}
