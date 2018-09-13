import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { GruposComponent } from './grupos/grupos.component';
import { CrearComponent } from './grupos/crear-editar/crear.component';
import { EditarComponent } from './grupos/crear-editar/editar.component';
import { UsuariosGrupoComponent } from './grupos/usuarios-grupo/usuarios-grupo.component';
import { ProyectosGrupoComponent } from './grupos/proyectos-grupo/proyectos-grupo.component';

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      { path: "", component: UsuariosComponent },
      { path: "usuarios", component: UsuariosComponent },
      { path: "grupos", component: GruposComponent },
      { path: "grupos/nuevo", component: CrearComponent },
      { path: "grupos/editar", component: EditarComponent },
      { path: "grupos/usuarios", component: UsuariosGrupoComponent },
      { path: "grupos/proyectos", component: ProyectosGrupoComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
