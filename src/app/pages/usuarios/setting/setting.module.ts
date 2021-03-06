import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { DataTablesModule } from "angular-datatables";

import { ComunModule } from "../../../common/comun.module";
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
import { SharedModule } from "../../../shared/shared.module";
import { PipesModule } from "../../../pipes/pipes.module";
import { SolicitudesComponent } from "./solicitudes/solicitudes.component";

@NgModule({
  declarations: [
    ModalEliminarUsuario,
    ModalEliminarCuenta,
    SettingComponent,
    PerfilComponent,
    RepositorioComponent,
    CuentaComponent,
    EliminarComponent,
    SolicitudesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComunModule,
    DataTablesModule,
    SharedModule,
    PipesModule
  ],
  exports: [],
  entryComponents: [ModalEliminarUsuario, ModalEliminarCuenta]
})
export class SettingModule {}
