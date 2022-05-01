import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalNotificationComponent } from './external-notification.component';

describe('ExternalNotificationComponent', () => {
  let component: ExternalNotificationComponent;
  let fixture: ComponentFixture<ExternalNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
