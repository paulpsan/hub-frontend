import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { RegistroComponent } from './registro/registro.component';
import { ResetComponent } from './reset/reset.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { VerificacionComponent } from './verificacion/verificacion.component';

@NgModule({
  imports: [
    CommonModule,
    AutenticacionRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,

  ],
  declarations: [
    LoginComponent,
    RegistroComponent,
    ResetComponent,
    RecuperarComponent,
    VerificacionComponent
  ]
})
export class AutenticacionModule { }
