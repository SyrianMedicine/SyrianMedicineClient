import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorReverseComponent } from './doctor-reverse.component';

describe('DoctorReverseComponent', () => {
  let component: DoctorReverseComponent;
  let fixture: ComponentFixture<DoctorReverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorReverseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorReverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
