
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { LoadDataService } from "../../services/data/load-data.service";

@Component({
  selector: "dialog-loading",
  templateUrl: "./dialog-loading.component.html",
  styleUrls: ["./dialog-loading.component.css"]
})
export class DialogLoadingComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogLoadingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _loadDataService: LoadDataService) {
  }
  ngOnInit() {

    this._loadDataService.loadData$.subscribe(resp => {
      console.log(resp);
      if (resp) {
        this.dialogRef.close();
      }
    })
  }
}
