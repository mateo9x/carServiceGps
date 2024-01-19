export class VehicleCoordinates {
  vehicleId: string;
  latitude: number;
  longitude: number;
  time: Date;

  constructor(vehicleId: string, latitude: number, longitude: number, time: Date) {
    this.vehicleId = vehicleId;
    this.latitude = latitude;
    this.longitude = longitude;
    this.time = time;
  }
}
