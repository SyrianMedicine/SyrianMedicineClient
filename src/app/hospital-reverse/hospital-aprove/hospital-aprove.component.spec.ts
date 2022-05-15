import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalAproveComponent } from './hospital-aprove.component';

describe('DialogMessageComponent', () => {
  let component: HospitalAproveComponent;
  let fixture: ComponentFixture<HospitalAproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalAproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalAproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
