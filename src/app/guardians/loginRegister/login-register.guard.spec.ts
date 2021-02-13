import { TestBed, async, inject } from '@angular/core/testing';

import { LoginRegisterGuard } from './login-register.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginRegisterGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [LoginRegisterGuard]
    });
  });

  it('should ...', inject([LoginRegisterGuard], (guard: LoginRegisterGuard) => {
    expect(guard).toBeTruthy();
  }));
});
