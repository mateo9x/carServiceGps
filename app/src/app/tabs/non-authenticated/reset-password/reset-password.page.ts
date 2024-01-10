import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss']
})
export class ResetPasswordPage {
  form: FormGroup;
  ERRORS = [
    {
      name: 'required',
      message: 'Pole Wymagane'
    },
    {
      name: 'pattern',
      message: 'Nieprawidłowy format email'
    }
  ];

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]]
    });
  }

  resetPassword() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.userService.startResetPasswordProcedure(this.getEmailControl().value);
    }
  }

  getEmailControl() {
    return this.form.get('email') as AbstractControl;
  }
}
