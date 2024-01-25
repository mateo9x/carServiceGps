import {Component, OnInit} from '@angular/core';
import {Vehicle} from "../../../models/vehicle.model";
import {VehicleService} from "../../../services/vehicle.service";
import {Inspection} from "../../../models/inspection.model";
import {InspectionService} from "../../../services/inspection.service";

@Component({
  selector: 'my-inspections',
  templateUrl: 'my-inspections.page.html',
  styleUrls: ['my-inspections.page.scss']
})
export class MyInspectionsPage implements OnInit {
  inspections: Inspection[] = [];
  vehicles: Vehicle[] = [];
  selectedVehicleId: string | null = null;

  constructor(private inspectionService: InspectionService,
              private vehicleService: VehicleService) {
  }

  ngOnInit() {
    this.getMyVehicles();
  }

  getInspectionsForVehicle(vehicleId: string) {
    this.selectedVehicleId = vehicleId;
    this.inspectionService.getInspectionsByVehicleId(vehicleId).subscribe({
      next: (inspections) => this.inspections = inspections,
      error: () => this.inspections = []
    });
  }

  private getMyVehicles() {
    this.vehicleService.getMyVehicles().subscribe({
      next: (vehicles) => this.vehicles = vehicles,
      error: () => this.vehicles = []
    });
  }
}
