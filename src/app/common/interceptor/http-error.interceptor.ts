import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { catchError } from "rxjs/operators";
import { DialogErrorComponent } from "../../shared/dialog/dialog-error.component";
import { MatDialog } from "@angular/material";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, public dialog: MatDialog) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((err: any) => {
      if (err.status === 401) {
        console.log(err);
        if (err.error.errors) {
          this.openDialog(err);
        }
        this.router.navigate(['/login'])
        // location.reload(true);
      }
      return Observable.throw(err);
    })
    );
  }
  openDialog(err) {
    const dialogRef = this.dialog.open(DialogErrorComponent, {
      data: err.error,
      disableClose:true,
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      this.router.navigate(['/login'])
    });
  }
}
