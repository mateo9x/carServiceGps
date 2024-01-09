import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {User} from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  user: User | null = null;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.getUser();
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
}
