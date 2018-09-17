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
  usuariosSearch;

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
        this.grupo.Usuarios.map(usuario => {
          usuario.request = '';
          usuario.change = false;
          return usuario
        })
        console.log(resp);
      })
    });

    this.userForm.controls["nombre"].valueChanges.subscribe(resp => {
      let pagData = {
        ordenar: "nombre",
        pagina: 1,
        limite: 10,
        buscar: resp
      };
      this._httpService.obtenerPaginado("usuarios", pagData).subscribe(
        (result: any) => {
          this.usuariosSearch = result.datos;
        },
        err => {
          console.log(err);
        }
      );
    });
  }
  
  guardar(usuario){
    usuario.request = 'start';
    usuario.change = false;
    this._httpService.editar("grupos", usuario).subscribe(result => {
      usuario.request = 'ok';

    }, err => {
      usuario.request = 'error'
    })
  }
  addUser( event){

    console.log(event);
    this._httpService.post(`grupos/${this.id}/usuarios`,event).subscribe(resp => {
      this.grupo=resp
      this.grupo.Usuarios.map(usuario => {
        usuario.request = '';
        usuario.change = false;
        return usuario
      })
      console.log(resp);
    })
  }
  
  eliminar( event){
    console.log(event);
    this._httpService.eliminarId(`grupos/${this.id}/usuarios`,event).subscribe(resp => {
      this.grupo=resp
      this.grupo.Usuarios.map(usuario => {
        usuario.request = '';
        usuario.change = false;
        return usuario
      })
      console.log(resp);
    })
  }
}
