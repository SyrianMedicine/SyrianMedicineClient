import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalreserveComponent } from './hospitalreserve.component';

describe('HospitalreserveComponent', () => {
  let component: HospitalreserveComponent;
  let fixture: ComponentFixture<HospitalreserveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalreserveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalreserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
