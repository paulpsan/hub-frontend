import { HubInterceptor } from '../../common/interceptor/hub.interceptor';
import { MaterialModule } from '../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpService } from '../../services/http.service';

import { CrearEditarComponent } from './usuario/crear-editar/crear-editar.component';
import { EditarComponent } from './usuario/crear-editar/editar.component';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuarioComponent, ModalEliminarUsuario} from './usuario/usuario.component';

@NgModule({ 
  declarations:[
    ModalEliminarUsuario,
    CrearEditarComponent,
    EditarComponent,
    UsuariosComponent,
    UsuarioComponent,
  ],
  imports:[
    CommonModule,
    MaterialModule,
    UsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
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
