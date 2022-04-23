import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalReverseComponent } from './hospital-reverse.component';

describe('HospitalReverseComponent', () => {
  let component: HospitalReverseComponent;
  let fixture: ComponentFixture<HospitalReverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalReverseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalReverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
