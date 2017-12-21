import { TestBed, async, inject } from '@angular/core/testing';

import { ExamAccessGuard } from './exam-access.guard';

describe('ExamAccessGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExamAccessGuard]
    });
  });

  it('should ...', inject([ExamAccessGuard], (guard: ExamAccessGuard) => {
    expect(guard).toBeTruthy();
  }));
});
