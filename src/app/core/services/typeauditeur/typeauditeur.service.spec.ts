import { TestBed } from '@angular/core/testing';
import { TypeauditeurService } from './typeauditeur.service';

// import { TypeauditeurService } from '../../../typeauditeur.service';

describe('TypeauditeurService', () => {
  let service: TypeauditeurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeauditeurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
