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
  width: number = 900;
  height: number = 150;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  animations: boolean = true;
  tooltipDisabled = false;
  innerPadding = "10%";

  colorScheme = {
    domain: ["#eaecef",'#705A5D',"#3b1c1f"]
  };
  constructor(private _httpService: HttpService) {
  }

  ngOnInit() {
    this.view = [this.width, this.height];
  }

  calendarAxisTickFormatting(mondayString: string) {
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
    let date = new Date(c.cell.date)
    let options = {
      weekday: "long", year: "numeric", month: "short",
      day: "numeric"
    };
    // console.log(date.toLocaleDateString());
    return `
      <span class="tooltip-label">${date.toLocaleDateString('es-Es', options)}</span>
      <span class="tooltip-val">${c.data.toLocaleString()} commits</span>
    `;
  }
}
