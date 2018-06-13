import { NgModule } from "@angular/core";
import { CommonModule, DeprecatedI18NPipesModule } from "@angular/common";
import { PipesModule } from "../pipes/pipes.module";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";

@NgModule({
  imports: [RouterModule, CommonModule, PipesModule],
  declarations: [HeaderComponent, NopagefoundComponent],
  exports: [HeaderComponent, NopagefoundComponent]
})
export class SharedModule {}
