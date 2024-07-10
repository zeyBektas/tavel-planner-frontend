import { Component } from '@angular/core';
import { ContactCardComponent } from "../contact-card/contact-card.component";
import { MapCardComponent } from "../map-card/map-card.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactCardComponent, MapCardComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
