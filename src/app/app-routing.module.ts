import { InicioRoutingModule } from "./pages/inicio/inicio-routing.module";
import { ProyectosRoutingModule } from "./pages/proyectos/proyectos-routing.module";
import { UsuariosRoutingModule } from "./pages/usuarios/usuarios-routing.module";
import { OrganizacionesComponent } from "./pages/organizaciones/organizaciones.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { InicioComponent } from './pages/inicio/inicio.component';
import { AppComponent } from "./app.component";
import { ProyectosComponent } from "./pages/proyectos/proyectos.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegistroComponent } from "./pages/login/registro/registro.component";
import { AuthGuard } from "./common/guard/auth.guard";
import { InicioComponent } from "./pages/inicio/inicio.component";
import { UsuariosComponent } from "./pages/usuarios/usuarios.component";
import { NopagefoundComponent } from "./shared/nopagefound/nopagefound.component";
import { PagesComponent } from "./pages/pages.component";

const routes: Routes = [
  // {
  //   path: "",
  //   redirectTo: "login",
  //   pathMatch: "full"
  // },
  // {
  //   path: 'bienvenido',
  //   // component:AppComponent,
  //   loadChildren : './app.module#AppModule',
  //   // canActivate:[AuthGuard]
  // },
  // {
  //   path: 'logout',
  //   component:AppComponent,
  //   // loadChildren : './pages/inicio/inicio.module#InicioModule',
  //   // canActivate:[AuthGuard]
  // },

  {
    path: "inicio",
    // component:InicioComponent,
    loadChildren: "./pages/inicio/inicio.module#InicioModule"
    // canActivate:[AuthGuard]
  },
  // {
  //   path: "usuarios",
  //   loadChildren: "./pages/usuarios/usuarios.module#UsuariosModule",
  //   canActivate: [AuthGuard]
  //   // component: UsuariosComponent
  // },
  // {
  //   path: "proyectos",
  //   loadChildren: "./pages/proyectos/proyectos.module#ProyectosModule",
  //   // component: ProyectosComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: "organizaciones",
    component: OrganizacionesComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "registro",
    component: RegistroComponent
  },
  {
    path: "",
    component: PagesComponent,
    loadChildren: "./pages/pages.module#PagesModule",
    canActivate: [AuthGuard]
  },
  { path: "**", component: NopagefoundComponent }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
