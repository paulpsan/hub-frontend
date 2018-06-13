import { Proyecto } from "../../../models/proyecto";
import { ResultFunc } from "rxjs/observable/GenerateObservable";
import { HttpService } from "../../../services/http/http.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Chart } from "chart.js";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Component, OnInit, Inject } from "@angular/core";

@Component({
  selector: "hub-proyecto",
  templateUrl: "./proyecto.component.html",
  styleUrls: ["./proyecto.component.css"]
})
export class ProyectoComponent implements OnInit {
  id: number;
  private sub: any;
  proyecto: Proyecto;
  show: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
    });
    console.log(this.id);
    this.obtenerProyecto();
  }
  obtenerProyecto() {
    this._httpService.buscarId("proyectos", this.id).subscribe(result => {
      this.proyecto = result;
      this.show = true;
      console.log(this.proyecto);
    });
  }
  editarProyecto(proyecto) {
    if (proyecto) {
      this.router.navigate(["/proyectos/editar", proyecto._id]);
    }
  }
  eliminarProyecto(proyecto) {
    console.log(proyecto);
    let dialogRef = this.dialog.open(ModalEliminarProyecto, {
      width: "450px",
      data: proyecto
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this._httpService.eliminarId("proyectos", result._id).subscribe(res => {
          //AQUI colocamos las notificaciones!!
          // setTimeout(()=>
          // {
          // }, 1000);
          // console.log('done');
          this.router.navigate(["/proyectos/"]);
        });
      }
    });
  }
}

@Component({
  selector: "modal-eliminar-proyecto",
  templateUrl: "modal-eliminar-proyecto.html"
})
export class ModalEliminarProyecto {
  constructor(
    public dialogRef: MatDialogRef<ModalEliminarProyecto>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelarClick(): void {
    this.dialogRef.close();
  }
}
