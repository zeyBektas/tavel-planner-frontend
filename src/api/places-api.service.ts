import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { TripPlannerRequest } from '../models/request/trip-planner-request.model';
import { RouteRequest } from '../models/request/route-request.model';
import { Place } from '../models/response/places-response.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesApiService {

  constructor(private api: ApiService) { }

  postFilterGetPlaces(data: TripPlannerRequest) {
    return this.api.post(`place/filterPlace`, data);
  }

  saveRoute(data: RouteRequest) {
    return this.api.post(`route/saveRoute`, data);
  }

  getPlaceById(placeId: string) {
    return this.api.get(`place/getPlace/${placeId}`);
  }

  savePlace(place: Place) {
    return this.api.post(`place/savePlace`, place);
  }
}
