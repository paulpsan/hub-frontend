import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { HttpService } from "../../../../services/http.service";
import { slideInDownAnimation } from "../../../../animations";
import { Usuario } from "../../../../models/usuario";
import { UsuariosService } from "../../../../services/usuarios.service";

@Component({
  selector: "hub-perfil",
  templateUrl: "./perfil.component.html",
  styleUrls: ["./perfil.component.css"]
})
export class PerfilComponent implements OnInit {
  id: number;
  acciones: string;
  usuario: Usuario;
  private sub: any;
  userForm: FormGroup;
  show: boolean = true;
  showPass: boolean = false;

  imagenSubir: File;
  imagenTemp: string;

  @Output() siguiente = new EventEmitter<any>();

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
      descripcion: new FormControl("", Validators.required),
      url: new FormControl(""),
      password: new FormControl("", Validators.required)
    });

    if (this.id) {
      //edit form
      this._httpService.buscarId("usuarios", this.id).subscribe(
        usuario => {
          this.id = usuario._id;
          this.usuario = usuario;
          this.userForm.patchValue({
            nombre: usuario.nombre,
            email: usuario.email,
            password: usuario.password,
            descripcion: usuario.descripcion,
            avatar: usuario.avatar,
            url: usuario.url
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
          avatar: this.userForm.controls["avatar"].value,
          password: this.userForm.controls["password"].value,
          descripcion: this.userForm.controls["descripcion"].value
        };
        this._httpService.editar("usuarios", usuario).subscribe();
      }
    }
  }

  next() {
    this.siguiente.emit(this.id);
  }

  seleccionImage(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf("image") < 0) {
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => (this.imagenTemp = reader.result);
  }
  cambiarImagen() {
    console.log(this.imagenSubir, this.usuario._id);
  }
}
