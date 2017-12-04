import { HubInterceptor } from '../../common/interceptor/hub.interceptor';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Usuario } from '../../models/usuario';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'hub-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {

  usuarios:Usuario[];
  private respuesta: any;

  constructor(private _httpService: HttpService,private router : Router) {
    
   }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  // obtenerUsuarios(){
  //   this._httpService.obtener().subscribe(
  //     result =>{
  //       this.usuarios=result.datos;
  //       console.log (result);
  //     },
  //     err =>{
  //       console.log(err);
  //     }
  //   )
  // }
  // Recibe de respuesta un objeto de tipo Usuarios
  obtenerUsuarios(){
    this._httpService.obtener('usuarios').subscribe(
      result =>{
        this.respuesta=result;
        this.usuarios=this.respuesta.datos;
        console.log (this.respuesta.datos);
      },
      err =>{
        console.log(err);
      }
    )
  }
  irUsuario(usuario){
    if (usuario) {
      this.router.navigate(['/usuarios/', usuario._id]);
    } 
  }
 
  adicionarUsuario(){
      this.router.navigate(['/usuarios/adicionar']);
  }
}

