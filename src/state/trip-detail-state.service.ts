import { Injectable } from '@angular/core';
import { Places } from '../models/response/places-response.model';

@Injectable({
  providedIn: 'root'
})
export class TripDetailStateService {

  tripFilter: any;
  filteredPlaces!: any;

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
}
