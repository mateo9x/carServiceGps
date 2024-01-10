import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from '../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SignUpFormService {
  private ERRORS =
    {
      firstName: [
        {
          name: 'required',
          message: 'Pole Wymagane'
        },
        {
          name: 'maxlength',
          message: 'Maksymalnie 100 znaków'
        }
      ],
      lastName: [
        {
          name: 'required',
          message: 'Pole Wymagane'
        },
        {
          name: 'maxlength',
          message: 'Maksymalnie 100 znaków'
        }
      ],
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
      ],
      password2: [
        {
          name: 'required',
          message: 'Pole Wymagane'
        },
        {
          name: 'minlength',
          message: 'Minimum 5 znaków'
        },
        {
          name: 'passwordDoesntMatch',
          message: 'Hasła muszą do siebie pasować'
        }
      ]
    };

  constructor(private fb: FormBuilder) {
  }

  getFormGroup(): FormGroup {
    return this.fb.group({
      firstName: [null, [Validators.required, Validators.maxLength(100)]],
      lastName: [null, [Validators.required, Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      password: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      password2: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]]
    });
  }

  convertFormToUserRequest(form: FormGroup): User {
    const firstName = this.getFirstNameControl(form).value;
    const lastName = this.getLastNameControl(form).value;
    const email = this.getEmailControl(form).value;
    const password = this.getPasswordControl(form).value;
    return new User(firstName, lastName, email, password);
  }

  getErrors() {
  return this.ERRORS;
  }

  getFirstNameControl(form: FormGroup): AbstractControl {
    return form.get('firstName') as AbstractControl;
  }

  getLastNameControl(form: FormGroup): AbstractControl {
    return form.get('lastName') as AbstractControl;
  }

  getEmailControl(form: FormGroup): AbstractControl {
    return form.get('email') as AbstractControl;
  }

  getPasswordControl(form: FormGroup): AbstractControl {
    return form.get('password') as AbstractControl;
  }

  getPassword2Control(form: FormGroup): AbstractControl {
    return form.get('password2') as AbstractControl;
  }

}
