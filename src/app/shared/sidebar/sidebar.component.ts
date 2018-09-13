import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hub-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  step = 0;
  constructor() { }

  ngOnInit() {
  }

}
