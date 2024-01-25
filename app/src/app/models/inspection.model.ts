export interface Inspection {
  id: string;
  vehicleId: string;
  date: string;
  oilChanged: boolean;
  oilFilterChanged: boolean;
  oilType: string;
  fuelFilterChanged: boolean;
  sparkPlugChanged: boolean;
  airFilterChanged: boolean;
  cabinFilterChanged: boolean;
  additionalInfo: string;
  currentMileage: number;
  nextServiceMileage: number;
}
