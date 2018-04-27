import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "chart-lenguajes",
  templateUrl: "./lenguajes.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LenguajesComponent {
  @Input() pieChartLabels: string[] = [];
  @Input() pieChartData: number[] = [];
  pieChartType: string = "pie";

  ngOnInit() {}
  ngOnChanges() {}
}
