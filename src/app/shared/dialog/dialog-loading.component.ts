
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "dialog-loading",
  templateUrl: "./dialog-loading.component.html",
  styleUrls: ["./dialog-loading.component.css"]
})
export class DialogLoadingComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogLoadingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  ngOnInit() {
    console.log(this.data);
    setTimeout(() => {
      this.dialogRef.close();
    }, 3000);
  }
}
