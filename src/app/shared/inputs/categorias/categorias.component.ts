import { Component, OnInit, ElementRef, EventEmitter, ViewChild, Output, Input } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { HttpService } from '../../../services/service.index';

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
  @Input() categorias;
  categoriasResult = []; //variable resultado
  @Output() onCategorias = new EventEmitter<any>();


  filteredOptions: Observable<string[]>;

  separatorKeysCodes = [ENTER, COMMA];
  @ViewChild('categoriaInput') categoriaInput: ElementRef;

  constructor(
    private _httpService: HttpService,

  ) {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  ngOnInit() {
    this._httpService
      .get(`categorias`)
      .subscribe(
        (result: any) => {
          this.categoriasResult = result.datos.length >= 1 ? result.datos : undefined;
          console.log(this.categoriasResult);
        },
        err => {
        }
      );
  }

  filter(val: string) {
    if (val !== null) {
      return this.categoriasResult.filter(option =>
        option.nombre.indexOf(val) === 0);
    }
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;
    if (this.categorias.indexOf(value) !== -1) {
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
    console.log(value);
    if (this.categorias.indexOf(value) == -1) {
      this.categorias.push(value);
    }
    this.categoriaInput.nativeElement.value = "";
    this.myControl.setValue(null);
    this.onCategorias.emit(this.categorias)
  }
}
