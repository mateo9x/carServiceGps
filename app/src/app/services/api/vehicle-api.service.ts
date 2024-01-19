import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Vehicle} from "../../models/vehicle.model";

@Injectable({
  providedIn: 'root'
})
export class VehicleApiService {
  VEHICLE_URL = environment.appUrl + environment.apiPrefix + '/vehicles';

  constructor(private httpClient: HttpClient) {
  }

  updateVehicle(vehicle: Vehicle) {
    return this.httpClient.put<Vehicle>(this.VEHICLE_URL, vehicle);
  }

  getMyVehicles() {
    return this.httpClient.get<Vehicle[]>(`${this.VEHICLE_URL}/my-vehicles`);
  }

  setVehicleAsActive(vehicleId: string) {
    return this.httpClient.patch<void>(`${this.VEHICLE_URL}/${vehicleId}/set-active`, {});
  }
}
