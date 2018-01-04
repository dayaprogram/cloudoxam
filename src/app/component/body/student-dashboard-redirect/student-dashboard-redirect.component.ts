import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard-redirect',
  templateUrl: './student-dashboard-redirect.component.html',
  styleUrls: ['./student-dashboard-redirect.component.css']
})
export class StudentDashboardRedirectComponent implements OnInit {

  constructor(private router: Router) { }
  redirectStudent(redirectTo: string) {
    if (redirectTo === 'dashboard') {
      this.router.navigate(['/adm']);
    } else if (redirectTo === 'course') {
      this.router.navigate(['/course']);
    }
  }
  ngOnInit() {
  }

}
