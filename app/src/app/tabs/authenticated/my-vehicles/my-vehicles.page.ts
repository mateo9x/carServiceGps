import {Component, OnInit} from '@angular/core';
import {VehicleService} from "../../../services/vehicle.service";
import {Vehicle} from "../../../models/vehicle.model";
import {ToastService, ToastType} from "../../../services/common/toast.service";
import {Dialog} from "@capacitor/dialog";

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

  async setVehicleAsActive(vehicleId: string) {
    const dialog = await Dialog.confirm({
      title: 'Potwierdź',
      message: 'Czy na pewno chcesz ustawić wybrany pojazd jako aktywny?',
      okButtonTitle: 'Tak',
      cancelButtonTitle: 'Nie'
    });
    if (dialog.value) {
      this.vehicleService.setVehicleAsActive(vehicleId).subscribe({
        next: () => {
          this.getMyVehicles();
          this.toastService.showToast('Pojazd wybrany jako aktywny', ToastType.SUCCESS);
        },
        error: () => this.toastService.showToast('Nie udało ustawić się pojazdu jako aktywny', ToastType.ERROR)
      });
    }
  }
}
