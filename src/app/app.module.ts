import { platformCoreDynamic } from '@angular/compiler';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { CdkTableModule } from '@angular/cdk/table';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { RecaptchaModule } from 'ng2-recaptcha';

import { AppComponent } from './app.component';
import { UsuariosModule } from './pages/usuarios/usuarios.module';
import { ProyectosModule } from './pages/proyectos/proyectos.module';

import { InicioComponent } from './pages/inicio/inicio.component';
import { OrganizacionesComponent } from './pages/organizaciones/organizaciones.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/login/registro/registro.component';

import { LoginService } from './services/login.service';


// import { AdicionarComponent } from './pages/usuarios/adicionar/adicionar.component';
// import { EditarComponent } from './pages/usuarios/editar/editar.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    OrganizacionesComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    MaterialModule,
    UsuariosModule,
    ProyectosModule,
    RecaptchaModule.forRoot(), // Keep in mind the "forRoot"-magic nuances!
  ],
  exports: [
    CdkTableModule
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
  platformBrowserDynamic().bootstrapModule(AppModule);

