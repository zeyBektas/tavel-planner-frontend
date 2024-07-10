import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent {
  public companyPhone= "543 321 21 21"
  public companyEmail= "piaEmail@pia-tech.com"
  public companyAddress= "Kuruçeşme, DEÜ Kaynaklar Yerleşkesi No:22, 35390 Buca/İzmir"
  
}
