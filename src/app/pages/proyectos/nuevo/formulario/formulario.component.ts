import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hub-formulario-proyecto',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  @Input() entidades;
  @Input() avanzadas;
  @Input() data;
  constructor() { }

  ngOnInit() {
  }

}
