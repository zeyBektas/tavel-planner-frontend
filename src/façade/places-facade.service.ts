import { Injectable } from '@angular/core';
import { PlacesApiService } from '../api/places-api.service';
import { TripPlannerRequest } from '../models/request/trip-planner-request.model';
import { Subscription } from 'rxjs';
import { TripDetailStateService } from '../state/trip-detail-state.service';
import { Router } from '@angular/router';
import { RouteRequest } from '../models/request/route-request.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesFacadeService {
  private postFilterSubscription!: Subscription;
  private postRouteSubscription!: Subscription;

  constructor(
    private placesApi: PlacesApiService,
    private tripDeatailState: TripDetailStateService,
    private router: Router
  ) {}

  async postFilterGetPlaces(data: TripPlannerRequest) {
    this.postFilterSubscription = (
      await this.placesApi.postFilterGetPlaces(data)
    ).subscribe({
      next: (places: any) => {
        this.tripDeatailState.saveFilteredPlaces(places);
        this.router.navigateByUrl('places');
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.postFilterSubscription?.unsubscribe();
      },
    });
  }

  async saveRoute(selectedPlacesIds: string[]) {
    const tripFilter = this.getTripFilter();
    const routeRequest: RouteRequest = {
      userId: localStorage.getItem('userId') || '',
      userLocation: tripFilter.departure,
      routeLocation: tripFilter.destination,
      price: 0,
      startDate: tripFilter.startDate,
      endDate: tripFilter.endDate,
      places: selectedPlacesIds,
      participants: tripFilter.people,
    };
    this.postRouteSubscription = (
      await this.placesApi.saveRoute(routeRequest)
    ).subscribe({
      next: (routeId: any) => {
        console.log('routeIDddd');
        console.log(routeId);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.postFilterSubscription?.unsubscribe();
      },
    });
  }

  saveTripFilter(tripFilter: any) {
    this.tripDeatailState.saveTripFilter(tripFilter);
  }

  getTripFilter(): any {
    return this.tripDeatailState.getTripFilter();
  }

  getFilteredPlaces(): any {
    return this.tripDeatailState.getFilteredPlaces();
  }
}
