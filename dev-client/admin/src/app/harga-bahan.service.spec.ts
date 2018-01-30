import { TestBed, inject } from '@angular/core/testing';

import { HargaBahanService } from './harga-bahan.service';

describe('HargaBahanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HargaBahanService]
    });
  });

  it('should be created', inject([HargaBahanService], (service: HargaBahanService) => {
    expect(service).toBeTruthy();
  }));
});
