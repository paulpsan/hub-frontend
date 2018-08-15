import { Component, Input, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpService } from '../../services/service.index';

const monthName = new Intl.DateTimeFormat('es-us', { month: 'short' });
const weekdayName = new Intl.DateTimeFormat('es-us', { weekday: 'short' });

@Component({
  selector: "heat-map",
  templateUrl: "./heat-map.component.html"
})
export class HeatMapComponent implements OnInit {
  @Input() dataCalendar;
  view: any[];
  width: number = 1100;
  height: number = 200;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  animations: boolean = true;
  tooltipDisabled = false;
  // dataCalendar: any[];
  innerPadding = "10%";

  colorScheme = {
    domain: ["#eaecef", "#3b1c1f"]
  };

  constructor(private _httpService: HttpService) {
    // this.getCalendarData().then((resp: any[]) => {
    //   this.calendarData = resp;
    //   console.log(this.calendarData);
    // }
    // );
  }

  ngOnInit() {
    this.view = [this.width, this.height];
  }
  // getCalendarData() {
  //   return new Promise((response, reject) => {
  //     this._httpService.get('commits/18/usuarios/graficos').subscribe(resp => {
  //       response(resp.heatMap);
  //     }, err => {
  //       reject(err)
  //     })
  //   });
  // }
  calendarAxisTickFormatting(mondayString: string) {
    // console.log(mondayString);
    const monday = new Date(mondayString);
    const month = monday.getMonth();
    const day = monday.getDate();
    const year = monday.getFullYear();
    const lastSunday = new Date(year, month, day - 1);
    const nextSunday = new Date(year, month, day + 6);
    return lastSunday.getMonth() !== nextSunday.getMonth()
      ? monthName.format(nextSunday)
      : "";
  }

  calendarTooltipText(c): string {
    console.log(c);
    return `
      <span class="tooltip-label">${c.label}</span>
      <span class="tooltip-val">${c.data.toLocaleString()}</span>
    `;
  }
}
