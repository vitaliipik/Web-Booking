import { TestBed } from '@angular/core/testing';

import { FeatureGuard } from './feature.guard';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('FeatureGuard', () => {
  let guard: FeatureGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

    });
    guard = TestBed.inject(FeatureGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
