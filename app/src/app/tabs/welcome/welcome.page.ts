import {Component} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'welcome',
  templateUrl: 'welcome.page.html',
  styleUrls: ['welcome.page.scss']
})
export class WelcomePage {

  constructor(private authenticationService: AuthenticationService) {
  }

  logout() {
    this.authenticationService.logout();
  }

}
