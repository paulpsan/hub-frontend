import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class MessageDataService {

  private messageData: BehaviorSubject<any> = new BehaviorSubject({})
  public messageData$: Observable<any> = this.messageData.asObservable();

  constructor() {
  }
  changeMessage(data) {
    this.messageData.next(data)
  }
}
