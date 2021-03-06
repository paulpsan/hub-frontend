import { Component, OnInit, Input } from "@angular/core";
import { GLOBAL } from "../../services/global";
import { environment } from "../../../environments/environment";

@Component({
  selector: "hub-oauth2",
  templateUrl: "./oauth2.component.html",
  styleUrls: ["./oauth2.component.css"]
})
export class Oauth2Component implements OnInit {
  @Input() config;
  constructor() {}
  github;
  gitlab;
  bitbucket;

  ngOnInit() {
    localStorage.setItem("action", this.config.action);
  }
  loginGH() {
    localStorage.setItem("type", "github");
    GLOBAL.TOGGLE = true;
    window.location.href =
      environment.github.domain +
      environment.github.clientId +
      "&state=" +
      environment.github.state;
  }
  //login gitlab
  loginGL(tipo) {
    localStorage.setItem("type", "gitlab");

    GLOBAL.TOGGLE = true;
    window.location.href =
      environment[tipo].domain +
      environment[tipo].clientId +
      "&redirect_uri=" +
      environment[tipo].callbackURL +
      "&response_type=code" +
      "&state=" +
      environment[tipo].state;
  }
  loginBB() {
    localStorage.setItem("type", "bitbucket");

    GLOBAL.TOGGLE = true;
    window.location.href =
      environment.bitbucket.domain +
      environment.bitbucket.clientId +
      "&redirect_uri=" +
      environment.bitbucket.callbackURL +
      "&response_type=code" +
      "&state=" +
      environment.bitbucket.state;
  }
}
