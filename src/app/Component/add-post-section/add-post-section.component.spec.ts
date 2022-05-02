import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostSectionComponent } from './add-post-section.component';

describe('AddPostSectionComponent', () => {
  let component: AddPostSectionComponent;
  let fixture: ComponentFixture<AddPostSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPostSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
