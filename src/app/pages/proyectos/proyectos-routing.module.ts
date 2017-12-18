import { ListarComponent } from './listar/listar.component';
import { ProyectoComponent } from "./proyecto/proyecto.component";
import { EditarComponent } from "./crear-editar/editar.component";
import { CrearComponent } from "./crear-editar/crear.component";
import { ProyectosComponent } from "./proyectos.component";

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
const routes: Routes = [
  {
    path: "",
    component: ProyectosComponent,
    children: [
      { path: "", component: ListarComponent},
      { path: "adicionar", component: CrearComponent },
      { path: "editar/:id", component: EditarComponent },
      { path: ":id", component: ProyectoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectosRoutingModule {}
