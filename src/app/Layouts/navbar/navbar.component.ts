import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  isLoggedIn: boolean = false;

  logout(): void {
    localStorage.removeItem('userId');
    this.isLoggedIn = !this.isLoggedIn;
  }

  login(): void {
    this.isLoggedIn = !this.isLoggedIn;
  }
}
