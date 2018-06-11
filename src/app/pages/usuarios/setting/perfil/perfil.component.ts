import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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
  @Input() usuario;
  private sub: any;
  userForm: FormGroup;
  show: boolean = true;
  showPass: boolean = false;
  imagenSubir: File;
  imagenTemp: string;

  @Output() siguiente = new EventEmitter<any>();

  constructor(private _httpService: HttpService) {}

  ngOnInit() {
    this.id = this.usuario._id;
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
    if (this.usuario) {
      this.userForm.patchValue({
        nombre: this.usuario.nombre,
        email: this.usuario.email,
        password: this.usuario.password,
        descripcion: this.usuario.descripcion,
        avatar: this.usuario.avatar,
        url: this.usuario.url
      });
    }
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  onSubmit() {
    console.log(this.userForm.valid);
    if (this.userForm.valid) {
      if (this.id) {
        let usuario = {
          _id: this.id,
          nombre: this.userForm.controls["nombre"].value,
          email: this.userForm.controls["email"].value,
          url: this.userForm.controls["url"].value,
          descripcion: this.userForm.controls["descripcion"].value
        };
        if(this.imagenSubir){
          this._httpService.editar("usuarios/imagen", usuario).subscribe();
        }
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

    reader.onloadend = () => (this.imagenTemp = reader.result);
  }
  cambiarImagen() {
    console.log(this.imagenSubir, this.usuario._id);
  }
}
