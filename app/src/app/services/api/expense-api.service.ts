import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Expension} from '../../models/expension.model';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExpensionApiService {
  EXPENSE_URL = environment.appUrl + environment.apiPrefix + '/expenses';

  constructor(private httpClient: HttpClient) {
  }

  getExpensesByVehicleId(vehicleId: string) {
    return this.httpClient.get<Expension[]>(`${this.EXPENSE_URL}/vehicle/${vehicleId}`);
  }
}
