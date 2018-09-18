import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComunModule } from '../../common/comun.module';
import { ChartsModule } from 'ng2-charts';
import { DataTablesModule } from 'angular-datatables';
import { SettingModule } from '../usuarios/setting/setting.module';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../pipes/pipes.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AdminComponent } from './admin.component';
import { GruposComponent } from './grupos/grupos.component';
import { CrearComponent } from './grupos/crear-editar/crear.component';
import { EditarComponent } from './grupos/crear-editar/editar.component';
import { ProyectosGrupoComponent } from './grupos/proyectos-grupo/proyectos-grupo.component';
import { UsuariosGrupoComponent } from './grupos/usuarios-grupo/usuarios-grupo.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ComunModule,
    ChartsModule,
    DataTablesModule,
    SharedModule,
    PipesModule,
  ],
  declarations: [
    AdminComponent,
    UsuariosComponent,
    GruposComponent,
    CrearComponent,
    EditarComponent,
    ProyectosGrupoComponent,
    UsuariosGrupoComponent,
    SolicitudesComponent
  ]
})
export class AdminModule { }
