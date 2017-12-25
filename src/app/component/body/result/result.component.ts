import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ExamcontrolService } from '../../../service/examcontrol.service';
import { AuthenticationService } from '../../../service/authentication.service';

import { CookieService } from 'ngx-cookie-service';
import { ExamResult } from '../../../model/examResult';
import { LocalStorageService, LocalStorage } from 'ngx-store';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private api: ExamcontrolService,
    private authApi: AuthenticationService,
    private router: Router
  ) { }
  examResult: ExamResult;
  @LocalStorage('EXAMSEQNO') examSeqNoLocalStore: number;

  onExit() {
    this.authApi.logout();
  }
  ngOnInit() {
    this.examResult = new ExamResult();
    const examSeqNo = this.examSeqNoLocalStore;
    // : number = parseInt(this.cookieService.get('EXAMSEQNO'));
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
