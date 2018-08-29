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
import { environment } from "../../../environments/environment";

@Injectable()
export class HubInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(req);
    if(req.url!==`${environment.url}usuarios/captcha`){
      req = req.clone({
        setHeaders: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
    }
    return next
      .handle(req)
      .map((event: HttpEvent<any>) => {
        return event;
      })
      .catch((err: any, caught) => {
        if (err instanceof HttpErrorResponse) {
          return Observable.throw(err);
        }
      });
  }
}
