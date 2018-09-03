import { NgModule } from '@angular/core';
import { OrganizacionesComponent } from './pages/organizaciones/organizaciones.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './common/guard/auth.guard';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full"
  },
  {
    path: 'organizaciones',
    component: OrganizacionesComponent
  },

  {
    path: 'inicio',
    loadChildren: './pages/inicio/inicio.module#InicioModule'
    // canActivate:[AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: '../app/autenticacion/autenticacion.module#AutenticacionModule'
  },
  {
    path: '',
    loadChildren: './pages/pages.module#PagesModule',
    canActivate: [AuthGuard]
  },
  { path: '**', component: NopagefoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
