import { NgModule } from "@angular/core";
import { CommonModule, DeprecatedI18NPipesModule } from "@angular/common";
import { PipesModule } from "../pipes/pipes.module";
import { RouterModule } from "@angular/router";
import { ChartsModule } from "ng2-charts";
import { HeaderComponent } from "./header/header.component";
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";
import { Oauth2Component } from "./oauth2/oauth2.component";
import { MaterialModule } from "../material/material.module";
import { LenguajesComponent } from "./charts/lenguajes.component";
import { CodigoComponent } from "./charts/codigo.component";
import { CommitsComponent } from "./charts/commits.component";

@NgModule({
  imports: [RouterModule, CommonModule, PipesModule, MaterialModule,ChartsModule],
  declarations: [
    LenguajesComponent,
    CodigoComponent,
    CommitsComponent,
    HeaderComponent,
    NopagefoundComponent,
    Oauth2Component
  ],
  exports: [
    LenguajesComponent,
    CodigoComponent,
    CommitsComponent,
    HeaderComponent,
    NopagefoundComponent,
    Oauth2Component
  ]
})
export class SharedModule {}
