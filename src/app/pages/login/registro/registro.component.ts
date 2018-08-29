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
import { CustomValidators, ConfirmValidParentMatcher, errorMessages, regExps } from "./CustomValidators";
import { environment } from "../../../../environments/environment"
import { GitlabService } from "../../../services/gitlab/gitlab.service";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { SnackbarComponent } from '../../../shared/snackbar/snackbar.component';
import { MatSnackBar } from "@angular/material";
import { MessageDataService } from "../../../services/service.index";
import { timeout } from "q";

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
  captchaSvg;
  sessionID;
  gitlab: boolean = false;;
  token;
  domain;
  captchaIcon: SafeHtml;
  sanitize: DomSanitizer;

  registroFormGroup: FormGroup;
  passFormGroup: FormGroup;
  emailFromGroup: FormGroup;
  refreshCaptcha = true;

  show: boolean = true;

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _httpService: HttpService,
    private _gitlabService: GitlabService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private _messageDataService: MessageDataService


  ) {
    this.sanitize = sanitizer;
    this.token = environment.gitlabAdmin.privateToken;
    this.domain = environment.gitlabAdmin.domain;
    this.gitlab = environment.createGitlab;
  }

  ngOnInit() {
    this.getCaptcha();
    this.emailFromGroup = this.fb.group(
      {
        email: ["", [Validators.required, Validators.email]],
        confirmarEmail: ["", [Validators.required, Validators.email]]
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
      username: ["", Validators.required],
      passFormGroup: this.passFormGroup,
      emailFromGroup: this.emailFromGroup,
      captcha: ["", Validators.required]
    });
  }
  get email() {
    return;
  }

  onSubmit() {
    let user = {
      nombre: this.registroFormGroup.controls["nombre"].value,
      username: this.registroFormGroup.controls["username"].value,
      email: this.emailFromGroup.controls["email"].value,
      password: this.passFormGroup.controls["password"].value,
      captcha: this.registroFormGroup.controls["captcha"].value,
      sessionID: this.sessionID
    }

    if (this.gitlab && this.token !== "") {
      this._gitlabService.createUser(user, this.token, this.domain).subscribe(resp => {
        console.log(resp);
        if (resp.message) {
          const objMessage = {
            text: resp.message.password || resp.message,
            type: "Advertencia",
          }
          this._messageDataService.changeMessage(objMessage);
          this.snackBar.openFromComponent(SnackbarComponent, {
            horizontalPosition: 'right',
            verticalPosition: "top",
            panelClass: "background-warning",
            duration: 5000
          });
        } else {
          this.crearUsuario(user)
        }
      }, err => {
        this.registroFormGroup.patchValue({
          captcha: ""
        })
        const objMessage = {
          text: err.error.message,
          type: "Advertencia",
        }
        this._messageDataService.changeMessage(objMessage);
        this.snackBar.openFromComponent(SnackbarComponent, {
          horizontalPosition: 'right',
          verticalPosition: "top",
          panelClass: "background-warning",
          duration: 5000
        });
        this.getCaptcha();
      })
    } else {
      this.crearUsuario(user)
    }
  }
  getCaptcha() {
    this._httpService.get("usuarios/captcha").subscribe(resp => {
      this.captchaSvg = resp.captcha
      this.sessionID = resp.id
      this.refreshCaptcha = true;
      this.refreshCaptcha = false;
      this.captchaIcon = this.sanitize.bypassSecurityTrustHtml(
        this.captchaSvg
      );
    })
  }
  crearUsuario(user) {
    this._httpService.adicionar("usuarios", user).subscribe(
      resp => {
        console.log(resp);
        this.getCaptcha()
        const objMessage = {
          text: "Se Adiciono al usuario correctamente",
          type: "Info",
        }
        this._messageDataService.changeMessage(objMessage);
        this.snackBar.openFromComponent(SnackbarComponent, {
          horizontalPosition: 'right',
          verticalPosition: "top",
          panelClass: "background-success",
          duration: 5000
        });
        this.registroFormGroup.reset();
        setTimeout(() => {
          this.router.navigate(["/login"]);
        }, 2000);
      }
      , err => {
        //mensaje de Error
        this.registroFormGroup.patchValue({
          captcha: ""
        })
        const objMessage = {
          text: err.error.message,
          type: "Advertencia",
        }
        this._messageDataService.changeMessage(objMessage);
        this.snackBar.openFromComponent(SnackbarComponent, {
          horizontalPosition: 'right',
          verticalPosition: "top",
          panelClass: "background-warning",
          duration: 5000
        });
        this.getCaptcha()
        console.log(err);
      });
  }


}
