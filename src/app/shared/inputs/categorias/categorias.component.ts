import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'hub-input-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  toogleControl: boolean = true
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  myControl = new FormControl();
  categorias = []; //variable resultado

  filteredOptions: Observable<string[]>;
  items = ['correspondencia', 'control de personal', 'inventarios', 'contabilidad'
    // { nombre: 'correspondencia' },
    // { nombre: 'control de personal' },
    // { nombre: 'inventarios' },
    // { nombre: 'contabilidad' },
  ]
  separatorKeysCodes = [ENTER, COMMA];

  constructor() { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  filter(val: string): string[] {
    if (val !== null) {
      return this.items.filter(option =>
        option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }
  }

  add(event: MatChipInputEvent): void {
    console.log(this, this.toogleControl);
    if (this.toogleControl) {
      let input = event.input;
      let value = event.value;
      if (this.items.indexOf(value) !== -1) {
        if ((value || '').trim()) {
          this.categorias.push({ nombre: value.trim() });
        }
        this.toogleControl = !this.toogleControl;
        // Reset the input value
        this.myControl.reset();
        this.myControl.setValue('');
      }
    } else {
      this.toogleControl = !this.toogleControl;
    }
  }

  remove(item: any): void {
    console.log(item);
    let index = this.categorias.indexOf(item);

    if (index >= 0) {
      this.categorias.splice(index, 1);
    }
  }
  addSelect(event) {
    if (this.toogleControl) {
      console.log(event);
      let option = event.option;
      let value = option.value;
      if ((value || '').trim()) {
        this.categorias.push({ nombre: value.trim() });
      }
      this.myControl.reset();
      this.myControl.setValue('');
      console.log(this.toogleControl, this.myControl.value);
    }
    this.toogleControl = !this.toogleControl;
  }
}
