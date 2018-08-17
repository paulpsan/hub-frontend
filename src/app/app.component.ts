import { Component, OnInit, Renderer2 } from "@angular/core";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "hub-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  options;
  constructor(private toastr: ToastrService, private renderer: Renderer2) {
    this.options = this.toastr.toastrConfig;
  }
  ngOnInit() {
  }
  showSuccess() {
    this.options.positionClass = "toast-top-right";
    console.log(this.options);
    this.toastr.error("paul", "title");    
  }
  setClass(enableBootstrap: boolean) {
    const add = enableBootstrap ? "bootstrap" : "normal";
    const remove = enableBootstrap ? "normal" : "bootstrap";
    this.renderer.addClass(document.body, add);
    this.renderer.removeClass(document.body, remove);
  }
}
