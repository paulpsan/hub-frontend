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

@NgModule({
  imports: [RouterModule, CommonModule, PipesModule, MaterialModule, ChartsModule, PieChartModule, NgxChartsModule],
  declarations: [
    LenguajesComponent,
    CodigoComponent,
    CommitsComponent,
    LineChartComponent,
    PieChartComponent,
    HeaderComponent,
    NopagefoundComponent,
    Oauth2Component,
  ],
  exports: [
    LenguajesComponent,
    CodigoComponent,
    CommitsComponent,
    LineChartComponent,
    PieChartComponent,
    HeaderComponent,
    NopagefoundComponent,
    Oauth2Component
  ]
})
export class SharedModule {}
