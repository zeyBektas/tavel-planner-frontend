export interface RouteRequest {
  userId: string;
  departure: string;
  destination: string;
  price: number;
  startDate: string;
  endDate: string;
  places: string[];
  participants: [
    { name: string; surname: string; email: string; gender: string },
  ];
  statusFlag?: number;
}
