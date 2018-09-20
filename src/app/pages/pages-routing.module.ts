import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../common/guard/auth.guard';
import { RepositoriosComponent } from './repositorios/repositorios.component';

const routes: Routes = [
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
  },
  {
    path: 'repositorios',
    component: RepositoriosComponent,
    // component: ProyectosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    // component:AdminComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'admin-institucion',
  //   loadChildren: './admin-institucion/admin-institucion.module#AdminInstitucionModule',
  //   // component:AdminComponent,
  //   canActivate: [AuthGuard]
  // }
];

export const PagesRoutingModule = RouterModule.forChild(routes);
