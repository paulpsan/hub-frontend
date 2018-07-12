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
import { ConfirmValidParentMatcher, regExps } from "./CustomValidators";
import { CustomValidators } from "./CustomValidators";
import { errorMessages } from "./CustomValidators";

@Component({
  selector: "hub-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"]
})
export class RegistroComponent implements OnInit {
  id: number;
  acciones: string;
  user: Usuario;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;

  registroFormGroup: FormGroup;
  passFormGroup: FormGroup;
  emailFromGroup: FormGroup;

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
    this.emailFromGroup = this.fb.group(
      {
        email: ["", Validators.required],
        confirmarEmail: ["", Validators.required]
      },
      {
        validator: CustomValidators.childrenEqual
      }
    );
    this.passFormGroup = this.fb.group(
      {
        password: ["", Validators.required],
        // password: ["",[Validators.required, Validators.pattern(regExps.password)]],
        confirmarPassword: ["", Validators.required]
      },
      {
        validator: CustomValidators.childrenEqual
      }
    );

    this.registroFormGroup = this.fb.group({
      nombre: ["", Validators.required],
      passFormGroup: this.passFormGroup,
      emailFromGroup: this.emailFromGroup
    });
  }
  get email() {
    return;
  }

  onSubmit() {
    let user: Usuario = new Usuario(
      null,
      this.registroFormGroup.controls["nombre"].value,
      this.emailFromGroup.controls["email"].value,
      this.passFormGroup.controls["password"].value,
      "usuario",
      "",
      "local",
      "true"
    );
    this._httpService.adicionar("usuarios", user).subscribe();
    this.registroFormGroup.reset();
    this.router.navigate(["/login"]);
  }
}
