import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from './../../services/login.service';

@Component({
  selector: "hub-inicio",
  templateUrl: "./inicio.component.html",
  styleUrls: ["./inicio.component.css"]
})
export class InicioComponent implements OnInit {
  private url: string;

  private GITHUB_CLIENT_ID: string = 'becb33a39e525721517c';
  private GITHUB_CLIENT_SECRET: string= '36338cdf7057d2086495a241fa3d053766da55c1'


  constructor(private route: ActivatedRoute, private router: Router, private _loginServise: LoginService) {}

  ngOnInit() {

    // this.sub = this.route.params.subscribe(params => {
    //   console.log(params);
    // });

    this.url = this.router.url;
    const code = this.url.split("=")[1];
    if (code) {
      console.log("params");
      this._loginServise.getTokenGithub(code).subscribe(resp=>{
        console.log(resp);
      });
    }

  }
}
