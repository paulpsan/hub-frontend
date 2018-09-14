import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../../services/service.index';

@Component({
  selector: 'hub-usuarios-grupo',
  templateUrl: './usuarios-grupo.component.html',
  styleUrls: ['./usuarios-grupo.component.css']
})
export class UsuariosGrupoComponent implements OnInit {
  id: any;
  userForm: FormGroup;
  grupo;
  usuario;
  edit:boolean=false;
  permisosUsuario = [
    { nombre: "propietario", rol: "owner", access: "50" },
    { nombre: "mantenedor", rol: "maintainer", access: "40" },
    { nombre: "desarrollador", rol: "developer", access: "30" },
    { nombre: "reportero", rol: "reporter", access: "20" },
    { nombre: "invitado", rol: "guest", access: "10" },
  ]
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
  ) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      permiso: new FormControl('', Validators.required)
    });
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this._httpService.obtener(`grupos/${this.id}/usuarios`).subscribe(resp => {
        this.grupo=resp
        console.log(resp);
      })
    });
  }
  
  guardar(usuario){
    console.log(usuario);
  }

}
