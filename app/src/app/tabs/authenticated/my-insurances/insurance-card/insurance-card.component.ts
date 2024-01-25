import {Component, Input} from '@angular/core';
import {Insurance} from "../../../../models/insurance.model";

@Component({
  selector: 'insurance-card',
  templateUrl: 'insurance-card.component.html',
  styleUrls: ['insurance-card.component.scss']
})
export class InsuranceCardComponent {
  @Input()
  insurance!: Insurance;

  getBooleanValue(value: boolean) {
    return value ? 'TAK' : 'NIE';
  }
}
