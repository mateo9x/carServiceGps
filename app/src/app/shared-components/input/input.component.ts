import {Component, Input} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.scss']
})
export class InputComponent {
  @Input()
  label!: string;
  @Input()
  inputType: string = 'text';
  @Input()
  controlName!: string;
  @Input()
  parent!: FormGroup;
  @Input()
  clearOnEdit: boolean = true;
  @Input()
  errors: any[] = [];

  hasFormError(controlName: string, errorName: string) {
    const control = this.parent.get(controlName) as AbstractControl;
    return control.touched && control.hasError(errorName);
  }

}
