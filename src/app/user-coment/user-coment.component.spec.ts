import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComentComponent } from './user-coment.component';

describe('UserComentComponent', () => {
  let component: UserComentComponent;
  let fixture: ComponentFixture<UserComentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
