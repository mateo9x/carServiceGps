import {Component, OnInit} from '@angular/core';
import {Vehicle} from "../../../models/vehicle.model";
import {VehicleService} from "../../../services/vehicle.service";
import {Expension} from "../../../models/expension.model";
import {ExpensionService} from "../../../services/expension.service";

@Component({
  selector: 'my-expenses',
  templateUrl: 'my-expenses.page.html',
  styleUrls: ['my-expenses.page.scss']
})
export class MyExpensesPage implements OnInit {
  expenses: Expension[] = [];
  vehicles: Vehicle[] = [];
  selectedVehicleId: string | null = null;

constructor(private expensionService: ExpensionService,
              private vehicleService: VehicleService) {
  }

  ngOnInit() {
    this.getMyVehicles();
  }

  getExpensesForVehicle(vehicleId: string) {
    this.selectedVehicleId = vehicleId;
    this.expensionService.getExpensesByVehicleId(vehicleId).subscribe({
      next: (expenses) => this.expenses = expenses,
      error: () => this.expenses = []
    });
  }

  private getMyVehicles() {
    this.vehicleService.getMyVehicles().subscribe({
      next: (vehicles) => this.vehicles = vehicles,
      error: () => this.vehicles = []
    });
  }
}
