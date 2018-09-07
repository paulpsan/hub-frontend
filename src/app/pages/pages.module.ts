import { NgModule } from "@angular/core";
import { PagesRoutingModule } from "./pages-routing.module";
import { RepositoriosComponent } from './repositorios/repositorios.component';
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";
import { DataTablesModule } from "angular-datatables";
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";
import { LoadingBarModule } from "@ngx-loading-bar/core";
import { SettingModule } from "./usuarios/setting/setting.module";
import { SharedModule } from "../shared/shared.module";
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
  declarations: [
  RepositoriosComponent],
  imports: [
    PagesRoutingModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    DataTablesModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    SettingModule,
    SharedModule,
    PipesModule,
  ],
  exports: []
})
export class PagesModule { }
