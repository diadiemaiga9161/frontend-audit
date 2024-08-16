import { TestBed } from '@angular/core/testing';

import { AuditeService } from './audite.service';

describe('AuditeService', () => {
  let service: AuditeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
