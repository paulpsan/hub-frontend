import { Injectable } from "@angular/core";
import { Notificacion } from "../models/notificacion";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

@Injectable()
export class NotificacionesService {
  showNotificacionSource: Subject<any> = new Subject();

  getNotificacion(): Observable<any> {
    return this.showNotificacionSource.asObservable();
  }

  showError(msg: string, summary?: string) {
    this.show("error", summary, msg);
  }

  showSuccess(msg: string, summary?: string) {
    this.show("success", summary, msg);
  }

  showInfo(msg: string, summary?: string) {
    this.show("info", summary, msg);
  }

  showWarn(msg: string, summary?: string) {
    this.show("warn", summary, msg);
  }

  private show(severity: string, summary: string, msg: string) {
    const notificacion: Notificacion = {
      severity: severity,
      summary: summary,
      detail: msg
    };

    this.notify(notificacion);
  }

  private notify(notificacion: Notificacion): void {
    this.showNotificacionSource.next(notificacion);
  }
}
