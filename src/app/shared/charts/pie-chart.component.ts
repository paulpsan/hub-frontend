import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../services/http/http.service";
import { MatDialog } from "@angular/material";

@Component({
  selector: "pie-chart",
  templateUrl: "./pie-chart.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartComponent {
  @Input() data;
  @Input() configRepo;
  chartType;
  datos: any[];
  view: any[] = [600, 400];
  colorScheme = {
    domain: ["#3b1c1f", "#A10A28", "#C7B42C", "#AAAAAA"]
  };

  constructor() { }

  ngOnInit() {
    console.log(this.datos, this.configRepo);
    this.datos = [
      {
        name: "Commits",
        series: this.data
      }
    ];
  }
}
