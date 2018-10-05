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
import { GruposComponent } from './institucion/grupos/grupos.component';
import { CrearComponent } from './institucion/grupos/crear-editar/crear.component';
import { EditarComponent } from './institucion/grupos/crear-editar/editar.component';
import { ProyectosGrupoComponent } from './institucion/grupos/proyectos-grupo/proyectos-grupo.component';
import { UsuariosGrupoComponent } from './institucion/grupos/usuarios-grupo/usuarios-grupo.component';
import { SolicitudesComponent, ModalTextSolicitud } from './solicitudes/solicitudes.component';
import { UsuariosProyectoComponent } from './institucion/grupos/proyectos-grupo/usuarios-proyecto/usuarios-proyecto.component';
import { AdminGruposComponent } from './grupos/admin-grupos.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { TransferirComponent } from './institucion/grupos/transferir/transferir.component';
import { AdminUsuariosGrupoComponent } from './grupos/admin-usuarios-grupo/admin-usuarios-grupo.component';
import { AdminUsuariosProyectoComponent } from './proyectos/admin-usuarios-proyecto/admin-usuarios-proyecto.component';
import { AdminProyectosGrupoComponent } from './grupos/admin-proyectos-grupo/admin-proyectos-grupo.component';
import { CategoriasComponent } from './categorias/categorias.component';

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
    AdminGruposComponent,
    GruposComponent,
    CrearComponent,
    EditarComponent,
    ProyectosGrupoComponent,
    UsuariosGrupoComponent,
    AdminUsuariosGrupoComponent,
    AdminProyectosGrupoComponent,
    SolicitudesComponent,
    ModalTextSolicitud,
    UsuariosProyectoComponent,
    AdminUsuariosProyectoComponent,
    ProyectosComponent,
    TransferirComponent,
    CategoriasComponent,

  ],
  entryComponents: [ModalTextSolicitud]

})
export class AdminModule { }
