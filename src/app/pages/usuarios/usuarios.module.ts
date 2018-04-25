import { ComunModule } from './../../common/comun.module';
import { HeaderComponent } from '../../common/components/header/header.component';
import { HubInterceptor } from '../../common/interceptor/hub.interceptor';
import { MaterialModule } from '../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpService } from '../../services/http.service';

import { ChartsModule } from "ng2-charts/ng2-charts";

import { CrearEditarComponent } from './crear-editar/crear-editar.component';
import { EditarComponent } from './crear-editar/editar.component';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuarioComponent, ModalEliminarUsuario} from './usuario/usuario.component';
import { UsuarioBbComponent } from './usuario/usuarioBb.component';
import { InicioModule } from '../inicio/inicio.module';
import { ListarComponent } from './listar/listar.component';
import { CommitsComponent } from './charts/commits.component';
import { LenguajesComponent } from './charts/lenguajes.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations:[
    // HeaderComponent,
    ModalEliminarUsuario,
    CrearEditarComponent,
    EditarComponent,
    UsuariosComponent,
    UsuarioComponent,
    UsuarioBbComponent,
    ListarComponent,
    CommitsComponent,
    LenguajesComponent,
  ],
  imports:[
    CommonModule,
    MaterialModule,
    UsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComunModule,
    ChartsModule,
    DataTablesModule

  ],
  exports:[
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HubInterceptor,
      multi: true
    },
    UsuariosService,
    HttpService
  ],
  entryComponents: [ModalEliminarUsuario]
})
export class UsuariosModule   {
}
