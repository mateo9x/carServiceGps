export interface Insurance {
  id: string;
  vehicleId: string;
  dateFrom: string;
  dateTo: string;
  company: string;
  loanPartsAmount: number;
  paymentDeadlines: string[];
  assistance: boolean;
  ac: boolean;
  acProtectionTypes: string[];
}
