import { TestBed } from '@angular/core/testing';

import { SyrianMedSnakBarService } from './syrian-med-snak-bar.service';

describe('SyrianMedSnakBarService', () => {
  let service: SyrianMedSnakBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyrianMedSnakBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
