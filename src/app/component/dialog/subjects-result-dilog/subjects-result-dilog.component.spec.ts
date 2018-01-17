import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsResultDilogComponent } from './subjects-result-dilog.component';

describe('SubjectsResultDilogComponent', () => {
  let component: SubjectsResultDilogComponent;
  let fixture: ComponentFixture<SubjectsResultDilogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectsResultDilogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsResultDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
