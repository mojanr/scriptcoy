import { TestBed, inject } from '@angular/core/testing';

import { PesananService } from './pesanan.service';

describe('PesananService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PesananService]
    });
  });

  it('should be created', inject([PesananService], (service: PesananService) => {
    expect(service).toBeTruthy();
  }));
});
