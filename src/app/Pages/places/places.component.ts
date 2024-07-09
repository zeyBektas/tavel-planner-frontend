import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Place } from '../../../models/response/places-response.model';
import { ApiService } from '../../../api/api.service';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './places.component.html',
  styleUrl: './places.component.scss',
})
export class PlacesComponent implements OnInit {
  placeCategory: Array<string> = [
    'Hotel',
    'Restaurant',
    'Museum',
    'Beach',
    'Trekking',
    'Entertainment',
  ];

  apiPlaces: any;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getDeneme();
  }

  async getDeneme() {
    (await this.api.post(`plan/getPlacesByCityAndTags`, {
      tags: ["HISTORICAL"],
      city: "Ankara"
    })).subscribe({
      next: (response: any) => {
        this.apiPlaces = this.addIsSelectedField(response);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {}
    });
  }

  addIsSelectedField(data: any) {
    const updatedData: any = {};
    for (const category in data) {
      if (data.hasOwnProperty(category)) {
        updatedData[category] = data[category].map((place: Place) => ({
          ...place,
          isSelected: false
        }));
      }
    }
    return updatedData;
  }

  toggleSelection(place: Place) {
    place.isSelected = !place.isSelected;
  }
}
