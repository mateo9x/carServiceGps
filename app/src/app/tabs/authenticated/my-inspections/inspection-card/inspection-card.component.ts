import {Component, Input} from '@angular/core';
import {Inspection} from "../../../../models/inspection.model";

@Component({
  selector: 'inspection-card',
  templateUrl: 'inspection-card.component.html',
  styleUrls: ['inspection-card.component.scss']
})
export class InspectionCardComponent {
  @Input()
  inspection!: Inspection;

  getBooleanValue(value: boolean) {
    return value ? 'TAK' : 'NIE';
  }
}
