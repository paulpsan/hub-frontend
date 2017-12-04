import { CrearEditarComponent } from './usuario/crear-editar/crear-editar.component';
import { EditarComponent } from './usuario/crear-editar/editar.component';
import { UsuariosComponent } from './usuarios.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';


const routes: Routes = [
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'usuarios/adicionar', component: CrearEditarComponent},
  {path: 'usuarios/editar/:id', component: EditarComponent},
  {path: 'usuarios/:id', component: UsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }