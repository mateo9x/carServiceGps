import {Injectable} from "@angular/core";
import {InsuranceApiService} from "./api/insurance-api.service";

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  constructor(private apiService: InsuranceApiService) {
  }

  getInsurancesByVehicleId(id: string) {
    return this.apiService.getInsurancesByVehicleId(id);
  }
}
