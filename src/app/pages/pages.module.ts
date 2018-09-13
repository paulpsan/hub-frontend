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

@NgModule({
  declarations: [
  RepositoriosComponent],
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
