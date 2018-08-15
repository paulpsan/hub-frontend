import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpService } from '../../services/service.index';

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
})
export class LineChartComponent implements OnChanges {
  @Input() data;
  @Input() config;
  timeline: true;
  datos: any[];
  view: any[] = [700, 400];
  private currentConfig;
  colorScheme = {
    domain: ['#3b1c1f', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private _httpService: HttpService) { }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes);
    if (changes.config.currentValue) {
      this.currentConfig = changes.config.currentValue;
      this.datos = [
        {
          name: this.config.legend || 'Commit',
          series: this.data[this.currentConfig.series]
        }
      ];

      console.log(this.currentConfig);
    }
  }
}
