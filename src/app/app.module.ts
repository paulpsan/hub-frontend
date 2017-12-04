import { platformCoreDynamic } from '@angular/compiler';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { CdkTableModule } from '@angular/cdk/table';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { UsuariosModule } from './pages/usuarios/usuarios.module';
import { ProyectosModule } from './pages/proyectos/proyectos.module';

import { InicioComponent } from './pages/inicio/inicio.component';
import { OrganizacionesComponent } from './pages/organizaciones/organizaciones.component';


// import { AdicionarComponent } from './pages/usuarios/adicionar/adicionar.component';
// import { EditarComponent } from './pages/usuarios/editar/editar.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    OrganizacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    MaterialModule,
    UsuariosModule,
    ProyectosModule
  ],
  exports: [
    CdkTableModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
  platformBrowserDynamic().bootstrapModule(AppModule);

