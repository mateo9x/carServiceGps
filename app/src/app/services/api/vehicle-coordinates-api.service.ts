import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {VehicleCoordinates} from "../../models/vehicle-coordinates.model";

@Injectable({
  providedIn: 'root'
})
export class VehicleCoordinatesApiService {
  VEHICLE_COORDINATES_URL = environment.appUrl + environment.apiPrefix + '/vehicle-coordinates';

  constructor(private httpClient: HttpClient) {
  }

  saveCoordinates(coordinates: VehicleCoordinates) {
    return this.httpClient.post<VehicleCoordinates>(this.VEHICLE_COORDINATES_URL, coordinates);
  }
}
