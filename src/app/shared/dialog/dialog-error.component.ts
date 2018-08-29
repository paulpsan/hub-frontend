
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "dialog-error",
  templateUrl: "./dialog-error.component.html",
  styleUrls: ["./dialog-error.component.css"]
})
export class DialogErrorComponent implements OnInit {
  message;
  constructor(
    public dialogRef: MatDialogRef<DialogErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(this.data);
    if (this.data.errors.message) {
      this.message = 'Su sesión ha sido cerrada después de 120 minutos tiempo que dura la sesión'
    }
    else {
      this.message = 'Su sesión ha sido cerrada';
    }

  }
  ngOnInit() {
    console.log(this.data);
    setTimeout(() => {
      this.dialogRef.close();
    }, 5000);
  }
}
