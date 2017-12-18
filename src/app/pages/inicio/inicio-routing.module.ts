// import { AuthGuard } from './../../common/guard/auth.guard';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InicioComponent } from "./inicio.component";
// import { ProyectosComponent } from "../proyectos/proyectos.component";
// import { OrganizacionesComponent } from "../organizaciones/organizaciones.component";
// import { LoginComponent } from "../login/login.component";
// import { RegistroComponent } from "../login/registro/registro.component";
// import { UsuariosRoutingModule } from "../usuarios/usuarios-routing.module";
// import { ProyectosRoutingModule } from "../proyectos/proyectos-routing.module";
// import { UsuariosComponent } from "../usuarios/usuarios.component";

const routes: Routes = [
  {
    path: "",
    component: InicioComponent,
    children: [
      // {
      //   path: "proyectos",
      //   component: ProyectosComponent,
      //   canActivate:[AuthGuard]
      //   // loadChildren: '../proyectos/proyectos.module#ProyectosModule'
      // },
      // {
      //   path: "usuarios",
      //   // loadChildren: '../proyectos/proyectos.module#ProyectosModule',
      //   component: UsuariosComponent,
      //   canActivate:[AuthGuard]

      // },
      // {
      //   path: "login",
      //   component: LoginComponent
      // },
      // {
      //   path: "registro",
      //   component: RegistroComponent
      // },
      // {
      //   path: 'organizaciones',
      //   component: OrganizacionesComponent
      // }
    ]
  },
  // {
  //   path: "**",
  //   component: InicioComponent
  //   // loadChildren: '../proyectos/proyectos.module#ProyectosModule'
  // },
  // {
  //   path: "*",
  //   component: InicioComponent
  //   // loadChildren: '../proyectos/proyectos.module#ProyectosModule'
  // },
  // {
  //   path: "login",
  //   component: LoginComponent
  // },
  // {
  //   path: "registro",
  //   component: RegistroComponent
  // }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    // HeaderRoutingModule,
    // UsuariosRoutingModule,
    // ProyectosRoutingModule
  ],
  exports: [RouterModule]
})
export class InicioRoutingModule {}
