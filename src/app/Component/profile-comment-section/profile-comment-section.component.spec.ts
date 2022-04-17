import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCommentSectionComponent } from './profile-comment-section.component';

describe('ProfileCommentSectionComponent', () => {
  let component: ProfileCommentSectionComponent;
  let fixture: ComponentFixture<ProfileCommentSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCommentSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCommentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
