import { TestBed } from '@angular/core/testing';

import { TripDetailStateService } from './trip-detail-state.service';

describe('TripDetailStateService', () => {
  let service: TripDetailStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripDetailStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
