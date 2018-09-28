import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { GruposComponent } from './institucion/grupos/grupos.component';
import { CrearComponent } from './institucion/grupos/crear-editar/crear.component';
import { EditarComponent } from './institucion/grupos/crear-editar/editar.component';
import { UsuariosGrupoComponent } from './institucion/grupos/usuarios-grupo/usuarios-grupo.component';
import { ProyectosGrupoComponent } from './institucion/grupos/proyectos-grupo/proyectos-grupo.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { UsuariosProyectoComponent } from './institucion/grupos/proyectos-grupo/usuarios-proyecto/usuarios-proyecto.component';
import { AdminGruposComponent } from './grupos/admin-grupos.component';
import { TransferirComponent } from './institucion/grupos/transferir/transferir.component';

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      { path: "usuarios", component: UsuariosComponent },
      { path: "proyectos", component: ProyectosComponent },
      { path: "solicitudes", component: SolicitudesComponent },
      { path: "grupos", component: AdminGruposComponent },
      { path: "institucion/grupos", component: GruposComponent },
      { path: "institucion/grupos/nuevo", component: CrearComponent },
      { path: "institucion/grupos/editar", component: EditarComponent },
      {
        path: "institucion/grupos/transferir/:id",
        component: TransferirComponent
      },
      {
        path: "institucion/grupos/usuarios/:id",
        component: UsuariosGrupoComponent
      },
      {
        path: "institucion/grupos/proyectos/:id",
        component: ProyectosGrupoComponent
      },
      {
        path: "institucion/grupos/proyectos/usuarios/:id",
        component: UsuariosProyectoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
