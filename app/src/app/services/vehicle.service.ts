import {Injectable} from "@angular/core";
import {VehicleApiService} from "./api/vehicle-api.service";
import {Vehicle} from "../models/vehicle.model";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private apiService: VehicleApiService) {
  }

  updateVehicle(vehicle: Vehicle) {
    return this.apiService.updateVehicle(vehicle);
  }

  getMyVehicles() {
    return this.apiService.getMyVehicles();
  }

  setVehicleAsActive(vehicleId: string) {
    return this.apiService.setVehicleAsActive(vehicleId);
  }
}
