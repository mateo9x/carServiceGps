import {Injectable} from "@angular/core";
import {VehicleCoordinates} from "../models/vehicle-coordinates.model";
import {VehicleCoordinatesApiService} from "./api/vehicle-coordinates-api.service";

@Injectable({
  providedIn: 'root'
})
export class VehicleCoordinatesService {
  constructor(private apiService: VehicleCoordinatesApiService) {
  }

  saveCoordinates(coordinates: VehicleCoordinates) {
    return this.apiService.saveCoordinates(coordinates);
  }
}
