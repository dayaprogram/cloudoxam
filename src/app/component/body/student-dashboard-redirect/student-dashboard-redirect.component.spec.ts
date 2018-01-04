import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboardRedirectComponent } from './student-dashboard-redirect.component';

describe('StudentDashboardRedirectComponent', () => {
  let component: StudentDashboardRedirectComponent;
  let fixture: ComponentFixture<StudentDashboardRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentDashboardRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashboardRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
