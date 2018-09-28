import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService, UsuarioService, MessageDataService } from '../../../../../services/service.index';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'hub-transferir',
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.css']
})
export class TransferirComponent implements OnInit {
  id: any;
  userForm: FormGroup;
  grupo;
  usuario;
  usuarioTransferir;
  usuarios;
  usuariosSearch;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private _usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private _messageDataService: MessageDataService
  ) {


  }
  ngOnInit() {
    this._usuarioService.usuario$.subscribe(respUsuario => {
      this.usuario = respUsuario;
    });
    this.userForm = new FormGroup({
      nombre: new FormControl('', Validators.required)
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this._httpService.obtener(`grupos/${this.id}/usuarios`).subscribe(
      (result: any) => {
        this.usuarios = result.Usuarios;
      },
      err => {
        console.log(err);
      }
    );
    this.userForm.controls["nombre"].valueChanges.subscribe(resp => {
      this.usuariosSearch = this.usuarios.filter(user => {
        return user.nombre.indexOf(resp) >= 0
      })
    })

  }
  selectUser() {
    this.usuarioTransferir = this.usuariosSearch.find(user => {
      return user.nombre == this.userForm.controls["nombre"].value;
    });
    console.log(this.usuarioTransferir);
  }
  transferir() {
    if (this.usuarioTransferir && confirm("Desea transferir El grupo al usuario: " + this.usuarioTransferir.nombre)) {
      this.usuario.admin_grupo = false;
      this._httpService.patch(`usuarios/`, this.usuario._id, this.usuario).subscribe(resp => {
        this.usuarioTransferir.admin_grupo = true;
        this._httpService.patch(`usuarios/`, this.usuarioTransferir._id, this.usuarioTransferir).subscribe(resp => {
          console.log(resp);
          this.router.navigateByUrl("proyectos");
        })
      })
    }
  }
}