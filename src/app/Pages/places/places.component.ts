import { Component } from '@angular/core';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [],
  templateUrl: './places.component.html',
  styleUrl: './places.component.scss'
})
export class PlacesComponent {

  placeCategory: Array<string> = ['Hotels', 'Restaurants', 'Museums', 'Beaches', 'Trekking', 'Entertainment'];

  constructor() { }

}
