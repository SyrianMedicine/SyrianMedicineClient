import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateNursesComponent } from './validate-nurses.component';

describe('ValidateNursesComponent', () => {
  let component: ValidateNursesComponent;
  let fixture: ComponentFixture<ValidateNursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateNursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateNursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
