import { NgModule } from "@angular/core";
import { PagesRoutingModule } from "./pages-routing.module";
import { SharedModule } from "../shared/shared.module";
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
  declarations: [
  ],
  imports: [
    SharedModule,
    PagesRoutingModule,
    PipesModule
  ],
  exports: []
})
export class PagesModule {}
