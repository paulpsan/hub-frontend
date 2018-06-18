import { ComunModule } from "./../../common/comun.module";
import { HubInterceptor } from "../../common/interceptor/hub.interceptor";
import { MaterialModule } from "../../material/material.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpService } from "../../services/http/http.service";

import { ChartsModule } from "ng2-charts/ng2-charts";

import { CrearEditarComponent } from "./crear-editar/crear-editar.component";
import { EditarComponent } from "./crear-editar/editar.component";
import { UsuariosComponent } from "./usuarios.component";
import { UsuariosRoutingModule } from "./usuarios-routing.module";
import { UsuarioComponent } from "./usuario/usuario.component";
import { UsuarioBbComponent } from "./usuario/usuarioBb.component";
import { ListarComponent } from "./listar/listar.component";
import { CommitsComponent } from "./charts/commits.component";
import { LenguajesComponent } from "./charts/lenguajes.component";
import { CodigoComponent } from "./charts/codigo.component";
import { DataTablesModule } from "angular-datatables";
import { SettingModule } from "./setting/setting.module";
import { SharedModule } from "../../shared/shared.module";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    CrearEditarComponent,
    EditarComponent,
    UsuariosComponent,
    UsuarioComponent,
    UsuarioBbComponent,
    ListarComponent,
    CommitsComponent,
    LenguajesComponent,
    CodigoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComunModule,
    ChartsModule,
    DataTablesModule,
    SettingModule,
    SharedModule,
    PipesModule
  ],
  exports: []
})
export class UsuariosModule {}
