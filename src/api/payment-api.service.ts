import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentApiService {

  constructor(private api: ApiService) { }

  approvePayment(data: any) {
    return this.api.post(`payment/approvePayment`, data);
  }
}
