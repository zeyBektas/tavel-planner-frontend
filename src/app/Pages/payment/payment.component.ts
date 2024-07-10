import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentFacadeService } from '../../../façade/payment-facade.service';
import { PlacesFacadeService } from '../../../façade/places-facade.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  route!: any;
  errorMessage: string | null = null;

  constructor(private paymentFacade: PaymentFacadeService, private placesFacade: PlacesFacadeService) { }

  ngOnInit(): void {
    this.route = this.placesFacade.getLatestRoute();
    console.log('latest route');
    console.log(this.route);
  }

  paymentForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    surname: new FormControl(null, Validators.required),
    cardNo: new FormControl(null, Validators.required),
    cvv: new FormControl(null, Validators.required),
    expirationDate: new FormControl(null, Validators.required)
  });

  onSubmit() {
    if (this.paymentForm.valid) {
      console.log('Form values:', this.paymentForm.value);
      const formValues = this.paymentForm.value;
      this.paymentFacade.approvePayment({
        routeId: this.route.id,
        creditCard: {
          cardNumber: formValues.cardNo,
          userId: localStorage.getItem('userId'),
          holderName: formValues.name,
          holderSurname: formValues.surname,
          cvv: formValues.cvv,
          expirationDate: formValues.expirationDate
        }
      }, this.handleError.bind(this)); // Pass handleError as the callback
    } else {
      console.error('Form is invalid.');
    }
  }

  handleError(error: string) {
    this.errorMessage = error;
  }
}
