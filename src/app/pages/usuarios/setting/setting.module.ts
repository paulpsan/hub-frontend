import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { DataTablesModule } from "angular-datatables";

import { ComunModule } from "./../../../common/comun.module";
import { MaterialModule } from "../../../material/material.module";

import { SettingComponent } from "./setting.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { RepositorioComponent } from "./repositorio/repositorio.component";
import {
  CuentaComponent,
  ModalEliminarCuenta
} from "./cuenta/cuenta.component";
import {
  EliminarComponent,
  ModalEliminarUsuario
} from "./eliminar/eliminar.component";

@NgModule({
  declarations: [
    ModalEliminarUsuario,
    ModalEliminarCuenta,
    SettingComponent,
    PerfilComponent,
    RepositorioComponent,
    CuentaComponent,
    EliminarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComunModule,
    DataTablesModule
  ],
  exports: [],
  entryComponents: [ModalEliminarUsuario, ModalEliminarCuenta]
})
export class SettingModule {}
