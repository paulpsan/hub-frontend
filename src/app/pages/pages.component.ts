import { Component, OnInit } from "@angular/core";

@Component({
  selector: "hub-pages",
  templateUrl: "./pages.component.html",
  styleUrls: ["./pages.component.css"]
})
export class PagesComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log("soy pages");
  }
}