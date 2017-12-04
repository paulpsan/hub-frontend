import { slideInDownAnimation } from '../../../../animations';
import { Component, OnInit, HostBinding } from '@angular/core';
import { FormControl,FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario }from '../../../../models/usuario'
import { UsuariosService } from '../../../../services/usuarios.service';
import { UsuariosComponent } from '../../usuarios.component';


@Component({
  selector: 'hub-crear-editar',
  templateUrl: './crear-editar.component.html',
  styleUrls: ['./crear-editar.component.css'],
  // animations: [ slideInDownAnimation ]
})
export class CrearEditarComponent implements OnInit {
  // @HostBinding('@routeAnimation') routeAnimation = false;
  // @HostBinding('style.display')   display = 'block';
  // @HostBinding('style.position')  position = 'absolute';

  id: number;
  acciones:string;
  user: Usuario;
  private sub:any;
  userForm: FormGroup;
  show:boolean=true;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UsuariosService) { }

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
      this.userService.buscarId(this.id).subscribe(
        user => {
            this.id = user._id;
            this.userForm.patchValue({
            nombre: user.nombre,
            email: user.email,
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
        let user: Usuario = new Usuario(this.id,
          this.userForm.controls['nombre'].value,
          this.userForm.controls['email'].value,'','','','');
        this.userService.editar(user).subscribe();
      } else {
        let user: Usuario = new Usuario(null,
          this.userForm.controls['nombre'].value,
          this.userForm.controls['email'].value,'','','','');
        this.userService.adicionar(user).subscribe();
      }
 
      this.userForm.reset();
      this.router.navigate(['/usuarios']);
    }
  }
  redirectUserPage() {
    this.router.navigate(['/usuarios']);
  }
}
