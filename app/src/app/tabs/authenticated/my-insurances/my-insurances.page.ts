import {Component, OnInit} from '@angular/core';
import {Insurance} from "../../../models/insurance.model";
import {InsuranceService} from "../../../services/insurance.service";
import {Vehicle} from "../../../models/vehicle.model";
import {VehicleService} from "../../../services/vehicle.service";

@Component({
  selector: 'my-insurances',
  templateUrl: 'my-insurances.page.html',
  styleUrls: ['my-insurances.page.scss']
})
export class MyInsurancesPage implements OnInit {
  insurances: Insurance[] = [];
  vehicles: Vehicle[] = [];
  selectedVehicleId: string | null = null;

  constructor(private insuranceService: InsuranceService,
              private vehicleService: VehicleService) {
  }

  ngOnInit() {
    this.getMyVehicles();
  }

  getInsuranceForVehicle(vehicleId: string) {
    this.selectedVehicleId = vehicleId;
    this.insuranceService.getInsurancesByVehicleId(vehicleId).subscribe({
      next: (insurances) => this.insurances = insurances,
      error: () => this.insurances = []
    });
  }

  private getMyVehicles() {
    this.vehicleService.getMyVehicles().subscribe({
      next: (vehicles) => this.vehicles = vehicles,
      error: () => this.vehicles = []
    });
  }
}
