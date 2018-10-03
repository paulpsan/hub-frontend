import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ResetComponent } from './reset/reset.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { VerificacionComponent } from './verificacion/verificacion.component';
import { AutenticacionComponent } from './autenticacion.component';

const routes: Routes = [
  { path: "", component: AutenticacionComponent },
  { path: "login", component: LoginComponent },
  { path: "registro", component: RegistroComponent },
  { path: "reset", component: ResetComponent },
  { path: "recuperar", component: RecuperarComponent },
  { path: "verificacion", component: VerificacionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutenticacionRoutingModule { }
