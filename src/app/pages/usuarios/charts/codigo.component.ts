import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "chart-codigo",
  templateUrl: "./codigo.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodigoComponent {
  @Input() data;
  public lineChartData: Array<any> = [{ data: [100], label: "Commits" }];
  public lineChartLabels: Array<any> = [2008];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      // grey
      backgroundColor: "rgba(148,159,177,0.2)",
      borderColor: "rgba(148,159,177,1)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = "line";

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit() {
    console.log(this.data);
    let data = [{ data: this.data.lineChartData, label: "Commits" }];
    this.lineChartData = data;
    this.lineChartLabels = this.data.lineChartLabels;
  }
}
