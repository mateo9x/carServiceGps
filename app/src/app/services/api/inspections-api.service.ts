import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Inspection} from "../../models/inspection.model";

@Injectable({
  providedIn: 'root'
})
export class InspectionApiService {
  INSPECTION_URL = environment.appUrl + environment.apiPrefix + '/inspections';

  constructor(private httpClient: HttpClient) {
  }

  getInspectionsByVehicleId(vehicleId: string) {
    return this.httpClient.get<Inspection[]>(`${this.INSPECTION_URL}/vehicle/${vehicleId}`);
  }
}
