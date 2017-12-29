import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "chart-lenguajes",
  templateUrl: "./lenguajes.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LenguajesComponent {
  @Input() data;
  // Pie

  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType: string = "pie";

  // events
  public chartClicked(e: any): void {
    console.log(this.data);
  }

  public chartHovered(e: any): void {
    console.log(this.data);
  }

  ngOnInit() {}
  ngOnChanges() {
    console.log(this.data);
    delete this.pieChartLabels;
    delete this.pieChartData;
    this.pieChartLabels = [];
    this.pieChartData = [];
    let arrarResp = [];
    console.log(this.data);
    console.log(this.data);
    let leng = JSON.stringify(this.data);
    let array = leng.split(",");
    let lengProyectos = [];
    for (let val of array) {
      let cadena = val.replace(/[{""}]/g, "").split(":");
      lengProyectos.push({
        lenguaje: cadena[0],
        codigo: cadena[1]
      });
    }
    if (Object.keys(lengProyectos).length !== 0) {
      console.log(lengProyectos);
      arrarResp = lengProyectos;
      for (let value of arrarResp) {
        if (value.lenguaje != ""&&value.codigo!=undefined) {
          this.pieChartLabels.push(value.lenguaje);
          this.pieChartData.push(parseInt(value.codigo));
        }else {
          this.pieChartLabels.push("0");
          this.pieChartData.push(0);
        }

      }
    }

    console.log(this.pieChartLabels, this.pieChartData);
  }
}
