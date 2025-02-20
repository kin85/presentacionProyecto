import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { supervisorguardGuard } from './supervisorguard.guard';

describe('supervisorguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => supervisorguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
