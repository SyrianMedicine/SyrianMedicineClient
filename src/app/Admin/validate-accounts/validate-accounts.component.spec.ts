import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateAccountsComponent } from './validate-accounts.component';

describe('ValidateAccountsComponent', () => {
  let component: ValidateAccountsComponent;
  let fixture: ComponentFixture<ValidateAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
