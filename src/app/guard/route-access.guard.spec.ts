import { TestBed, async, inject } from '@angular/core/testing';

import { RouteAccessGuard } from './route-access.guard';

describe('RouteAccessGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteAccessGuard]
    });
  });

  it('should ...', inject([RouteAccessGuard], (guard: RouteAccessGuard) => {
    expect(guard).toBeTruthy();
  }));
});
