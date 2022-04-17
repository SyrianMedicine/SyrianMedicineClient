import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePassowrdComponent } from './update-passowrd.component';

describe('UpdatePassowrdComponent', () => {
  let component: UpdatePassowrdComponent;
  let fixture: ComponentFixture<UpdatePassowrdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePassowrdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePassowrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
