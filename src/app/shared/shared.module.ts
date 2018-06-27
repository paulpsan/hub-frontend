import { NgModule } from "@angular/core";
import { CommonModule, DeprecatedI18NPipesModule } from "@angular/common";
import { PipesModule } from "../pipes/pipes.module";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";
import { Oauth2Component } from "./oauth2/oauth2.component";
import { MaterialModule } from "../material/material.module";

@NgModule({
  imports: [RouterModule, CommonModule, PipesModule, MaterialModule],
  declarations: [HeaderComponent, NopagefoundComponent, Oauth2Component],
  exports: [HeaderComponent, NopagefoundComponent, Oauth2Component]
})
export class SharedModule {}
