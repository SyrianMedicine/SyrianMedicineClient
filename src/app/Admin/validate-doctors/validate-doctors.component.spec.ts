import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateDoctorsComponent } from './validate-doctors.component';

describe('ValidateDoctorsComponent', () => {
  let component: ValidateDoctorsComponent;
  let fixture: ComponentFixture<ValidateDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateDoctorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
