import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthGuard } from '../common/guard/auth.guard';
import { OrganizacionesComponent } from './organizaciones/organizaciones.component';
import { InicioComponent } from './inicio/inicio.component';
import { PagesComponent } from './pages.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';

const routes: Routes = [

  // {
  //   path: "inicio",
  //   // component:InicioComponent,
  //   loadChildren: "./inicio/inicio.module#InicioModule"
  //   // canActivate:[AuthGuard]
  // },
  {
    path: 'usuarios',
    // component: UsuarioComponent,
    loadChildren: './usuarios/usuarios.module#UsuariosModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'proyectos',
    loadChildren: './proyectos/proyectos.module#ProyectosModule',
    // component: ProyectosComponent,
    canActivate: [AuthGuard]
  }
];

export const PagesRoutingModule = RouterModule.forChild(routes);
