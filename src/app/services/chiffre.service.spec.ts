import { TestBed } from '@angular/core/testing';

import { ChiffreService } from './chiffre.service';

describe('ChiffreService', () => {
  let service: ChiffreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChiffreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
