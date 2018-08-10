import { Component, Input, OnInit } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { HttpService } from '../../services/service.index';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
})
export class LineChartComponent implements OnInit {
  @Input() data;
  @Input() config;
  timeline: true;
  datos: any[];
  view: any[] = [700, 400];
  colorScheme = {
    domain: ['#3b1c1f', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private _httpService: HttpService) { }

  ngOnInit() {

    // this._httpService
    //   .obtener('commits/' + repositorio._id + '/repositorio/graficos')
    //   .subscribe(resp => {
    //     const series = [];
    //     let max = 0;
    //     let min = 100;
    //     for (const data of resp.mes) {
    //       series.push({
    //         name: moment(data.date).format('YYYY MMM'),
    //         value: data.total
    //       });
    //       if (max <= data.total) {
    //         max = data.total;
    //       }
    //       if (data.total <= min) {
    //         min = data.total;
    //       }
    //     }
    //     // colocar el config para datos
    //     max = max + max * 0.1;
    //     min = min - min * 0.1;
    //     this.config$ = {
    //       legend: repositorio.nombre,
    //       xAxisLabel: 'Fecha',
    //       yAxisLabel: 'Commits',
    //       yScaleMin: min,
    //       yScaleMax: max
    //     };
    //     this.dataRepo$ = series;
    //   });


    console.log(this.datos, this.config);
    this.datos = [
      {
        name: this.config.legend || 'Commit',
        series: this.data
      }
    ];
  }
}
