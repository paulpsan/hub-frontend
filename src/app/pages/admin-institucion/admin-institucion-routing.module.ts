import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { GruposComponent } from './grupos/grupos.component';
import { CrearComponent } from './grupos/crear-editar/crear.component';
import { EditarComponent } from './grupos/crear-editar/editar.component';
import { UsuariosGrupoComponent } from './grupos/usuarios-grupo/usuarios-grupo.component';
import { ProyectosGrupoComponent } from './grupos/proyectos-grupo/proyectos-grupo.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { UsuariosProyectoComponent } from './grupos/proyectos-grupo/usuarios-proyecto/usuarios-proyecto.component';
import { AdminInstitucionComponent } from './admin-institucion.component';

const routes: Routes = [
  {
    path: "",
    component: AdminInstitucionComponent,
    children: [
      { path: "", component: UsuariosComponent },
      { path: "usuarios", component: UsuariosComponent },
      { path: "grupos", component: GruposComponent },
      { path: "solicitudes", component: SolicitudesComponent },
      { path: "grupos/nuevo", component: CrearComponent },
      { path: "grupos/editar", component: EditarComponent },
      { path: "grupos/usuarios/:id", component: UsuariosGrupoComponent },
      { path: "grupos/proyectos/:id", component: ProyectosGrupoComponent },
      { path: "grupos/proyectos/usuarios/:id", component: UsuariosProyectoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
