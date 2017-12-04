import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hub-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
    resolved(captchaResponse: string) {
      console.log(`Resolved captcha with response ${captchaResponse}:`);
  }
  constructor() { }

  ngOnInit() {
  }

}
