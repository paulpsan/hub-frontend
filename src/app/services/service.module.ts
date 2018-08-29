import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AuthService,
  LoginService,
  SubirArchivoService,
  UsuarioService,
  HttpService,
  LoadDataService,
  MessageDataService,
  GitlabService

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
    GitlabService,
    LoadDataService,
    MessageDataService
  ],
  declarations: []
})
export class ServiceModule { }
