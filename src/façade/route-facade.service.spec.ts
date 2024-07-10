import { TestBed } from '@angular/core/testing';

import { RouteFacadeService } from './route-facade.service';

describe('RouteFacadeService', () => {
  let service: RouteFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
