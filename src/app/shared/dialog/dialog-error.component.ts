
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "dialog-error",
  templateUrl: "./dialog-error.component.html",
  styleUrls: ["./dialog-error.component.css"]
})
export class DialogErrorComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  ngOnInit() {
    console.log(this.data);
    setTimeout(() => {
      this.dialogRef.close();
    }, 3000);
  }
}
