import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PagesRoutingModule } from "./pages-routing.module";
import { MaterialModule } from "../material/material.module";
import { ChartsModule } from "ng2-charts";
import { DataTablesModule } from "angular-datatables";

import { AdminComponent } from './admin/admin.component';
import { RepositoriosComponent } from './repositorios/repositorios.component';
import { SettingModule } from "./usuarios/setting/setting.module";
import { SharedModule } from "../shared/shared.module";
import { PipesModule } from "../pipes/pipes.module";
import { ProyectosComponent } from './repositorios/proyectos/proyectos.component';
import { EditarComponent } from './repositorios/proyectos/editar/editar.component';

@NgModule({
  declarations: [
  RepositoriosComponent,
  ProyectosComponent,
  EditarComponent,
],
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ChartsModule,
    DataTablesModule,
    SettingModule,
    SharedModule,
    PipesModule,
  ],
  exports: []
})
export class PagesModule { }
