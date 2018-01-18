import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorage } from 'ngx-store/dist';
import { UserDetails } from '../../../model/user-details';
import { AdminService } from '../../../service/admin.service';
import { ExamSetDetail } from '../../../model/exam-set-detail';
import { ResultDetail } from '../../../model/result-detail';
import { MatDialog } from '@angular/material';
import { QuestionPaperComponent } from '../../dashboardbody/question-paper/question-paper.component';
import { SubjectsResultDilogComponent } from '../../dialog/subjects-result-dilog/subjects-result-dilog.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @SessionStorage('loginUserDetail') userDtl: UserDetails;
  examSetDetailList: ExamSetDetail[];
  lastExamResult: ResultDetail[];
  constructor(private elementRef: ElementRef,
    private adminApi: AdminService,
    private router: Router,
    public dialog: MatDialog) { }

  takeExam() {
    this.router.navigate(['/course']);
  }
  getResult() { }
  getQuestionPaper(courseId: string, examSeqNo: number) { }
  inItChart() {
  }

  ngOnInit() {
    this.adminApi.getExamSetDtlList().subscribe(data => {
      this.examSetDetailList = data;
    },
      err => {
        console.log('Something went wrong!', err);
      },
      () => {

      });
    this.adminApi.getLastExamResult().subscribe(
      data => { this.lastExamResult = data; },
      err => { console.log(err); },
      () => { }
    );
    this.inItChart();
  }
  openDialogSubjectsResult(courseId: string, examSeqNo: number, courseName: String): void {
    let resultDetailList: any;
    this.adminApi.getSubjectResult(courseId, examSeqNo)
      .subscribe(res => {
        resultDetailList = res;

      },
      err => {
        console.log(err, 'question');
      }, () => {
        const dialogRef = this.dialog.open(SubjectsResultDilogComponent, {
          width: '80%',
          maxHeight: '90%',
          data: {
            courseId: courseId, examSeqNo: examSeqNo,
            courseName: courseName, resultDetailList: resultDetailList
          }
        });
      });

  }
  openDialogQuestionPaerWithResult(courseId: string, examSeqNo: number, courseName: String): void {

    let questionSetList: any;
    this.adminApi.getQuestionPaperWithResult(courseId, examSeqNo)
      .subscribe(res => {
        console.log(res, 'question');
        questionSetList = res;

      },
      err => {
        console.log(err, 'question');
      }, () => {
        const dialogRef = this.dialog.open(QuestionPaperComponent, {
          width: '80%',
          maxHeight: '90%',
          data: {
            courseId: courseId, examSeqNo: examSeqNo,
            courseName: courseName, questionSetList: questionSetList
          }
        });
      });


  }
}
