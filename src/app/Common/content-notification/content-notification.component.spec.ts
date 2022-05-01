import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentNotificationComponent } from './content-notification.component';

describe('ContentNotificationComponent', () => {
  let component: ContentNotificationComponent;
  let fixture: ComponentFixture<ContentNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
