import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateHospitalsComponent } from './validate-hospitals.component';

describe('ValidateHospitalsComponent', () => {
  let component: ValidateHospitalsComponent;
  let fixture: ComponentFixture<ValidateHospitalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateHospitalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateHospitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
