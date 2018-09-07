import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';


@Component({
  selector: 'hub-input-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  myControl = new FormControl();
  usuarios = []; //variable resultado
  filteredOptions: Observable<string[]>;
  items = ['Paul sanchez', 'Djalmar Gutierres', 'Ronald Coartie', 'Alvaro Apaza'
    , 'Paul sanchez', 'Djalmar Gutierres', 'Ronald Coartie', 'Alvaro Apaza', 'Paul sanchez', 'Djalmar Gutierres', 'Ronald Coartie', 'Alvaro Apaza', 'Paul sanchez', 'Djalmar Gutierres', 'Ronald Coartie', 'Alvaro Apaza' // { nombre: 'correspondencia' },
    // { nombre: 'control de personal' },
    // { nombre: 'inventarios' },
    // { nombre: 'contabilidad' },
  ]
  separatorKeysCodes = [ENTER, COMMA];
  @ViewChild('usuarioInput') usuarioInput: ElementRef;

  constructor() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  ngOnInit() {
  }

  filter(val: string): string[] {
    if (val !== null) {
      return this.items.filter(option =>
        option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;
    if (this.items.indexOf(value) !== -1) {
      if ((value || '').trim()) {
        this.usuarios.push({ nombre: value.trim() });
      }
      if (input) {
        input.value = '';
      }
      this.myControl.setValue('');
    }
  }

  remove(item: any): void {
    console.log(item);
    let index = this.usuarios.indexOf(item);

    if (index >= 0) {
      this.usuarios.splice(index, 1);
    }
  }
  addSelect(event) {
    let option = event.option;
    let value = option.value;
    if ((value || '').trim()) {
      this.usuarios.push({ nombre: value.trim() });
    }
    this.usuarioInput.nativeElement.value = "";
    this.myControl.setValue(null);
    console.log(this.filteredOptions);
  }
}
