import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { HttpService } from '../../../services/http/http.service';
import { environment } from '../../../../environments/environment';


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
  separatorKeysCodes = [ENTER, COMMA];
  @Input() usuario;
  @Output() onUsuarios = new EventEmitter<any>();
  @ViewChild('usuarioInput') usuarioInput: ElementRef;

  constructor(private _httpService: HttpService) {
    console.log(this.usuario);
  }

  ngOnInit() {
    this.usuarios.push({
      _id: this.usuario._id,
      nombre: this.usuario.nombre,
      usuarioGitlab: this.usuario.usuarioGitlab,
      url: `${environment.gitlabAdmin.domain}/${this.usuario.login}`
    })
    this.onUsuarios.emit(this.usuarios)

    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(val => this.filter(val))
    //   );

    this.myControl.valueChanges.subscribe(resp => {
      let pagData = {
        ordenar: "nombre",
        pagina: 1,
        limite: 10,
        buscar: resp
      };
      this._httpService.obtenerPaginado("usuarios", pagData).subscribe(
        (result: any) => {
          this.filteredOptions = result.datos
        },
        err => {
          console.log(err);
        }
      );
    })

  }

  add(event): void {
    let input = event.input;
    let value = event.value;
    if (this.usuarios.indexOf(value.nombre) !== -1) {
      if ((value.nombre || '').trim() && !this.usuarios.find(usuario => {
        return usuario.nombre === value.nombre
      })) {
        this.usuarios.push({
          nombre: value.nombre,
          _id: value._id,
          usuarioGitlab: value.usuarioGitlab,
          url: `${environment.gitlabAdmin.domain}/${value.login}`
        });
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
    if ((value.nombre || '').trim() && !this.usuarios.find(usuario => {
      return usuario.nombre === value.nombre
    })) {
      this.usuarios.push({
        nombre: value.nombre,
        _id: value._id,
        usuarioGitlab: value.usuarioGitlab,
        url: `${environment.gitlabAdmin.domain}/${value.login}`
      });
    }
    this.usuarioInput.nativeElement.value = "";
    this.myControl.setValue(null);
    this.onUsuarios.emit(this.usuarios)
    console.log(this.filteredOptions);
  }


}
