import { TestBed, inject } from '@angular/core/testing';

import { HttpResponseService } from './http-response.service';

describe('HttpResponseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpResponseService]
    });
  });

  it('should be created', inject([HttpResponseService], (service: HttpResponseService) => {
    expect(service).toBeTruthy();
  }));
});
