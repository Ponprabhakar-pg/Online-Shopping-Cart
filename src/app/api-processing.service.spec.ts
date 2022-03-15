import { TestBed } from '@angular/core/testing';

import { ApiProcessingService } from './api-processing.service';

describe('ApiProcessingService', () => {
  let service: ApiProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
