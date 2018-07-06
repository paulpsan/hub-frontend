import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Router } from "@angular/router";
import { Usuario } from "../../../models/usuario";
import { HttpService } from "../../../services/http/http.service";

@Component({
  selector: "hub-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"]
})
export class RegistroComponent implements OnInit {
  id: number;
  acciones: string;
  user: Usuario;
  private sub: any;

  usuarioForm: FormGroup;
  show: boolean = true;

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this.usuarioForm = this.fb.group(
      {
        nombre: ['',[Validators.required]],
        email: ['',[Validators.required]],
        confirmarEmail: ['',[Validators.required]],
        password: ['',[Validators.required]],
        confirmarPassword: ['',[Validators.required]],

        // nombre: new FormControl("", Validators.required),
        // email: new FormControl("", [Validators.required, Validators.email]),
        // confirmarEmail: new FormControl("", Validators.required),
        // password: new FormControl("", Validators.required),
        // confirmarPassword: new FormControl("", Validators.required)
      },
      // {
      //   validators: this.sonIguales("email", "confirmarEmail")
      // }
    );

    console.log(this.usuarioForm.controls["email"].hasError);
  }
  get email() {
    return;
  }
  
  onSubmit() {
    let user: Usuario = new Usuario(
      null,
      this.usuarioForm.controls["nombre"].value,
      this.usuarioForm.controls["email"].value,
      this.usuarioForm.controls["password"].value,
      "usuario",
      "",
      "local",
      "true"
    );
    // this._httpService.adicionar("usuarios", user).subscribe();
    this.usuarioForm.reset();
    // this.router.navigate(["/login"]);
  }

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      console.log(group, campo1);
      let param1 = group.controls[campo1].value;
      let param2 = group.controls[campo2].value;

      if (param1 === param2) {
        return null;
      }

      return {
        sonIguales: true
      };
    };
  }
}
