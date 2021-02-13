import { TestBed, async, inject } from '@angular/core/testing';

import { AdminGuardianGuard } from './admin-guardian.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminGuardianGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [AdminGuardianGuard]
    });
  });

  it('should ...', inject([AdminGuardianGuard], (guard: AdminGuardianGuard) => {
    expect(guard).toBeTruthy();
  }));
});
