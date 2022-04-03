import { TestBed } from '@angular/core/testing';

import { ReserveHospitalService } from './reserve-hospital.service';

describe('ReserveHospitalService', () => {
  let service: ReserveHospitalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReserveHospitalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
