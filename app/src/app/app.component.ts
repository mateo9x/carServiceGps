import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {User} from './models/user.model';
import {Toast, ToastService, ToastType} from './services/common/toast.service';
import {NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ProgressBarService} from './services/common/progress-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  user: User | null = null;
  toast: Toast | null = null;
  currentRoutingTitle: string = '';
  showProgressBar: boolean = false;
  toastButton = [
    {
      text: 'Ok',
      role: 'cancel'
    }
  ];

  constructor(private authenticationService: AuthenticationService,
              private toastService: ToastService,
              private router: Router,
              private titleService: Title,
              private progressBarService: ProgressBarService) {
  }

  ngOnInit() {
    this.getUser();
    this.subscribeToasts();
    this.subscribeCurrentRoutingTitle();
    this.subscribeProgressBar();
  }

  logout() {
    this.authenticationService.logout();
  }

  private getUser() {
    this.authenticationService.setUserOnInit();
    this.authenticationService.userLogged$.subscribe({
      next: (user) => this.user = user
    });
  }

  private subscribeToasts() {
    this.toastService.toast$.subscribe({
      next: (toast) => this.toast = toast
    });
  }

  private subscribeCurrentRoutingTitle() {
    this.router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationEnd) {
          setTimeout(() => {
            const title = this.titleService.getTitle();
            this.currentRoutingTitle = title;
          }, 50);
        }
      }
    });
  }

  private subscribeProgressBar() {
    this.progressBarService.progressBar$.subscribe({
      next: (showProgressBar) => this.showProgressBar = showProgressBar
    });
  }

  closeToast() {
    this.toast!.show = false;
  }
}
