import { Component, inject } from '@angular/core';
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
  
  routeFacadeService = inject(RouteFacadeService);

  constructor(private route: ActivatedRoute, private placesFacade: PlacesFacadeService, private routeFacade: RouteFacadeService) {}

  ngOnInit(): void {
    this.routeId = this.route.snapshot.paramMap.get('id')!;
    this.getPlacesOfRoute();
  }

  getPlacesOfRoute() {
    console.log('userRoutes');
    console.log(this.routeFacade.userRoutes);
  }

  toggleSelection(place: Place) {
    place.isSelected = !place.isSelected;
  }

  onDeletePlace() {
    
  }

}
