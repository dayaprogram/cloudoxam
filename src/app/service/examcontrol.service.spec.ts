import { TestBed, inject } from '@angular/core/testing';

import { ExamcontrolService } from './examcontrol.service';

describe('ExamcontrolService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExamcontrolService]
    });
  });

  it('should be created', inject([ExamcontrolService], (service: ExamcontrolService) => {
    expect(service).toBeTruthy();
  }));
});
