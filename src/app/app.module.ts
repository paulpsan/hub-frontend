import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { ComunModule } from './common/comun.module';
import { InicioModule } from './pages/inicio/inicio.module';

import { AppComponent } from './app.component';
import { AuthGuard } from './common/guard/auth.guard';
import { OrganizacionesComponent } from './pages/organizaciones/organizaciones.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { HubInterceptor } from './common/interceptor/hub.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { ServiceModule } from './services/service.module';
import { HttpErrorInterceptor } from './common/interceptor/http-error.interceptor';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AutenticacionModule } from './autenticacion/autenticacion.module';


// import { AdicionarComponent } from './pages/usuarios/adicionar/adicionar.component';
// import { EditarComponent } from './pages/usuarios/editar/editar.component';

@NgModule({
  declarations: [
    AppComponent,
    OrganizacionesComponent,
  ],
  imports: [
    NgxChartsModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ComunModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    SharedModule,
    ToastrModule.forRoot(),
    ServiceModule
  ],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HubInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// platformBrowserDynamic().bootstrapModule(AppModule);
