import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "hub-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  options;
  constructor(private toastr: ToastrService) {
    this.options = this.toastr.toastrConfig;
  }
  ngOnInit() {}
  showSuccess() {
    console.log(this.options);
    this.toastr.show("paul", "title", this.options);
  }
}
