import { ComunModule } from './../../common/comun.module';
import { HeaderComponent } from '../../common/components/header/header.component';
import { HubInterceptor } from '../../common/interceptor/hub.interceptor';
import { MaterialModule } from '../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpService } from '../../services/http.service';

import { CrearEditarComponent } from './crear-editar/crear-editar.component';
import { EditarComponent } from './crear-editar/editar.component';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuarioComponent, ModalEliminarUsuario} from './usuario/usuario.component';
import { InicioModule } from '../inicio/inicio.module';
import { ListarComponent } from './listar/listar.component';

@NgModule({
  declarations:[
    // HeaderComponent,
    ModalEliminarUsuario,
    CrearEditarComponent,
    EditarComponent,
    UsuariosComponent,
    UsuarioComponent,
    ListarComponent,
  ],
  imports:[
    CommonModule,
    MaterialModule,
    UsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComunModule,

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
