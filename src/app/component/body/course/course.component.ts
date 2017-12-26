import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Options } from '../../../model/options';
import { AuthenticationService } from '../../../service/authentication.service';
import { ExamcontrolService } from '../../../service/examcontrol.service';
import { Global } from '../../../Globel';
import { SessionStorage } from 'ngx-store';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  // couses = new Option();
  couses: Options[];
  selectedCourse = '';
  @SessionStorage({ key: 'VALIDFOREXAM' }) validStudent: Boolean = false;
  constructor(private auth: AuthenticationService,
    private api: ExamcontrolService,
    private router: Router,
    private cookieService: CookieService,
    private globels: Global
  ) { }
  chehk() {
    console.log(this.auth.checkCredentials());
  }
  submitCourse() {
    this.cookieService.set('course', this.selectedCourse);
    this.api.validateStudent(this.selectedCourse).subscribe(
      data => {
        this.validStudent = data;
      }, err => {
        console.log('Something went wrong to getting valid student!');
      }, () => {
        if (this.validStudent) {
          this.api.getExamNature(this.selectedCourse).subscribe(
            data => {
              this.cookieService.set('EXAMNATURE', data.toString());
            }, err => {
              console.log('Something went wrong to getting exam nature!');
            }, () => {
              this.router.navigate(['/instruction']);
            }
          );
        } else {
          alert('Please Contact to Administration');
        }
      }

    );

  }

  ngOnInit() {
    this.api.getCourses().subscribe(
      data => {
        this.couses = data;
      },
      // Errors will call this callback instead:
      err => {
        console.log('Something went wrong!');
      },
      () => {

      }
    );
  }
}
