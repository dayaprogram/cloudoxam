import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McqQuestionParaComponent } from './mcq-question-para.component';

describe('McqQuestionParaComponent', () => {
  let component: McqQuestionParaComponent;
  let fixture: ComponentFixture<McqQuestionParaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McqQuestionParaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McqQuestionParaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
