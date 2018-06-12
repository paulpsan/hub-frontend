import { NgModule } from "@angular/core";
import { PagesRoutingModule } from "./pages-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
  ],
  imports: [
    SharedModule,
    PagesRoutingModule
  ],
  exports: []
})
export class PagesModule {}
