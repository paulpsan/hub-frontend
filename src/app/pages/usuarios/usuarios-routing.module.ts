import { CrearEditarComponent } from "./crear-editar/crear-editar.component";
import { EditarComponent } from "./crear-editar/editar.component";
import { UsuariosComponent } from "./usuarios.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsuarioComponent } from "./usuario/usuario.component";
import { ListarComponent } from "./listar/listar.component";
import { UsuarioBbComponent } from "./usuario/usuarioBb.component";

const routes: Routes = [
  {
    path: "",
    component: UsuariosComponent,
    children: [
      { path: "", component: ListarComponent },
      { path: "adicionar", component: CrearEditarComponent },
      { path: "editar/:id", component: EditarComponent },
      { path: ":id", component: UsuarioComponent },
      { path: "bitbucket/:id", component: UsuarioBbComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule {}
