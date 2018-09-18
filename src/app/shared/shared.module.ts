import { NgModule } from '@angular/core';
import { CommonModule, DeprecatedI18NPipesModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { Oauth2Component } from './oauth2/oauth2.component';
import { MaterialModule } from '../material/material.module';
import { LenguajesComponent } from './charts/lenguajes.component';
import { CodigoComponent } from './charts/codigo.component';
import { CommitsComponent } from './charts/commits.component';
import { LineChartComponent } from './charts/line-chart.component';
import { NgxChartsModule, PieChartModule } from '@swimlane/ngx-charts';
import { PieChartComponent } from './charts/pie-chart.component';
import { HeatMapComponent } from './charts/heat-map.component';
import { DialogErrorComponent } from './dialog/dialog-error.component';
import { DialogLoadingComponent } from './dialog/dialog-loading.component';
import { LoadingComponent } from './loading/loading.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { CategoriasComponent } from './inputs/categorias/categorias.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UsuariosComponent } from './inputs/usuarios/usuarios.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ButtonLoadingComponent } from './button-loading/button-loading.component';
import { UsuarioComponent } from './inputs/usuario/usuario.component';
import { GruposComponent } from './inputs/grupos/grupos.component';

@NgModule({
  imports: [RouterModule, CommonModule, PipesModule, MaterialModule, ChartsModule, PieChartModule, NgxChartsModule, FormsModule, ReactiveFormsModule],
  declarations: [
    LenguajesComponent,
    CodigoComponent,
    CommitsComponent,
    LineChartComponent,
    HeatMapComponent,
    PieChartComponent,
    HeaderComponent,
    NopagefoundComponent,
    Oauth2Component,
    DialogErrorComponent,
    DialogLoadingComponent,
    LoadingComponent,
    SnackbarComponent,
    CategoriasComponent,
    UsuariosComponent,
    SidebarComponent,
    ButtonLoadingComponent,
    UsuarioComponent,
    GruposComponent
  ],
  exports: [
    LenguajesComponent,
    CodigoComponent,
    CommitsComponent,
    LineChartComponent,
    HeatMapComponent,
    PieChartComponent,
    HeaderComponent,
    NopagefoundComponent,
    Oauth2Component,
    DialogErrorComponent,
    DialogLoadingComponent,
    LoadingComponent,
    SnackbarComponent,
    CategoriasComponent,
    UsuariosComponent,
    SidebarComponent,
    ButtonLoadingComponent,
    UsuarioComponent,
    GruposComponent,

  ],
  entryComponents: [DialogErrorComponent, DialogLoadingComponent, SnackbarComponent]
})
export class SharedModule { }
