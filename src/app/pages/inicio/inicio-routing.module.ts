// import { AuthGuard } from './../../common/guard/auth.guard';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InicioComponent } from "./inicio.component";

const routes: Routes = [
  {
    path: "",
    component: InicioComponent,
    children: [
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class InicioRoutingModule {}
