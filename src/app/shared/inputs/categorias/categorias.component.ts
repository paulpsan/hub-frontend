import { Component, OnInit, ElementRef, EventEmitter,ViewChild, Output } from '@angular/core';
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
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  myControl = new FormControl();
  categorias = []; //variable resultado
  @Output() onCategorias = new EventEmitter <any> ();


  filteredOptions: Observable<string[]>;
  items = ['correspondencia', 'control de personal', 'inventarios', 'contabilidad'
    // { nombre: 'correspondencia' },
    // { nombre: 'control de personal' },
    // { nombre: 'inventarios' },
    // { nombre: 'contabilidad' },
  ]
  separatorKeysCodes = [ENTER, COMMA];
  @ViewChild('categoriaInput') categoriaInput: ElementRef;

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
        this.categorias.push({ nombre: value.trim() });
        this.onCategorias.emit(this.categorias)
      }
      if (input) {
        input.value = '';
      }
      this.myControl.setValue('');
    }
  }

  remove(item: any): void {
    console.log(item);
    let index = this.categorias.indexOf(item);

    if (index >= 0) {
      this.categorias.splice(index, 1);
    }
    this.onCategorias.emit(this.categorias)
  }
  addSelect(event) {
    let option = event.option;
    let value = option.value;
    if ((value || '').trim()) {
      this.categorias.push({ nombre: value.trim() });
    }
    this.categoriaInput.nativeElement.value = "";
    this.myControl.setValue(null);
    console.log(this.filteredOptions);
    this.onCategorias.emit(this.categorias)
  }
}
