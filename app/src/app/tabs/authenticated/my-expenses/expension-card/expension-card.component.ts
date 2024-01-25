import {Component, Input} from '@angular/core';
import {Expension} from "../../../../models/expension.model";

@Component({
  selector: 'expension-card',
  templateUrl: 'expension-card.component.html',
  styleUrls: ['expension-card.component.scss']
})
export class ExpensionCardComponent {
  @Input()
  expension!: Expension;

  getBooleanValue(value: boolean) {
    return value ? 'TAK' : 'NIE';
  }
}
