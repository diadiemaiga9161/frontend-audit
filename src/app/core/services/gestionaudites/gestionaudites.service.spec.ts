import { TestBed } from '@angular/core/testing';

import { GestionauditesService } from './gestionaudites.service';

describe('GestionauditesService', () => {
  let service: GestionauditesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionauditesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
