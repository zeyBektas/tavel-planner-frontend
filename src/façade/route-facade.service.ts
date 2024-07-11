import { Injectable, signal, Signal } from '@angular/core';
import { RouteApiService } from '../api/route-api.service';
import { Subscription } from 'rxjs';
import { RouteStateService } from '../state/route-state.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RouteFacadeService {

  userRoutes: any =  signal(0);

  private getAllRoutesSubscription!: Subscription;
  private cancelRouteSubscription!: Subscription;

  constructor(private routeApi: RouteApiService, private routeState: RouteStateService) { }

  getAllRoutes(userId: string) {
    this.getAllRoutesSubscription = this.routeApi.getAllRoutes(userId).subscribe({
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
      }
    });
  }

  cancelRoute(routeId: string) {
    return this.routeApi.cancelRoute(routeId);
  }

  getAllRoutesFromState() {
    this.routeState.getAllRoutes();
  }
}
