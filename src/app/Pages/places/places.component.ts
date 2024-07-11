import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Place, Places } from '../../../models/response/places-response.model';
import { PlacesFacadeService } from '../../../façade/places-facade.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, FormsModule],
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

  veganOnly: boolean = false;
  totalPrice: number = 0;

  constructor(private placesFacade: PlacesFacadeService) {}

  ngOnInit(): void {
    this.getFilteredPlaces();
  }

  getFilteredPlaces() {
    const allPlaces = this.placesFacade.getFilteredPlaces();

    this.filteredPlaces.Restaurant = this.veganOnly
      ? allPlaces.Restaurant.filter((place: { isVegan: any; }) => place.isVegan)
      : allPlaces.Restaurant;

    this.filteredPlaces.Hotel = allPlaces.Hotel;
    this.filteredPlaces.Museum = allPlaces.Museum;
    this.filteredPlaces.Beach = allPlaces.Beach;
    this.filteredPlaces.Trekking = allPlaces.Trekking;
    this.filteredPlaces.Entertainment = allPlaces.Entertainment;
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
    const tripFilter = this.placesFacade.getTripFilter();
    const startDate = new Date(tripFilter.startDate);
    const endDate = new Date(tripFilter.endDate);
    const numPeople = tripFilter.numPeople;
    const duration = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

    this.totalPrice = 0;

    for (const category of this.placeCategory) {
      if (this.filteredPlaces[category]) {
        this.filteredPlaces[category].forEach((place: Place) => {
          if (place.isSelected) {
            if (category === 'Hotel') {
              this.totalPrice += place.price * duration * numPeople;
            } else {
              this.totalPrice += place.price * numPeople;
            }
          }
        });
      }
    }
  }

  onVeganFilterChange() {
    this.getFilteredPlaces();
  }
}
