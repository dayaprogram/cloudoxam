import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionBodyComponent } from './question-body.component';

describe('QuestionBodyComponent', () => {
  let component: QuestionBodyComponent;
  let fixture: ComponentFixture<QuestionBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
