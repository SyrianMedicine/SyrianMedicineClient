import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveDateWithDoctorOrNurseComponent } from './reserve-date-with-doctor-or-nurse.component';

describe('ReserveDateWithDoctorOrNurseComponent', () => {
  let component: ReserveDateWithDoctorOrNurseComponent;
  let fixture: ComponentFixture<ReserveDateWithDoctorOrNurseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveDateWithDoctorOrNurseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveDateWithDoctorOrNurseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
