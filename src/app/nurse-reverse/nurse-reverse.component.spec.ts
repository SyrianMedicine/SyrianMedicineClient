import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseReverseComponent } from './nurse-reverse.component';

describe('NurseReverseComponent', () => {
  let component: NurseReverseComponent;
  let fixture: ComponentFixture<NurseReverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseReverseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseReverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
