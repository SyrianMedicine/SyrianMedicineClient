import { TestBed } from '@angular/core/testing';

import { ReserveDoctorOrNurseService } from './reserve-doctor-or-nurse.service';

describe('ReserveDoctorOrNurseService', () => {
  let service: ReserveDoctorOrNurseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReserveDoctorOrNurseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
