import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
providedIn: "root"
})
export class ObsService {

  private notify = new Subject<any>();
  /*Observable string stream */
  notifyObservable$ = this.notify.asObservable();

  constructor() { }

  /**Set Observable to show result on other component*/
  async set(set: any, key: any) {
    await this.notify.next({ set: set, key: key });
  }

  /**get Observable to show result on other component*/
  get(): Observable<any> {
    return this.notify.asObservable();
  }

}