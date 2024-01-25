import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Insurance} from "../../models/insurance.model";

@Injectable({
  providedIn: 'root'
})
export class InsuranceApiService {
  INSURANCE_URL = environment.appUrl + environment.apiPrefix + '/insurances';

  constructor(private httpClient: HttpClient) {
  }

  getInsurancesByVehicleId(vehicleId: string) {
    return this.httpClient.get<Insurance[]>(`${this.INSURANCE_URL}/vehicle/${vehicleId}`);
  }
}
