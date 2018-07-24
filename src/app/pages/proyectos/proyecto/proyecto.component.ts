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
  show: boolean = false;
  lenguajes = [];
  pieChartData;
  pieChartLabels;
  data$;
  configProy$;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    moment.locale("es");
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
    });
    console.log(this.id);
    this.obtenerProyecto();
  }
  obtenerProyecto() {
    this._httpService.buscarId("proyectos", this.id).subscribe(result => {
      this.proyecto = result;
      // this.proyecto.fechaCreacion=moment(result.fechaCreacion).format("YYYY MMM");
      // this.proyecto.ultimaActividad=moment(result.ultimaActividad).format("YYYY MMM");;

      this.show = true;
      this.getCommitRepo(this.proyecto.fk_repositorio);
      this.cargarLenguajes(this.proyecto.datos);
      console.log(this.proyecto);
    });
  }
  //Obtiene los lenguajes del repositorio
  cargarLenguajes(dataLenguaje) {
    let lenguaje = dataLenguaje.lenguajes.datos;
    if (dataLenguaje) {
      this.pieChartLabels = [];
      this.pieChartData = [];
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
      }
      console.log(this.pieChartLabels, this.pieChartData);
    }
  }

  getCommitRepo(id) {
    console.log(id);
    this._httpService
      .obtener("commits/" + id + "/repositorio/graficos")
      .subscribe(respuesta => {
        var series = [];
        let max = 0;
        let min = 100;
        for (const data of respuesta.mes) {
          series.push({
            name: moment(data.date).format("YYYY MMM"),
            value: data.total
          });
          if (max <= data.total) {
            max = data.total;
          }
          if (data.total <= min) {
            min = data.total;
          }
        }
        max = max + max * 0.1;
        min = min - min * 0.1;

        console.log(max, min);
        console.log(series);
        this.configProy$ = {
          legend: "Commit Total",
          xAxisLabel: "Fecha",
          yAxisLabel: "Commits",
          yScaleMin: min,
          yScaleMax: max
        };

        this.data$ = series;
        // let arraySum = respuesta.barChartData[0].data;
        // for (let i = 1; i < respuesta.barChartData.length; i++) {
        //   for (
        //     let index = 0;
        //     index < respuesta.barChartData[i].data.length;
        //     index++
        //   ) {
        //     arraySum[index] =
        //       arraySum[index] + respuesta.barChartData[i].data[index];
        //   }
        // }
        // console.log(arraySum);
        // this.data$ = {
        //   lineChartData: respuesta.barChartData[0].data,
        //   lineChartLabels: respuesta.años
        // };
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
