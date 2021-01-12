import { TestBed } from '@angular/core/testing';

import { ChromeApiService } from './chrome-api.service';

describe('ChromeApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChromeApiService = TestBed.get(ChromeApiService);
    expect(service).toBeTruthy();
  });
});
