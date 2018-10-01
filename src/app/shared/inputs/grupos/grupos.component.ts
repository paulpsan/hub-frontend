import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService, MessageDataService } from '../../../services/service.index';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../../snackbar/snackbar.component';

@Component({
  selector: 'hub-input-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {
  groupForm: FormGroup;
  grupoSearch = [];
  permisosGrupo = [
    { nombre: "privado", value: "private" },
    { nombre: "interno", value: "internal" },
    { nombre: "publico", value: "public" }
  ];
  @Input() usuario;
  @Output() emitGrupo = new EventEmitter<any>();
  constructor(
    private _httpService: HttpService,
    private snackBar: MatSnackBar,
    private _messageDataService: MessageDataService
  ) { }

  ngOnInit() {
    this.groupForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
    });
    //obtener por idUsuario

    this._httpService.obtener("grupos/usuarios/" + this.usuario._id).subscribe(
      result => {
        let grupo = result.find(grupo => {
          return grupo.admin == true;
        })
        console.log(grupo);
        this._httpService.buscarId("grupos", grupo.fk_grupo).subscribe(res => {
          this.grupoSearch = [res];
        })
      },
      err => {
        console.log(err);
      }
    );

  }
  selectItem(event) {
    this.emitGrupo.emit(event.value);
  }
}
