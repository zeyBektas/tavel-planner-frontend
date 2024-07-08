import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './places.component.html',
  styleUrl: './places.component.scss',
})
export class PlacesComponent {
  placeCategory: Array<string> = [
    'Hotel',
    'Restaurant',
    'Museum',
    'Beach',
    'Trekking',
    'Entertainment',
  ];

  constructor() {}

  mockData = {
    Restaurant: [
      {
        id: '1d71843d-3e20-48cb-9919-fdb7977a42df',
        place_name: 'Mc Donalds',
        latitude: 25.1972,
        longitude: 55.2744,
        imageUrl: 'https://example.com/burj_khalifa.jpg',
        country: 'UAE',
        city: 'İzmir',
        district: 'Downtown Dubai',
        duration: '1 hours',
        price: 5000.0,
        type: 'Restaurant',
        tag: ['POPULAR', 'HISTORICAL'],
      },
    ],
    Museum: [
      {
        id: 'b81fbaf8-2ee3-4224-8875-6b71aae0b210',
        place_name: 'Saat Kulesi',
        latitude: 25.1972,
        longitude: 55.2744,
        imageUrl: 'https://example.com/burj_khalifa.jpg',
        country: 'UAE',
        city: 'İzmir',
        district: 'Downtown Dubai',
        duration: '1 hours',
        price: 15000.0,
        type: 'Museum',
        tag: ['POPULAR', 'HISTORICAL'],
      },
    ],
    Hotel: [
      {
        id: '1b9407fe-3aaa-4532-8a40-15d09b822f8a',
        place_name: 'Hilton',
        latitude: 25.1972,
        longitude: 55.2744,
        imageUrl: 'https://example.com/burj_khalifa.jpg',
        country: 'UAE',
        city: 'İzmir',
        district: 'Downtown Dubai',
        duration: '1 hours',
        price: 2000.0,
        type: 'Hotel',
        tag: ['POPULAR', 'HISTORICAL'],
      },
    ],
  };
}
