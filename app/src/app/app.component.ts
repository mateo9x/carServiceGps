import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {User} from './models/user.model';
import {Toast, ToastService} from './services/common/toast.service';
import {NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ProgressBarService} from './services/common/progress-bar.service';
import {VehicleService} from "./services/vehicle.service";
import {Vehicle} from "./models/vehicle.model";
import {Subscription} from "rxjs";
import {VehicleCoordinatesService} from "./services/vehicle-coordinates.service";
import {VehicleCoordinates} from "./models/vehicle-coordinates.model";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  user: User | null = null;
  toast: Toast | null = null;
  currentRoutingTitle: string = '';
  showProgressBar: boolean = false;
  toastButton = [
    {
      text: 'Ok',
      role: 'cancel'
    }
  ];
  trackingSubscription: Subscription = new Subscription();

  constructor(private authenticationService: AuthenticationService,
              private toastService: ToastService,
              private router: Router,
              private titleService: Title,
              private progressBarService: ProgressBarService,
              private vehicleService: VehicleService,
              private coordinatesService: VehicleCoordinatesService) {
  }

  ngOnInit() {
    this.getUser();
    this.subscribeToasts();
    this.subscribeCurrentRoutingTitle();
    this.subscribeProgressBar();
  }

  ngOnDestroy() {
    this.trackingSubscription.unsubscribe();
  }

  logout() {
    this.authenticationService.logout();
  }

  private getUser() {
    this.authenticationService.setUserOnInit();
    this.authenticationService.userLogged$.subscribe({
      next: (user) => {
        this.user = user;
        if (this.user) {
          this.getMyVehicles();
        }
      }
    });
  }

  private subscribeToasts() {
    this.toastService.toast$.subscribe({
      next: (toast) => this.toast = toast
    });
  }

  private subscribeCurrentRoutingTitle() {
    this.router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationEnd) {
          setTimeout(() => {
            const title = this.titleService.getTitle();
            this.currentRoutingTitle = title;
          }, 50);
        }
      }
    });
  }

  private subscribeProgressBar() {
    this.progressBarService.progressBar$.subscribe({
      next: (showProgressBar) => this.showProgressBar = showProgressBar
    });
  }

  private getMyVehicles() {
    this.vehicleService.getMyVehicles().subscribe({
      next: (vehicles) => {
        const vehicle = vehicles.find((vehicle) => vehicle.active);
        if (vehicle) {
          this.startTracking(vehicle);
        }
      }
    });
  }

  closeToast() {
    this.toast!.show = false;
  }

  startTracking(vehicle: Vehicle) {
    navigator.geolocation.getCurrentPosition(position => this.onSuccess(position, vehicle), null);
  }

  onSuccess = (position: any, vehicle: Vehicle) => {
    const coordinates = new VehicleCoordinates(vehicle.id!, position.coords.latitude, position.coords.longitude, new Date());
    this.coordinatesService.saveCoordinates(coordinates).subscribe();
  };

}
