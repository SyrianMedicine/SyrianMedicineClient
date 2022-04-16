import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePostSectionComponent } from './profile-post-section.component';

describe('ProfilePostSectionComponent', () => {
  let component: ProfilePostSectionComponent;
  let fixture: ComponentFixture<ProfilePostSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePostSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePostSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
