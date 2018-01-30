import { TestBed, inject } from '@angular/core/testing';

import { BahanService } from './bahan.service';

describe('BahanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BahanService]
    });
  });

  it('should be created', inject([BahanService], (service: BahanService) => {
    expect(service).toBeTruthy();
  }));
});
