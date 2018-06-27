import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { environment } from "../../../../../environments/environment";
import { HttpService } from "../../../../services/http/http.service";
import { slideInDownAnimation } from "../../../../animations";
import { Usuario } from "../../../../models/usuario";
import { UsuarioService } from "../../../../services/usuario/usuario.service";
import { SubirArchivoService } from "../../../../services/subir-archivo/subir-archivo.service";

@Component({
  selector: "hub-perfil",
  templateUrl: "./perfil.component.html",
  styleUrls: ["./perfil.component.css"]
})
export class PerfilComponent implements OnInit {
  usuario;
  userForm: FormGroup;
  showButton: boolean = true;
  showPass: boolean = false;
  imagenSubir: File;
  imagenTemp: string;

  @Output() siguiente = new EventEmitter<any>();

  constructor(
    private _httpService: HttpService,
    private _subirArchivoService: SubirArchivoService,
    private _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this._usuarioService.usuario$.subscribe(repUsuario => {
      this.usuario = repUsuario;
    });
    console.log(this.usuario);
    this.userForm = new FormGroup({
      nombre: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.required),
      url: new FormControl(""),
      password: new FormControl("")
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
    console.log(this.userForm.valid);
    if (this.userForm.valid) {
      this.showButton = false;
      this.next({ value: false, index: 0 });
    }
  }

  onSubmit() {
    console.log(this.userForm.valid);
    if (this.userForm.valid) {
      if (this.usuario) {
        let usuario = {
          _id: this.usuario._id,
          nombre: this.userForm.controls["nombre"].value,
          email: this.usuario.email,
          url: this.userForm.controls["url"].value,
          descripcion: this.userForm.controls["descripcion"].value,
          avatar: this.usuario.avatar
        };
        if (this.imagenSubir) {
          this._subirArchivoService
            .subirArchivo(this.imagenSubir, "usuarios", this.usuario._id)
            .then((resp: any) => {
              usuario.avatar = resp.usuario.avatar;
              this._usuarioService.actualizarUsuario(usuario);
            });
        } else {
          this._usuarioService.actualizarUsuario(usuario);
        }

        // this._httpService.editar("usuarios", usuario).subscribe(resp => {
        //   console.log(resp);
        //   this._usuarioService.guardarStorage(resp);
        // });
      }
    }
    this.showButton = false;
  }

  next(object) {
    this.siguiente.emit(object);
  }

  seleccionImage(archivo: File) {
    console.log(this.imagenTemp, this.usuario);
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
  activar() {
    let usuario = this.usuario;
    usuario.estado = true;
    this._usuarioService.actualizarUsuario(usuario);
    this.next({ value: false, index: 0 });
  }
}
