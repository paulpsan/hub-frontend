import { Component, Input } from "@angular/core";

@Component({
  selector: "line-chart",
  templateUrl: "./line-chart.component.html",
})
export class LineChartComponent {
  @Input() data;
  @Input() config;
  datos: any[];
  view: any[] = [600, 400];
  colorScheme = {
    domain: ["#3b1c1f", "#A10A28", "#C7B42C", "#AAAAAA"]
  };

  constructor() {}

  ngOnInit() {
    console.log(this.datos, this.config);
    this.datos = [
      {
        name: this.config.legend ||"Commit",
        series: this.data
      }
    ];
  }
}
