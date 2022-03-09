import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseProfileComponent } from './nurse-profile.component';

describe('NurseProfileComponent', () => {
  let component: NurseProfileComponent;
  let fixture: ComponentFixture<NurseProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
