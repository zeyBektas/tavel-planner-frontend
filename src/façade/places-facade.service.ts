import { Injectable } from '@angular/core';
import { PlacesApiService } from '../api/places-api.service';
import { TripPlannerRequest } from '../models/request/trip-planner-request.model';
import { Subscription } from 'rxjs';
import { TripDetailStateService } from '../state/trip-detail-state.service';
import { Router } from '@angular/router';
import { RouteRequest } from '../models/request/route-request.model';
import { RouteStateService } from '../state/route-state.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesFacadeService {
  private postFilterSubscription!: Subscription;
  private postRouteSubscription!: Subscription;

  constructor(
    private placesApi: PlacesApiService,
    private tripDetailState: TripDetailStateService,
    private routeState: RouteStateService,
    private router: Router
  ) {}

  async postFilterGetPlaces(data: TripPlannerRequest) {
    console.log('sende da');
    console.log(data);
    this.postFilterSubscription = (
      await this.placesApi.postFilterGetPlaces(data)
    ).subscribe({
      next: (places: any) => {
        this.tripDetailState.saveFilteredPlaces(places);
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
    console.log('trip filter');
    console.log(tripFilter);
    const routeRequest: RouteRequest = {
      userId: localStorage.getItem('userId') || '',
      departure: tripFilter.from,
      destination: tripFilter.to,
      price: 0,
      startDate: tripFilter.startDate,
      endDate: tripFilter.endDate,
      places: selectedPlacesIds,
      participants: tripFilter.people,
    };

    console.log('en son');
    console.log(routeRequest);

    this.postRouteSubscription = (
      await this.placesApi.saveRoute(routeRequest)
    ).subscribe({
      next: (route: any) => {
        console.log('routeIDddd');
        console.log(route);
        this.routeState.saveLatestRoute(route);

        this.router.navigateByUrl('payment');
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.postRouteSubscription?.unsubscribe();
      },
    });
  }

  saveTripFilter(tripFilter: any) {
    this.tripDetailState.saveTripFilter(tripFilter);
  }

  getTripFilter(): any {
    return this.tripDetailState.getTripFilter();
  }

  getFilteredPlaces(): any {
    return this.tripDetailState.getFilteredPlaces();
  }

  getLatestRoute(): any {
    return this.routeState.getLatestRoute();
  }
}
