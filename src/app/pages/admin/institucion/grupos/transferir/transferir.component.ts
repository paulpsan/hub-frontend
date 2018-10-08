import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  HttpService,
  UsuarioService,
  MessageDataService
} from "../../../../../services/service.index";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "hub-transferir",
  templateUrl: "./transferir.component.html",
  styleUrls: ["./transferir.component.css"]
})
export class TransferirComponent implements OnInit {
  id: any;
  userForm: FormGroup;
  grupo;
  usuario;
  usuarioAdmin;
  usuarioTransferir;
  usuarios;
  usuariosSearch;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private _usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private _messageDataService: MessageDataService
  ) {}
  ngOnInit() {
    this._usuarioService.usuario$.subscribe(respUsuario => {
      this.usuario = respUsuario;
    });
    this.userForm = new FormGroup({
      nombre: new FormControl("", Validators.required)
    });

    this.route.params.subscribe(params => {
      this.id = params["id"];
      console.log(this.usuario);
      this.grupo = this.usuario.Grupos.find(grupo => grupo._id == this.id);
      console.log(this.grupo);

      if (this.grupo.UsuarioGrupo.admin == true || this.usuario.admin == true) {
        this.obtenerDatos();
      } else {
        this.router.navigateByUrl("admin/institucion/grupos");
      }
    });
  }
  obtenerDatos() {
    this._httpService.obtener(`grupos/${this.id}/usuarios`).subscribe(
      (result: any) => {
        this.usuarios = result.Usuarios;
        this.usuarioAdmin = this.usuarios.filter(usuario => {
          return (usuario.admin_grupo = true);
        });

        console.log(this.usuario);
      },
      err => {
        console.log(err);
      }
    );
    this.userForm.controls["nombre"].valueChanges.subscribe(resp => {
      this.usuariosSearch = this.usuarios.filter(user => {
        return user.nombre.indexOf(resp) >= 0;
      });
    });
  }
  selectUser() {
    this.usuarioTransferir = this.usuariosSearch.find(user => {
      return user.nombre == this.userForm.controls["nombre"].value;
    });
    console.log(this.usuarioTransferir);
  }
  transferir() {
    if (
      this.usuarioTransferir &&
      confirm(
        "Desea transferir El grupo al usuario: " + this.usuarioTransferir.nombre
      )
    ) {
      this.usuario.admin_grupo = false;
      this._httpService
        .get(
          `usuarios/${this.usuario._id}/transferir/${
            this.usuarioTransferir._id
          }`
        )
        .subscribe(resp => {
          this.router.navigateByUrl("proyectos");
        });
    }
  }
}
