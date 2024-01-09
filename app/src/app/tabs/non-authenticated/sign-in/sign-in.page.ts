import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {SignInFormService} from './sign-in-form.service';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'sign-in',
  templateUrl: 'sign-in.page.html',
  styleUrls: ['sign-in.page.scss']
})
export class SignInPage {
  form: FormGroup;

  constructor(private formService: SignInFormService, private authenticationService: AuthenticationService) {
    this.form = formService.getForm();
  }

  signIn() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const request = this.formService.convertFormToModel(this.form);
      this.authenticationService.authenticateUser(request);
    }
  }

}
