import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageDataService, HttpService } from "../../services/service.index";
import { MatSnackBar } from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SnackbarComponent } from "../../shared/snackbar/snackbar.component";

@Component({
  selector: "hub-reset",
  templateUrl: "./reset.component.html",
  styleUrls: ["./reset.component.css"]
})
export class ResetComponent implements OnInit {
  public token;
  public errorMessage;
  public gitlab: boolean = true;

  resetForm: FormGroup;
  constructor(
    private router: Router,
    public _httpService: HttpService,
    public snackBar: MatSnackBar,
    private _messageDataService: MessageDataService
  ) {}

  ngOnInit() {
    this.resetForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email])
    });
  }
  onSubmit() {
    const email = this.resetForm.controls["email"].value;
    this._httpService.post("usuarios/recuperar", { email }).subscribe(
      resp => {
        console.log(resp);
        if (resp.message) {
          const objMessage = {
            text: resp.message,
            type: "Info"
          };
          this._messageDataService.changeMessage(objMessage);
          this.snackBar.openFromComponent(SnackbarComponent, {
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: "background-success",
            duration: 3000
          });
        }
        this.router.navigate(["/auth/login"]);
      },
      err => {
        if (err.error.message) {
          console.log(err);
          const objMessage = {
            text: err.error.message,
            type: "Warning"
          };
          this._messageDataService.changeMessage(objMessage);
          this.snackBar.openFromComponent(SnackbarComponent, {
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: "background-warning",
            duration: 3000
          });
        }
      }
    );
    // this._usuarioService.
  }
}
