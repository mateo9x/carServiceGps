import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Vehicle} from "../../../../models/vehicle.model";

@Component({
  selector: 'vehicle-card',
  templateUrl: 'vehicle-card.component.html',
  styleUrls: ['vehicle-card.component.scss']
})
export class VehicleCardComponent {
  @Input()
  vehicle!: Vehicle;
  @Output()
  setActiveEmitter: EventEmitter<string> = new EventEmitter<string>();

  setAsActive() {
    this.setActiveEmitter.emit(this.vehicle.id);
  }
}
