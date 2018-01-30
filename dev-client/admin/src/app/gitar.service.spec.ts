import { TestBed, inject } from '@angular/core/testing';

import { GitarService } from './gitar.service';

describe('GitarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GitarService]
    });
  });

  it('should be created', inject([GitarService], (service: GitarService) => {
    expect(service).toBeTruthy();
  }));
});
