import { TestBed } from '@angular/core/testing';

import { AcreditacionesService } from './acreditaciones.service';

describe('AcreditacionesService', () => {
  let service: AcreditacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcreditacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
