import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {

  paymentForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    surname: new FormControl(null, Validators.required),
    cardNo: new FormControl(null, Validators.required),
    cvv: new FormControl(null, Validators.required),
  });


  onSubmit() {
    if (this.paymentForm.valid) {
      console.log('Form values:', this.paymentForm.value);
    } else {
      console.error('Form is invalid.');
    }
  }
 
}
