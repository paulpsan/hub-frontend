import { GLOBAL } from "./../../services/global";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "./../../services/login.service";

@Component({
  selector: "hub-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.css"]
})
export class InicioComponent implements OnInit {
  private url: string;
  private code: string;
  private sub;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _loginServise: LoginService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
    });

    this.url = this.router.url;
    console.log(this.url);
    // if (this.url != "/inicio") {
    //   this.code = this.url.split("=")[1];
    //   this.code = this.code.split("&")[0];
    //   console.log(GLOBAL.GITHUB_TOKEN);
    //   if (this.code != "" && GLOBAL.TOGGLE) {
    //     console.log(this.code);
    //     this._loginServise.getTokenGithub(this.code).subscribe(resp => {
    //       if (resp.error) {
    //         this.router.navigate(["/inicio"]);
    //       } else {
    //         this.router.navigate(["/inicio/bienvenido", resp.token]);
    //         resp.token;
    //       }
    //     });
    //     GLOBAL.TOGGLE = false;
    //   }
    // }
  }
}
