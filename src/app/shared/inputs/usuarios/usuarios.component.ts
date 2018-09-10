import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { HttpService } from '../../../services/http/http.service';


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
  items = ['Paul sanchez', 'Djalmar Gutierrez', 'Ronald Coarte', 'Alvaro Apaza'
    // { nombre: 'control de personal' },
    // { nombre: 'inventarios' },
    // { nombre: 'contabilidad' },
  ]
  separatorKeysCodes = [ENTER, COMMA];
  @Output() onUsuarios = new EventEmitter<any>();
  @ViewChild('usuarioInput') usuarioInput: ElementRef;

  constructor(private _httpService: HttpService) {
  }

  ngOnInit() {

    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(val => this.filter(val))
    //   );
    this.myControl.valueChanges.subscribe(resp => {
      console.log(resp);
      let pagData = {
        ordenar: "nombre",
        pagina: 1,
        limite: 10,
        buscar:resp
      };
      this._httpService.obtenerPaginado("usuarios", pagData).subscribe(
        (result:any) => {
          console.log(result);  
          this.filteredOptions=result.datos       
        },
        err => {
          console.log(err);
        }
      );
    })

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
        this.onUsuarios.emit(this.usuarios)
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
    this.onUsuarios.emit(this.usuarios);
  }
  addSelect(event) {
    let option = event.option;
    let value = option.value;
    if ((value || '').trim()) {
      this.usuarios.push({ nombre: value.trim() });
    }
    this.usuarioInput.nativeElement.value = "";
    this.myControl.setValue(null);
    this.onUsuarios.emit(this.usuarios)
    console.log(this.filteredOptions);
  }
}
