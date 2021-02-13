import { TestBed, async, inject } from '@angular/core/testing';

import { RouteGuardGuard } from './route-guard.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('RouteGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [RouteGuardGuard]
    });
  });

  it('should ...', inject([RouteGuardGuard], (guard: RouteGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
