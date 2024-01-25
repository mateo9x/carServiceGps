import {Injectable} from "@angular/core";
import {InspectionApiService} from "./api/inspections-api.service";

@Injectable({
  providedIn: 'root'
})
export class InspectionService {
  constructor(private apiService: InspectionApiService) {
  }

  getInspectionsByVehicleId(id: string) {
    return this.apiService.getInspectionsByVehicleId(id);
  }
}
