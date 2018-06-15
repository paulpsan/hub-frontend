import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
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
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this.usuarioForm = new FormGroup({
      nombre: new FormControl("", Validators.required),
      email: new FormControl("", [
        Validators.required,
        Validators.email,
      ]),
      confirmarEmail: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      confirmarPassword: new FormControl("", Validators.required),
    });
  }
  onSubmit() {
    let user: Usuario = new Usuario(
      null,
      this.usuarioForm.controls["nombre"].value,
      this.usuarioForm.controls["email"].value,
      this.usuarioForm.controls["password"].value,
      "admin",
      "",
      "local",
      "true"
    );
    this._httpService.adicionar("usuarios", user).subscribe();
    this.usuarioForm.reset();
    this.router.navigate(["/login"]);
  }
}
