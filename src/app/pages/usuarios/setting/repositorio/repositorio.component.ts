import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { HttpService } from "../../../../services/http.service";
import { slideInDownAnimation } from "../../../../animations";
import { Usuario } from "../../../../models/usuario";
import { UsuariosService } from "../../../../services/usuarios.service";

@Component({
  selector: "hub-repositorio",
  templateUrl: "./repositorio.component.html",
  styleUrls: ["./repositorio.component.css"]
})
export class RepositorioComponent implements OnInit {
  id: number;
  acciones: string;
  usuario: Usuario;
  repositorio;
  showRepositorio: boolean = false;
  private sub: any;
  userForm: FormGroup;
  repoForm: FormGroup;
  show: boolean = true;
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
      avatar: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.required),
      url: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
    this.repoForm = new FormGroup({
      nombreRepo: new FormControl("", Validators.required),
      avatarRepo: new FormControl("", Validators.required),
      descripcionRepo: new FormControl("", Validators.required),
      urlRepo: new FormControl("", Validators.required),
      datePri: new FormControl(""),
      dateUlt: new FormControl("")
    });
    if (this.id) {
      //edit form
      this._httpService
        .obtener("repositorios/" + this.id + "/usuarios")
        .subscribe(
          repositorios => {
            this.repositorio = repositorios;
            this.showRepositorio =
              this.repositorio.datos.length !== 0 ? true : false;
            console.log(repositorios, this.showRepositorio);
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
    console.log("object");
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
}
