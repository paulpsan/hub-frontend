import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./common/components/header/header.component";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";
import { LoadingBarModule } from "@ngx-loading-bar/core";

import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./material/material.module";
import { ComunModule } from "./common/comun.module";
import { InicioModule } from "./pages/inicio/inicio.module";
import { UsuariosModule } from "./pages/usuarios/usuarios.module";
import { ProyectosModule } from "./pages/proyectos/proyectos.module";

import { AppComponent } from "./app.component";
import { InicioComponent } from "./pages/inicio/inicio.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegistroComponent } from "./pages/login/registro/registro.component";

import { LoginService } from "./services/login.service";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./common/guard/auth.guard";
import { OrganizacionesComponent } from "./pages/organizaciones/organizaciones.component";
import { NopagefoundComponent } from "./common/components/nopagefound/nopagefound.component";

// import { AdicionarComponent } from './pages/usuarios/adicionar/adicionar.component';
// import { EditarComponent } from './pages/usuarios/editar/editar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    NopagefoundComponent,
    OrganizacionesComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ComunModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    ReactiveFormsModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    InicioModule
    // UsuariosModule,
    // ProyectosModule,
    // RecaptchaModule.forRoot(), // Keep in mind the "forRoot"-magic nuances!
  ],
  exports: [
    // CdkTableModule,
  ],
  providers: [AuthService, AuthGuard, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {}
// platformBrowserDynamic().bootstrapModule(AppModule);
