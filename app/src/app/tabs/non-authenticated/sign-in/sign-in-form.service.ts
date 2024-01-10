import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationRequest} from '../../../models/authentication-request.model';

@Injectable({providedIn: 'root'})
export class SignInFormService {
  private ERRORS =
    {
      email: [
        {
          name: 'required',
          message: 'Pole Wymagane'
        },
        {
          name: 'pattern',
          message: 'Nieprawidłowy format email'
        }
      ],
      password: [
        {
          name: 'required',
          message: 'Pole Wymagane'
        },
        {
          name: 'minlength',
          message: 'Minimum 5 znaków'
        }
      ]
    };

  constructor(private formBuilder: FormBuilder) {
  }

  getForm() {
    return this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  convertFormToModel(form: FormGroup): AuthenticationRequest {
    const email = this.getEmailControl(form).value;
    const password = this.getPasswordControl(form).value;
    return new AuthenticationRequest(email, password);
  }

  getErrors() {
    return this.ERRORS;
  }

  private getEmailControl(form: FormGroup) {
    return form.get('email') as AbstractControl;
  }

  private getPasswordControl(form: FormGroup) {
    return form.get('password') as AbstractControl;
  }

}
