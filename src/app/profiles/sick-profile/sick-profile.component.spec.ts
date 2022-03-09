import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SickProfileComponent } from './sick-profile.component';

describe('SickProfileComponent', () => {
  let component: SickProfileComponent;
  let fixture: ComponentFixture<SickProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SickProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SickProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
