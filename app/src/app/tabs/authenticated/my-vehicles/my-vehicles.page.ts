import {Component, OnInit} from '@angular/core';
import {VehicleService} from "../../../services/vehicle.service";
import {Vehicle} from "../../../models/vehicle.model";
import {ToastService, ToastType} from "../../../services/common/toast.service";

@Component({
  selector: 'my-vehicles',
  templateUrl: 'my-vehicles.page.html',
  styleUrls: ['my-vehicles.page.scss']
})
export class MyVehiclesPage implements OnInit {
  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.getMyVehicles();
  }

  private getMyVehicles() {
    this.vehicleService.getMyVehicles().subscribe({
      next: (vehicles) => this.vehicles = vehicles
    });
  }

  setVehicleAsActive(vehicleId: string) {
    this.vehicleService.setVehicleAsActive(vehicleId).subscribe({
      next: () => {
        this.getMyVehicles();
        this.toastService.showToast('Pojazd wybrany jako aktywny', ToastType.SUCCESS);
      },
      error: () => this.toastService.showToast('Nie udało ustawić się pojazdu jako aktywny', ToastType.ERROR)
    });
  }
}
