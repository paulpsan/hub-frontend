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

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(localStorage.getItem('token'));
    return next.handle(req).pipe(catchError((err: any) => {
      if (err.status === 401) {
        console.log("error: unAutorize");
        this.router.navigate(['/login'])
        // location.reload(true);
      }
      return Observable.throw(err);
    })
    );
  }
}
