import { Injectable } from '@angular/core';
import { Places } from '../models/response/places-response.model';

@Injectable({
  providedIn: 'root'
})
export class TripDetailStateService {

  private tripFilter: any;
  private filteredPlaces!: any;
  private latestRoute: any;

  constructor() { }

  saveTripFilter(tripFilter: any) {
    this.tripFilter = tripFilter;
  }

  getTripFilter() {
    return this.tripFilter;
  }

  saveFilteredPlaces(filteredPlaces: any) {
    this.filteredPlaces = filteredPlaces;
  }

  getFilteredPlaces() {
    return this.filteredPlaces;
  }

  saveLatestRoute(latestRoute: any) {
    this.latestRoute = latestRoute;
  }

  getLatestRoute() {
    return this.latestRoute;
  }
}
