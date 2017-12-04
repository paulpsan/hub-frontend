import { HttpService } from '../../../../services/http.service';
import { slideInDownAnimation } from '../../../../animations';
import { Component, OnInit, HostBinding } from '@angular/core';
import { FormControl,FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario }from '../../../../models/usuario'
import { UsuariosService } from '../../../../services/usuarios.service';
import { UsuariosComponent } from '../../usuarios.component';


@Component({
  selector: 'hub-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  // animations: [ slideInDownAnimation ]
})
export class EditarComponent implements OnInit {
  // @HostBinding('@routeAnimation') routeAnimation = false;
  // @HostBinding('style.display')   display = 'block';
  // @HostBinding('style.position')  position = 'absolute';

  id: number;
  acciones:string;
  usuario: Usuario;
  private sub:any;
  userForm: FormGroup;
  show:boolean=true;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.userForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ])
    });
 
    if (this.id) { //edit form
      this._httpService.buscarId('usuarios',this.id).subscribe(
        usuario => {
            this.id = usuario._id;
            this.userForm.patchValue({
            nombre: usuario.nombre,
            email: usuario.email,
          });
         },error => {
          console.log(error);
         }
      );
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.id) {
        let usuario: Usuario = new Usuario(this.id,
          this.userForm.controls['nombre'].value,
          this.userForm.controls['email'].value,'','','','');
        this._httpService.editar('usuarios',usuario).subscribe();
      } else {
        let usuario: Usuario = new Usuario(null,
          this.userForm.controls['nombre'].value,
          this.userForm.controls['email'].value,'','','','');
        this._httpService.adicionar('usuarios',usuario).subscribe();
      }
 
      this.userForm.reset();
      this.router.navigate(['/usuarios/', this.id]);
    }
  }

  irUsuario(){
    this.router.navigate(['/usuarios/', this.id]);
  }

  // redirectUserPage() {
  //   this.router.navigate(['/usuarios/', this.id]);
  // }
}
