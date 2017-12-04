import { ProyectoComponent } from './proyecto/proyecto.component';
import { EditarComponent } from './proyecto/crear-editar/editar.component'
import { CrearComponent } from './proyecto/crear-editar/crear.component';
import { ProyectosComponent } from './proyectos.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {path: 'proyectos', component: ProyectosComponent},
  {path: 'proyectos/adicionar', component: CrearComponent},
  {path: 'proyectos/editar/:id', component: EditarComponent},
  {path: 'proyectos/:id', component: ProyectoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: true }
  )],
  exports: [RouterModule]
})
export class ProyectosRoutingModule { }