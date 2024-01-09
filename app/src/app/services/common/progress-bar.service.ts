import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProgressBarService {
  private progressBarSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  progressBar$: Observable<boolean> = this.progressBarSubject.asObservable();

  setLoading(loading: boolean) {
    this.progressBarSubject.next(loading);
  }

}
