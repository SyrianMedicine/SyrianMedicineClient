import { TestBed } from '@angular/core/testing';

import { SickService } from './sick.service';

describe('SickService', () => {
  let service: SickService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SickService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
