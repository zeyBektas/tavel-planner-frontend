import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { LandingComponent } from './Pages/landing/landing.component';
import { TripPlannerComponent } from './Pages/trip-planner/trip-planner.component';
import { PlacesComponent } from './Pages/places/places.component';
import { AboutUsComponent } from './Pages/about-us/about-us.component';
import { AllTripsComponent } from './Pages/all-trips/all-trips.component';
import { PaymentComponent } from './Pages/payment/payment.component';
import { ContactComponent } from './Pages/contact/contact-page/contact.component';
import { PlanComponent } from './Pages/plan/plan.component';
import { AdminPanelComponent } from './Pages/admin-panel/admin-panel.component';
import { EditPlacesComponent } from './Pages/edit-places/edit-places.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'trip-planner', component: TripPlannerComponent, canActivate: [authGuard]},
  { path: 'all-trips', component: AllTripsComponent, canActivate: [authGuard] },
  { path: 'edit-route/:id', component: EditPlacesComponent, canActivate: [authGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [authGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [authGuard] },
  { path: 'places', component: PlacesComponent, canActivate: [authGuard] },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'plan', component: PlanComponent },
  { path: 'admin-panel', component: AdminPanelComponent },
];
