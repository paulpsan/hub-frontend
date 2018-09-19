import { Proyecto } from "../../../models/proyecto";
import { ResultFunc } from "rxjs/observable/GenerateObservable";
import { HttpService } from "../../../services/http/http.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Chart } from "chart.js";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Component, OnInit, Inject } from "@angular/core";
import * as moment from "moment";

@Component({
  selector: "hub-proyecto",
  templateUrl: "./proyecto.component.html",
  styleUrls: ["./proyecto.component.css"]
})
export class ProyectoComponent implements OnInit {
  id: number;
  private sub: any;
  proyecto: Proyecto;
  public esNuevo: boolean = true;
  show: boolean = false;
  lenguajes: boolean = false;
  pieChartData = [];
  pieChartLabels = [];
  dataRepo$;
  dataCalendar$;
  config$;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    moment.locale("es");
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
    });
    console.log(this.id);
    this.obtenerProyecto();
  }
  obtenerProyecto() {
    this._httpService.buscarId("proyectos", this.id).subscribe(async result => {
      this.proyecto = result;
      if (this.proyecto.datos) {
        this.esNuevo = false
        this.show = true;
        this.cargarLenguajes(this.proyecto.datos);
        this.config$ = {
          legend: "Commits",
          xAxisLabel: "Fecha",
          yAxisLabel: "Commits",
          series: "total"
        };
        this.dataRepo$ = await this.renderGraph(this.proyecto.fk_repositorio);
        this.dataCalendar$ = this.dataRepo$.heatMap;
      }
      console.log(this.proyecto);
    });
  }
  //Obtiene los lenguajes del repositorio
  cargarLenguajes(dataLenguaje) {
    let lenguaje = dataLenguaje.lenguajes.datos;
    console.log(typeof (dataLenguaje.lenguajes.datos));

    if (typeof lenguaje == "object") {
      let arrarResp = [];
      let leng = JSON.stringify(lenguaje);
      let array = leng.split(",");
      let lengRepositorios = [];
      for (let val of array) {
        let cadena = val.replace(/[{""}]/g, "").split(":");
        lengRepositorios.push({ lenguaje: cadena[0], codigo: cadena[1] });
      }
      if (Object.keys(lengRepositorios).length !== 0) {
        arrarResp = lengRepositorios;
        for (let value of arrarResp) {
          if (value.lenguaje != "" && value.codigo != undefined) {
            this.pieChartLabels.push(value.lenguaje);
            this.pieChartData.push(parseInt(value.codigo));
          } else {
            this.pieChartLabels.push("0");
            this.pieChartData.push(0);
          }
        }
        this.lenguajes = true;
      }
      console.log(this.pieChartLabels, this.pieChartData);
    } else {
      console.log(lenguaje);
      if (typeof lenguaje == "string") {
        this.pieChartLabels.push(lenguaje);
        this.pieChartData.push(100);
        this.lenguajes = true;
      }
    }
  }

  changeGraph(serie) {
    let objectConfig = {
      legend: "Commits",
      xAxisLabel: "Fecha",
      yAxisLabel: "Commits",
      series: serie
    }
    this.config$ = objectConfig
  }

  getDataGraph(data) {
    return new Promise((resolve, reject) => {
      this._httpService
        .obtener("commits/" + data + '/repositorio/graficos')
        .subscribe(
          resp => {
            resolve(resp);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  async renderGraph(data) {
    let series = await this.getDataGraph(data)
      .then((resp: any) => {
        return resp;
      })
      .catch(err => {
        console.log(err);
      });
    return series;
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
  ) { }

  cancelarClick(): void {
    this.dialogRef.close();
  }
}
