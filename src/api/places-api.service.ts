import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { TripPlannerRequest } from '../models/request/trip-planner-request.model';
import { RouteRequest } from '../models/request/route-request.model';

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
}
