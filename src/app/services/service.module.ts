import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AuthService,
  LoginService,
  SubirArchivoService,
  UsuarioService,
  HttpService,

} from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    LoginService,
    SubirArchivoService,
    UsuarioService,
    HttpService,
  ],
  declarations: []
})
export class ServiceModule { }
