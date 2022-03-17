import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule } from '@angular/common/http';
import { ApiProcessingService } from './api-processing.service';

describe('ApiProcessingService', () => {
  let service: ApiProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule], 
    });
    service = TestBed.inject(ApiProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
