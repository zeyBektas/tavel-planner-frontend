import { TestBed } from '@angular/core/testing';

import { PaymentFacadeService } from './payment-facade.service';

describe('PaymentFacadeService', () => {
  let service: PaymentFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
