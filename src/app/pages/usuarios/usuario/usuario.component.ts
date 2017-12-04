import { Component, OnInit, Inject } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'hub-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  id: number;
  acciones:string;
  usuario: Usuario;
  private sub:any;
  show:boolean=false;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private dialog:   MatDialog ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
 
    if (this.id) { //edit form
      this._httpService.buscarId('usuarios',this.id).subscribe(
        resp => {
            this.id = resp._id;
            this.usuario=resp;
            this.show=true;
            console.log(this.usuario);
         },error => {
          console.log(error);
         }
      );
    }
  }
  editarUsuario(usuario:Usuario){
    console.log(usuario);
    if (usuario) {
      this.router.navigate(['/usuarios/editar', usuario._id]);
    } 
  }

  eliminarUsuario(usuario:Usuario):void{
    console.log(usuario);
    let dialogRef = this.dialog.open(ModalEliminarUsuario, {
      width: '350px',
      data: usuario 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
              this._httpService.eliminarId('usuarios',result.id).subscribe(
              res => {
              //AQUI colocamos las notificaciones!!
              // setTimeout(()=>
              // { 
              //   this.obtenerUsuarios();
              // }, 1000);
              // console.log('done');
              this.router.navigate(['/usuarios/']);
            }
      );
      }

    });
  }
}
@Component({
  selector: 'modal-eliminar-usuario',
  templateUrl: 'modal-eliminar-usuario.html',
})
export class ModalEliminarUsuario {

  constructor(
    public dialogRef: MatDialogRef<ModalEliminarUsuario>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  cancelarClick(): void {
    this.dialogRef.close();
  }

}