import { Component, OnInit, Inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Router } from "@angular/router";
import { HttpService } from "../../services/http/http.service";
import { CustomValidators, ConfirmValidParentMatcher, errorMessages, regExps } from "./CustomValidators";
import { environment } from "../../../environments/environment"
import { GitlabService } from "../../services/gitlab/gitlab.service";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { MessageDataService } from "../../services/service.index";

@Component({
  selector: "hub-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"]
})
export class RegistroComponent implements OnInit {
  id: number;
  acciones: string;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;
  captchaSvg;
  sessionID;
  gitlab: boolean = false;;
  token;
  domain;
  dataLoading;
  captchaIcon: SafeHtml;
  sanitize: DomSanitizer;
  request: boolean = false;
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
    private _messageDataService: MessageDataService,
    private dialog: MatDialog


  ) {
    this.sanitize = sanitizer;
    this.token = environment.gitlabAdmin.privateToken;
    this.domain = environment.gitlabAdmin.domain;
    this.gitlab = environment.createGitlab;
    this.dataLoading = {
      content: 'Cargando .........',
      icon: false,
    }
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
        password: ["", [Validators.required, Validators.minLength(8)]],
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
      captcha: ["", Validators.required],
      terms: ['', Validators.requiredTrue]
    });
  }
  get email() {
    return;
  }

  onSubmit() {
    this.request = true
    let user = {
      nombre: this.registroFormGroup.controls["nombre"].value,
      username: this.registroFormGroup.controls["username"].value,
      email: this.emailFromGroup.controls["email"].value,
      password: this.passFormGroup.controls["password"].value,
      captcha: this.registroFormGroup.controls["captcha"].value,
      sessionID: this.sessionID,
      gitlab: true,
    }
    this.crearUsuario(user)

    // if (this.gitlab && this.token !== "") {
    //   this._gitlabService.createUser(user, this.token, this.domain).subscribe(resp => {
    //     console.log(resp);
    //     if (resp.message) {
    //       const objMessage = {
    //         text: resp.message.password || resp.message,
    //         type: "Advertencia",
    //       }
    //       this._messageDataService.changeMessage(objMessage);
    //       this.snackBar.openFromComponent(SnackbarComponent, {
    //         horizontalPosition: 'right',
    //         verticalPosition: "top",
    //         panelClass: "background-warning",
    //         duration: 5000
    //       });
    //       this.getCaptcha();
    //     } else {
    //       this.crearUsuario(user)
    //     }
    //   }, err => {
    //     this.registroFormGroup.patchValue({
    //       captcha: ""
    //     })
    //     const objMessage = {
    //       text: err.error.message,
    //       type: "Advertencia",
    //     }
    //     this._messageDataService.changeMessage(objMessage);
    //     this.snackBar.openFromComponent(SnackbarComponent, {
    //       horizontalPosition: 'right',
    //       verticalPosition: "top",
    //       panelClass: "background-warning",
    //       duration: 5000
    //     });
    //     this.getCaptcha();
    //   })
    // } else {
    //   this.crearUsuario(user)
    // }
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
        this.request = false;
        this.getCaptcha()
        const objMessage = {
          text: "Por favor verifique su email para confirmar",
          type: "Info",
        }
        this._messageDataService.changeMessage(objMessage);
        this.snackBar.openFromComponent(SnackbarComponent, {
          horizontalPosition: 'right',
          verticalPosition: "top",
          panelClass: "background-success",
          duration: 5000
        });
        setTimeout(() => {
          this.router.navigate(["/auth/login"]);
        }, 2000);
      }
      , err => {
        //mensaje de Error
        this.request = false;
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
  openTerminos() {

    let dialogRef = this.dialog.open(ModalTerminos, {
      // height: '820px',
      // width: '920px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
@Component({
  selector: "modal-terminos",
  templateUrl: "modal-terminos.html"
})
export class ModalTerminos {
  pdfSrc: string = '/assets/pdf/TerminosServicio.pdf';
  dataLoading: any = {
    title: ""
  };
  constructor(
    public dialogRef: MatDialogRef<ModalTerminos>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // this.dataLoading.title = "cargando"
  }
  loading() {
    this.dataLoading = undefined;
  }
  cancelarClick(): void {
    this.dialogRef.close();
  }
}
