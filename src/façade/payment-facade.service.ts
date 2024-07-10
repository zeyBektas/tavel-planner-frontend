import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaymentApiService } from '../api/payment-api.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentFacadeService {

  private paySubscription!: Subscription;

  constructor(private paymentApi: PaymentApiService, private router: Router) { }

  async approvePayment(data: any, errorCallback: (error: string) => void) {
    console.log('payment send data');
    console.log(data);
    this.paySubscription = (await this.paymentApi.approvePayment(data)).subscribe({
      next: (response: any) => {
        console.log('payment response');
        console.log(response);
        this.router.navigateByUrl('/');
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        errorCallback(error.error); // Pass the error message to the callback
      },
      complete: () => {
        this.paySubscription?.unsubscribe();
      },
    });
  } 
}
