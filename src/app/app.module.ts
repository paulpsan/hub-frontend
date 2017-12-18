import { InicioModule } from './pages/inicio/inicio.module';
import { HeaderComponent } from './common/components/header/header.component';
import { platformCoreDynamic } from '@angular/compiler';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { CdkTableModule } from '@angular/cdk/table';
import { AppRoutingModule } from './app-routing.module';
import { ComunModule } from './common/comun.module'
import { MaterialModule } from './material/material.module';
import { RecaptchaModule } from 'ng2-recaptcha';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UsuariosModule } from './pages/usuarios/usuarios.module';
import { ProyectosModule } from './pages/proyectos/proyectos.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { OrganizacionesComponent } from './pages/organizaciones/organizaciones.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/login/registro/registro.component';

import { LoginService } from './services/login.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './common/guard/auth.guard';


// import { AdicionarComponent } from './pages/usuarios/adicionar/adicionar.component';
// import { EditarComponent } from './pages/usuarios/editar/editar.component';


@NgModule({
  declarations: [
    AppComponent,
    OrganizacionesComponent,
    LoginComponent,
    RegistroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComunModule,
    InicioModule,
    // UsuariosModule,
    // ProyectosModule,
    RecaptchaModule.forRoot(), // Keep in mind the "forRoot"-magic nuances!
  ],
  exports: [

    CdkTableModule,
  ],
  providers: [
    LoginService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
  platformBrowserDynamic().bootstrapModule(AppModule);

