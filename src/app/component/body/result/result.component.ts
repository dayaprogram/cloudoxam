import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ExamcontrolService } from '../../../service/examcontrol.service';
import { CookieService } from 'ngx-cookie-service';
import { ExamResult } from '../../../model/examResult';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private api: ExamcontrolService,
    private router: Router
  ) { }
  examResult: ExamResult;

  ngOnInit() {
    this.examResult = new ExamResult();
    const examSeqNo: number = parseInt(this.cookieService.get('EXAMSEQNO'));
    this.api.getResult(this.cookieService.get('course'), examSeqNo
    ).subscribe(
      data => {
        this.examResult = data;
      },
      // Errors will call this callback instead:
      err => {
        console.log('Something went wrong!');
      }
      );
  }

}
