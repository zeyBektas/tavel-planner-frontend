import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Place, Places } from '../../../models/response/places-response.model';
import { PlacesFacadeService } from '../../../façade/places-facade.service';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule],
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
})
export class PlacesComponent implements OnInit {
  placeCategory: Array<keyof Places> = [
    'Hotel',
    'Restaurant',
    'Museum',
    'Beach',
    'Trekking',
    'Entertainment',
  ];

  filteredPlaces: Places = {
    Restaurant: [],
    Museum: [],
    Hotel: [],
    Beach: [],
    Trekking: [],
    Entertainment: [],
  };

  totalPrice: number = 0;

  constructor(private placesFacade: PlacesFacadeService) {}

  ngOnInit(): void {
    this.getFilteredPlaces();
  }

  getFilteredPlaces() {
    this.filteredPlaces = this.placesFacade.getFilteredPlaces();
  }

  toggleSelection(place: Place) {
    place.isSelected = !place.isSelected;
    this.updateTotalPrice();
  }

  confirmTrip() {
    const selectedPlaces = this.getSelectedPlaces();
    const selectedPlaceIds = this.getSelectedPlaceIds();
    this.placesFacade.saveRoute(selectedPlaceIds);
  }

  getSelectedPlaces(): Places {
    const selectedPlaces: Places = {
      Restaurant: [],
      Museum: [],
      Hotel: [],
      Beach: [],
      Trekking: [],
      Entertainment: [],
    };
    for (const category of this.placeCategory) {
      if (this.filteredPlaces[category]) {
        selectedPlaces[category] = this.filteredPlaces[category].filter(
          (place: Place) => place.isSelected
        );
      }
    }
    return selectedPlaces;
  }

  getSelectedPlaceIds(): string[] {
    const selectedPlaceIds: string[] = [];
    for (const category of this.placeCategory) {
      if (this.filteredPlaces[category]) {
        this.filteredPlaces[category].forEach((place: Place) => {
          if (place.isSelected) {
            selectedPlaceIds.push(place.id);
          }
        });
      }
    }
    return selectedPlaceIds;
  }

  updateTotalPrice() {
    this.totalPrice = 0;
    for (const category of this.placeCategory) {
      if (this.filteredPlaces[category]) {
        this.filteredPlaces[category].forEach((place: Place) => {
          if (place.isSelected) {
            this.totalPrice += place.price;
          }
        });
      }
    }
  }
}
