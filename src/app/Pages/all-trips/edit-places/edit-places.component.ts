import { Component } from '@angular/core';
import { PlacesFacadeService } from '../../../../façade/places-facade.service';
import { Place, Places } from '../../../../models/response/places-response.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouteFacadeService } from '../../../../façade/route-facade.service';

@Component({
  selector: 'app-edit-places',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-places.component.html',
  styleUrl: './edit-places.component.scss'
})
export class EditPlacesComponent {

  routeId!: string;

  placeCategory: Array<keyof Places> = [
    'Hotel',
    'Restaurant',
    'Museum',
    'Beach',
    'Trekking',
    'Entertainment',
  ];

  selectedPlaces: Places = {
    Restaurant: [],
    Museum: [],
    Hotel: [],
    Beach: [],
    Trekking: [],
    Entertainment: [],
  };

  totalPrice: number = 0;

  constructor(private route: ActivatedRoute, private routeFacade: RouteFacadeService, private placesFacade: PlacesFacadeService) {}

  ngOnInit(): void {
    this.getPlacesOfRoute();
    this.routeId = this.route.snapshot.paramMap.get('id')!;
    console.log('Route ID:', this.routeId);
  }

  getPlacesOfRoute() {
    this.selectedPlaces = this.placesFacade.getFilteredPlaces();
  }

  toggleSelection(place: Place) {
    place.isSelected = !place.isSelected;
  }

}
