import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should have initial loading state as false', () => {
    expect(service.loading).toBe(false);
  });

  it('should set loading state to true', () => {
    service.loading = true;
    expect(service.loading).toBe(true);
  });

  it('should set loading state to false', () => {
    service.loading = true;
    service.loading = false;
    expect(service.loading).toBe(false);
  });
});
