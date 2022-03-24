import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommentComponent } from './user-comment.component';

describe('UserCommentComponent', () => {
  let component: UserCommentComponent;
  let fixture: ComponentFixture<UserCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
