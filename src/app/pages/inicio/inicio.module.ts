import { HubInterceptor } from "../../common/interceptor/hub.interceptor";
import { MaterialModule } from "../../material/material.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpService } from "../../services/http/http.service";
import { InicioComponent } from "./inicio.component";
import { InicioRoutingModule } from "./inicio-routing.module";
import { ComunModule } from "../../common/comun.module";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    InicioComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InicioRoutingModule,
    SharedModule,
    ComunModule

  ],
  exports: [
    // HeaderComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HubInterceptor,
      multi: true
    },
    HttpService
  ],
})
export class InicioModule {}
