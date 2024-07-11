import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { CancelPlaceRoute } from '../models/request/cancel-place-route-request.model';

@Injectable({
  providedIn: 'root'
})
export class RouteApiService {

  constructor(private http: HttpClient) { }

  getAllRoutes(userId: string): Observable<any> {
    return this.http.get(`${environment.BASE_URL}route/getRoutes/${userId}`);
  }

  cancelRoute(routeId: string): Observable<any> {
    let params = new HttpParams();
    if(routeId) {
      params = params.set('routeId', routeId);
    }

    return this.http.post(`${environment.BASE_URL}route/cancelRoute`, routeId, {
      params: params,
    });
  }

  cancelPlaceFromRoute(data: CancelPlaceRoute): Observable<any> {
    return this.http.post(`${environment.BASE_URL}route/cancelPlace`, data);
  }

  getRoutePlaceList(routeId: string): Observable<any> {
    return this.http.get(`${environment.BASE_URL}route/getRoutePlaceList/${routeId}`)
  }

}  
