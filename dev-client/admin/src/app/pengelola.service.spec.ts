import { TestBed, inject } from '@angular/core/testing';

import { PengelolaService } from './pengelola.service';

describe('PengelolaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PengelolaService]
    });
  });

  it('should be created', inject([PengelolaService], (service: PengelolaService) => {
    expect(service).toBeTruthy();
  }));
});
