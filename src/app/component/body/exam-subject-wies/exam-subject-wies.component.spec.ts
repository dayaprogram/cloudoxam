import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamSubjectWiesComponent } from './exam-subject-wies.component';

describe('ExamSubjectWiesComponent', () => {
  let component: ExamSubjectWiesComponent;
  let fixture: ComponentFixture<ExamSubjectWiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamSubjectWiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamSubjectWiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
