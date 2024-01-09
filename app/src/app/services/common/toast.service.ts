import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ToastService {
  private toastSubject: Subject<Toast> = new Subject<Toast>();
  toast$: Observable<Toast> = this.toastSubject.asObservable();

  showToast(message: string, toastType: ToastType) {
    this.toastSubject.next(new Toast(true, message, toastType))
  }

}

export enum ToastType {
  SUCCESS = ('success-toast'),
  WARN = ('warn-toast'),
  ERROR = ('error-toast')
}

export class Toast {
  show: boolean;
  message: string;
  toastType: ToastType

  constructor(show: boolean, message: string, toastType: ToastType) {
    this.show = show;
    this.message = message;
    this.toastType = toastType;
  }
}
