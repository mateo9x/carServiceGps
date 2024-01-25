import {Injectable} from '@angular/core';
import {ExpensionApiService} from './api/expense-api.service';

@Injectable({
  providedIn: 'root'
})
export class ExpensionService {
  constructor(private apiService: ExpensionApiService) {
  }
  getExpensesByVehicleId(id: string) {
    return this.apiService.getExpensesByVehicleId(id);
  }
}
