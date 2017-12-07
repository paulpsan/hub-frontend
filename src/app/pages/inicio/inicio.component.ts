import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'hub-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  private sub:any;
  constructor(private route: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
    // this.sub = this.route.params.subscribe(params => {
    //   console.log(params);
    // });
    console.log(this.router.url);
  }

}
