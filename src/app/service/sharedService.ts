import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private hideComponentSource = new BehaviorSubject<boolean>(false);
  hideComponent$ = this.hideComponentSource.asObservable();

  hideComponent() {
    this.hideComponentSource.next(true);
  }
}
