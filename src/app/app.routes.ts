import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { LandingComponent } from './Pages/landing/landing.component';
import { TripPlannerComponent } from './Pages/trip-planner/trip-planner.component';
import { PlacesComponent } from './Pages/places/places.component';
import { AllTripsComponent } from './Pages/all-trips/all-trips.component';
import { PaymentComponent } from './Pages/payment/payment.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'landing', component: LandingComponent },
    { path: 'trip-planner', component: TripPlannerComponent},
    { path: 'places', component: PlacesComponent },
    { path: 'all-trips', component: AllTripsComponent },
    { path: 'payment', component: PaymentComponent }
];