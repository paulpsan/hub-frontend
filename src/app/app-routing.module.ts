import { ProyectosRoutingModule } from './pages/proyectos/proyectos-routing.module';
import { UsuariosRoutingModule } from './pages/usuarios/usuarios-routing.module';
import { OrganizacionesComponent } from './pages/organizaciones/organizaciones.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AppComponent } from './app.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'proyectos',
    component: ProyectosComponent
  },
  {
    path: 'organizaciones',
    component: OrganizacionesComponent
  },
  { path: '**', component: InicioComponent } 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    UsuariosRoutingModule,
    ProyectosRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
