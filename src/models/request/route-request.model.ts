export interface RouteRequest {
  userId: string;
  userLocation: string;
  routeLocation: string;
  price: number;
  startDate: string;
  endDate: string;
  places: string[];
  participants: [
    { name: string; surname: string; email: string; gender: string },
  ];
  statusFlag?: number;
}
