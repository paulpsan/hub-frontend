import { HubInterceptor } from '../../common/interceptor/hub.interceptor';
import { MaterialModule } from '../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpService } from '../../services/http.service';
import { InicioComponent } from './inicio.component';
import { InicioRoutingModule } from './inicio-routing.module';
import { OrganizacionesComponent } from '../organizaciones/organizaciones.component';
import { LoginComponent } from '../login/login.component';
import { RegistroComponent } from '../login/registro/registro.component';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { ProyectosModule } from '../proyectos/proyectos.module';
import { HeaderComponent } from '../../common/components/header/header.component';
import { ComunModule } from '../../common/comun.module';


@NgModule({
  declarations:[
    InicioComponent,
    // HeaderComponent,
    // OrganizacionesComponent,
    // LoginComponent,
    // RegistroComponent
  ],
  imports:[
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InicioRoutingModule,

    ComunModule,

    // UsuariosModule,
    // ProyectosModule,
  ],
  exports:[
    // HeaderComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HubInterceptor,
      multi: true
    },
    HttpService
  ],
})
export class InicioModule   {
}
