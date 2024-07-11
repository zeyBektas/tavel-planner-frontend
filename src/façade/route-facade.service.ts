import { Injectable, signal, Signal } from '@angular/core';
import { RouteApiService } from '../api/route-api.service';
import { Subscription } from 'rxjs';
import { RouteStateService } from '../state/route-state.service';
import { environment } from '../environments/environment';
import { CancelPlaceRoute } from '../models/request/cancel-place-route-request.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouteFacadeService {
  userRoutes: any = signal(0);
  routePlaceList!: string[];

  private getAllRoutesSubscription!: Subscription;
  private cancelRouteSubscription!: Subscription;
  private deletePlaceFromRouteSubscription!: Subscription;

  constructor(
    private routeApi: RouteApiService,
    private routeState: RouteStateService,
    private router: Router
  ) {}

  getAllRoutes(userId: string) {
    this.getAllRoutesSubscription = this.routeApi
      .getAllRoutes(userId)
      .subscribe({
        next: (allRoutes: any) => {
          console.log(allRoutes);
          this.userRoutes.set(allRoutes);
          console.log(this.userRoutes());
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.getAllRoutesSubscription?.unsubscribe();
        },
      });
  }

  cancelRoute(routeId: string) {
    return this.routeApi.cancelRoute(routeId);
  }

  getAllRoutesFromState() {
    this.routeState.getAllRoutes();
  }

  deletePlaceFromRoute(data: CancelPlaceRoute) {
    this.deletePlaceFromRouteSubscription = this.routeApi
      .cancelPlaceFromRoute(data)
      .subscribe({
        next: (response) => {
          console.log('delete place response');
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.deletePlaceFromRouteSubscription?.unsubscribe();
        },
      });
  }

  getRoutePlaceList(routeId: string) {
    this.routeApi.getRoutePlaceList(routeId).subscribe({
      next: (placeList: string[]) => {
        console.log('places list');
        console.log(placeList);
        this.routePlaceList = placeList;
        this.router.navigate(['/edit-route', routeId]);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.deletePlaceFromRouteSubscription?.unsubscribe();
      },
    });
  }
}
