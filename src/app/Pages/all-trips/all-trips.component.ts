import { Component } from '@angular/core';


@Component({
  selector: 'app-all-trips',
  standalone: true,
  imports: [],
  templateUrl: './all-trips.component.html',
  styleUrl: './all-trips.component.scss'
})
export class AllTripsComponent {

  openPopup() {
    alert("Popup");
  }
}

