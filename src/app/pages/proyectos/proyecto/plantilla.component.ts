import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../../services/http/http.service";
import { Proyecto } from "../../../models/proyecto";
import {
  UsuarioService,
  SubirArchivoService,
  MessageDataService
} from "../../../services/service.index";
import { MatSelectChange, MatSnackBar } from "@angular/material";
import * as _ from "lodash";
import { environment } from "../../../../environments/environment";
import { SnackbarComponent } from "../../../shared/snackbar/snackbar.component";

@Component({
  selector: "hub-nuevo-plantilla",
  templateUrl: "./plantilla.component.html",
  styleUrls: ["./plantilla.component.css"]
})
export class PlantillaComponent implements OnInit {
  usuario

  @Input() proyecto;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private _usuarioService: UsuarioService,
    private _subirArchivoService: SubirArchivoService,
    private snackBar: MatSnackBar,
    private _messageDataService: MessageDataService
  ) { }

  ngOnInit() {
    this._usuarioService.usuario$.subscribe(repUsuario => {
      this.usuario = repUsuario;
    });

  }

}
