import { Component, OnInit } from "@angular/core";

@Component({
  selector: "hub-setting",
  templateUrl: "./setting.component.html",
  styleUrls: ["./setting.component.css"]
})
export class SettingComponent implements OnInit {
  selectedIndex: number = 0;

  constructor() {}

  ngOnInit() {}

  next(idUsuario) {
    console.log(idUsuario);
    this.selectedIndex++;
  }
}
