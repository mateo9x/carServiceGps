import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {SignUpFormService} from './sign-up-form.service';
import {Subscription} from 'rxjs';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss']
})
export class SignUpPage implements OnInit, OnDestroy {
  form: FormGroup;
  password2Subscription: Subscription = new Subscription();

  constructor(private formService: SignUpFormService,
              private userService: UserService) {
    this.form = this.formService.getFormGroup();
  }

  ngOnInit() {
    this.startPassword2Subscription();
  }

  ngOnDestroy() {
    this.password2Subscription.unsubscribe();
  }

  startPassword2Subscription() {
    const password2Control = this.formService.getPassword2Control(this.form);
    this.password2Subscription = password2Control.valueChanges.subscribe({
      next: (password2Value) => {
        const passwordValue = this.formService.getPasswordControl(this.form).value;
        if ((passwordValue && password2Value) && (passwordValue !== password2Value)) {
          password2Control.setErrors({passwordDoesntMatch: true});
        } else {
          password2Control.setErrors(null);
        }
      }
    });
  }

  signUp() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.userService.signUp(this.formService.convertFormToUserRequest(this.form));
    }
  }

  getErrors() {
    return this.formService.getErrors();
  }

}
