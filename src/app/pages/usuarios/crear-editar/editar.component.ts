import { HttpService } from "../../../services/http.service";
import { slideInDownAnimation } from "../../../animations";
import { Component, OnInit, HostBinding } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Usuario } from "../../../models/usuario";
import { UsuarioService } from "../../../services/usuario.service";
import { UsuariosComponent } from "../usuarios.component";

@Component({
  selector: "catalogo-editar-usuario",
  templateUrl: "./editar.component.html",
  styleUrls: ["./editar.component.css"]
  // animations: [ slideInDownAnimation ]
})
export class EditarComponent implements OnInit {
  // @HostBinding('@routeAnimation') routeAnimation = false;
  // @HostBinding('style.display')   display = 'block';
  // @HostBinding('style.position')  position = 'absolute';

  id: number;
  acciones: string;
  usuario: Usuario;
  private sub: any;
  userForm: FormGroup;
  show: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
    });

    this.userForm = new FormGroup({
      nombre: new FormControl("", Validators.required),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]),
      password: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.required)
    });

    if (this.id) {
      //edit form
      this._httpService.buscarId("usuarios", this.id).subscribe(
        usuario => {
          this.id = usuario._id;
          this.userForm.patchValue({
            nombre: usuario.nombre,
            email: usuario.email,
            password: usuario.password,
            descripcion: usuario.descripcion
          });
        },
        error => {
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
        let usuario = {
          _id: this.id,
          nombre: this.userForm.controls["nombre"].value,
          email: this.userForm.controls["email"].value,
          password: this.userForm.controls["password"].value,
          descripcion: this.userForm.controls["descripcion"].value
        };
        this._httpService.editar("usuarios", usuario).subscribe();
      }

      this.userForm.reset();
      this.router.navigate(["/usuarios/", this.id]);
    }
  }

  irUsuario() {
    this.router.navigate(["/usuarios/", this.id]);
  }

  // redirectUserPage() {
  //   this.router.navigate(['/usuarios/', this.id]);
  // }
}
