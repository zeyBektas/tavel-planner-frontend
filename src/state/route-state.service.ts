import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteStateService {
  
  private latestRoute: any;

  constructor() { }

  saveLatestRoute(latestRoute: any) {
    this.latestRoute = latestRoute;
  }

  getLatestRoute() {
    return this.latestRoute;
  }
}
