import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hub-button-loading',
  templateUrl: './button-loading.component.html',
  styleUrls: ['./button-loading.component.css']
})
export class ButtonLoadingComponent implements OnInit {
  @Input() request;
  constructor() { }

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(this.request=='ok'){
      setTimeout(() => {
        this.request='';
      }, 5000);
    }
    if(this.request=='error'){
      setTimeout(() => {
        this.request='';
      }, 7000);
    }
  }
}
