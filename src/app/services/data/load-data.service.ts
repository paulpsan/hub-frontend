import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoadDataService {

  private loadData: BehaviorSubject<any> = new BehaviorSubject(true)
  public loadData$: Observable<boolean> = this.loadData.asObservable();
  constructor() {
    if (localStorage.getItem("isLoadingData"))
      this.loadData.next(JSON.parse(localStorage.getItem("isLoadingData")))
  }
  getCurrentData() {
    return JSON.parse(localStorage.getItem("isLoadingData"))

  }
  startRequest() {
    localStorage.setItem("isLoadingData", 'false');
    this.loadData.next(false)
  }
  finishRequest() {
    localStorage.setItem("isLoadingData", 'true');
    this.loadData.next(true)
  }
}
