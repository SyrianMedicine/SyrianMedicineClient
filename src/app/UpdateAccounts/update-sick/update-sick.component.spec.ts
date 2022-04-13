import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSickComponent } from './update-sick.component';

describe('UpdateSickComponent', () => {
  let component: UpdateSickComponent;
  let fixture: ComponentFixture<UpdateSickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSickComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
