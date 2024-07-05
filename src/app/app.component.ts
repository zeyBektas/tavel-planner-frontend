
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "./Layouts/navbar/navbar.component";
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AuthFacadeService } from '../façade/auth-facade.service';
import { CommonModule, NgClass } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, NavbarComponent, HttpClientModule,  RouterLink, RouterLinkActive, FormsModule, NgbDatepickerModule, NgClass, ReactiveFormsModule],
    providers: [AuthInterceptorProvider]
})
export class AppComponent implements OnInit{

  title = 'travel-planner-frontend';

  isLoginPage?: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    provideHttpClient(withFetch());
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/login';
      }
    });
  }  
}
