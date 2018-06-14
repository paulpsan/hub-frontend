import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { GLOBAL } from "../../../../services/global";
import { HttpService } from "../../../../services/http/http.service";
import { slideInDownAnimation } from "../../../../animations";
import { Usuario } from "../../../../models/usuario";
import { UsuarioService } from "../../../../services/usuario/usuario.service";
import { Subject } from "rxjs";

@Component({
  selector: "hub-repositorio",
  templateUrl: "./repositorio.component.html",
  styleUrls: ["./repositorio.component.css"]
})
export class RepositorioComponent implements OnInit {
  id: number;
  acciones: string;
  repositorio;
  private sub: any;
  userForm: FormGroup;
  addForm: FormGroup;
  show: boolean = true;
  showAdd: boolean = false;
  showRepo: boolean = false;
  usuario;
  @Output() siguiente = new EventEmitter<any>();
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  imagenSubir: File;
  imagenTemp: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.dtOptions = GLOBAL.dtOptions;
    this.id = this.usuario._id;

    this.userForm = new FormGroup({
      nombre: new FormControl("", Validators.required),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]),
      avatar: new FormControl(""),
      descripcion: new FormControl("", Validators.required),
      url: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });

    if (this.id) {
      //edit form
      this._httpService
        .obtener("repositorios/" + this.id + "/usuarios")
        .subscribe(
          repositorios => {
            this.repositorio = repositorios;
            this.showRepo = this.repositorio.datos.length !== 0 ? true : false;
            console.log(repositorios, this.showRepo);
            // this.id = usuario._id;
            // this.userForm.patchValue({
            //   nombre: usuario.nombre,
            //   email: usuario.email,
            //   password: usuario.password,
            //   descripcion: usuario.descripcion,
            //   avatar: usuario.avatar,
            //   url: usuario.url
            // });
          },
          error => {
            console.log(error);
          }
        );
    }
  }
  adicionarRepo() {
    this.showAdd = true;

    this.addForm = new FormGroup({
      nombreRepo: new FormControl("", Validators.required),
      avatarRepo: new FormControl(""),
      descripcionRepo: new FormControl("", Validators.required),
      urlRepo: new FormControl("", Validators.required),
      datePri: new FormControl(""),
      dateUlt: new FormControl("")
    });
    console.log("object");
  }
  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }
  guardarRepo() {
    let repositorio = {
      nombre: this.addForm.controls["nombre"].value,
      urlRepo: this.addForm.controls["urlRepo"].value,
      descripcion: this.addForm.controls["descripcion"].value
    };
    this.showAdd = false;
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
