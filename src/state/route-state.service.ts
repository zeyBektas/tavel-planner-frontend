import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteStateService {
  
  private latestRoute: any;
  private allRoutes: any;

  constructor() { }

  saveLatestRoute(latestRoute: any) {
    this.latestRoute = latestRoute;
  }

  getLatestRoute() {
    return this.latestRoute;
  }

  saveAllRoutes(allRoutes: any ) {
    this.allRoutes = allRoutes;
  }

  getAllRoutes() {
    return this.allRoutes;
  }
}
