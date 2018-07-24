import { NgModule } from "@angular/core";
import { ImagenPipe } from "./imagen.pipe";
import { FechaPipe } from "./fecha.pipe";

@NgModule({
  imports: [],
  declarations: [ImagenPipe, FechaPipe],
  exports: [ImagenPipe, FechaPipe]
})
export class PipesModule {}
