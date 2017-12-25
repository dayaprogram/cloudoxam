import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { CookieService } from 'ngx-cookie-service';
import { Options } from '../../../model/options';
import { QuestionSet } from '../../../model/question-set';
import { Subject } from '../../../model/subject';
import { ExamQuestionSet } from '../../../model/examQuestionSet';
import { QuestionOption } from '../../../model/questionOption';
import { AuthenticationService } from '../../../service/authentication.service';
import { ExamcontrolService } from '../../../service/examcontrol.service';
import { QuestionStatus } from '../../../model/questionStatus';
import { QuetStatusCount } from '../../../model/question-status-count';
import { CourseDetail } from '../../../model/course-detail';

import { CookieStorage, LocalStorage, SessionStorage } from 'ngx-store';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {


  // it will be stored under ${prefix}viewCounts name
  // @LocalStorage() viewCounts: number = 0;
  // this under name: ${prefix}differentLocalStorageKey
  @LocalStorage('EXAMSEQNO') examSeqNoLocalStore: number;
  // it will be stored under ${prefix}itWillBeRemovedAfterBrowserClose in session storage
  // @SessionStorage({ key: 'itWillBeRemovedAfterBrowserClose' }) previousUserNames: Array<string> = [];
  // it will be read from cookie 'user_id' (can be shared with backend) and saved to localStorage and cookies after change
  // @LocalStorage() @CookieStorage({ prefix: '', key: 'user_id' }) userId: string = '';
  // it will be stored in a cookie named ${prefix}user_workspaces for 24 hours
  // @CookieStorage({ key: 'user_workspaces', expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) }) userWorkspaces = [];


  constructor(
    private cookieService: CookieService,
    private api: ExamcontrolService,
    private router: Router
  ) { }


  questionSetList: QuestionSet[];
  questionSet: QuestionSet;

  questionStatusList: QuestionStatus[] = [];
  questionStatus: QuestionStatus = new QuestionStatus();

  examQuestionSet: ExamQuestionSet;
  examTime: number;

  qstnOptionList: QuestionOption[];

  questionLangList: Options[];
  questionLang = 'ENG/HND';

  selectedOption: string;
  previousQnNo = 1;

  quetStatusCount: QuetStatusCount = new QuetStatusCount();
  examSeqNo = 0;
  courseExamDeatal: CourseDetail = new CourseDetail();
  tagBtnCaption = 'Tag';

  navButtonClassNotVisited = 'btn btn-primary btn-custom-wid not_visited';
  navButtonClassMarkedForReviewNotAns = 'btn btn-primary btn-custom-wid marked_review_not_answered';
  navButtonClassMarkedForReviewAns = 'btn btn-primary btn-custom-wid marked_review_answered';
  navButtonClassNotAnswered = 'btn btn-primary btn-custom-wid not_aswared';
  navButtonClassAnswered = 'btn btn-primary btn-custom-wid answered';


  minutesDisplay = 0;
  hoursDisplay = 0;
  secondsDisplay = 0;
  sub: Subscription;


  onChangeLang(questionLang: string) {
    this.questionLang = questionLang;
  }

  questionNavigator(questionSeqNo: number) {
    if ((this.questionSetList[this.questionSetList.length - 1].questionSeqNo >= questionSeqNo) && questionSeqNo > 0) {
      this.questionSet = this.questionSetList.find(x => x.questionSeqNo === questionSeqNo);
      this.createQuestionOptions(this.questionSet.noOfOpt, this.questionSet.questionSeqNo);
      if (this.questionStatusList.find(x => x.questionSeqNo === questionSeqNo).markedForReview) {
        this.tagBtnCaption = 'De-Tag';
      } else {
        this.tagBtnCaption = 'Tag';
      }
    }
    this.setQuestionStatus(questionSeqNo);
  }

  markForReview(questionSeqNo: number) {
    if (this.tagBtnCaption === 'Tag') {
      this.questionStatusList.find(x => x.questionSeqNo === questionSeqNo).markedForReview = true;
      this.tagBtnCaption = 'De-Tag';
    } else {
      this.questionStatusList.find(x => x.questionSeqNo === questionSeqNo).markedForReview = false;
      this.tagBtnCaption = 'Tag';
    }
    this.previousQnNo = questionSeqNo;
    this.setQuestionStatus(this.previousQnNo);
  }
  clearAnswer(questionSeqNo: number) {
    this.questionStatusList.find(x => x.questionSeqNo === questionSeqNo).finalSubmitAns = '';
    this.questionStatusList.find(x => x.questionSeqNo === questionSeqNo).markedForReview = false;
    this.previousQnNo = questionSeqNo;
    this.setQuestionStatus(this.previousQnNo);
  }

  setQuestionStatus(questionSeqNo: number) {
    const qnStatus = this.questionStatusList.find(x => x.questionSeqNo === this.previousQnNo);

    if (qnStatus.markedForReview) {
      if (!(qnStatus.finalSubmitAns === null || qnStatus.finalSubmitAns === '')) {
        this.questionStatusList.find(x => x.questionSeqNo === this.previousQnNo).navButtonClass =
          this.navButtonClassMarkedForReviewAns;
      } else {
        this.questionStatusList.find(x => x.questionSeqNo === this.previousQnNo).navButtonClass
          = this.navButtonClassMarkedForReviewNotAns;
      }
    } else {
      if (!(qnStatus.finalSubmitAns === null || qnStatus.finalSubmitAns === '')) {
        this.questionStatusList.find(x => x.questionSeqNo === this.previousQnNo).navButtonClass
          = this.navButtonClassAnswered;
      } else {
        this.questionStatusList.find(x => x.questionSeqNo === this.previousQnNo).navButtonClass =
          this.navButtonClassNotAnswered;
      }
    }
    if ((this.questionSetList[this.questionSetList.length - 1].questionSeqNo >= questionSeqNo) && questionSeqNo > 0) {
      this.previousQnNo = questionSeqNo;
    }
    this.quetStatusCount.notAswared = this.questionStatusList.filter(x => x.finalSubmitAns === '' && x.markedForReview === false).length;
    this.quetStatusCount.answered = this.questionStatusList.filter(x => x.finalSubmitAns !== '' && x.markedForReview === false).length;
    this.quetStatusCount.markedReviewAnswered = this.questionStatusList.filter(
      x => x.markedForReview === true && x.finalSubmitAns !== '').length;
    this.quetStatusCount.markedReviewNotAns = this.questionStatusList.filter(
      x => x.markedForReview === true && x.finalSubmitAns === '').length;
  }


  onClickOption(questionSeqNo: number, optionIndex: string) {
    this.questionStatusList.find(x => x.questionSeqNo === questionSeqNo).finalSubmitAns = optionIndex;
    //  this.questionSetList[questionSeqNo].finalSubmitAns = optionIndex;
  }

  createQuestionOptions(number: number, questionSeqNo: number) {
    this.qstnOptionList = [];
    for (let i = 65; i < (number + 65); i++) {
      let questionOption: QuestionOption;
      questionOption = new QuestionOption();
      questionOption.questionSeqNo = this.questionSet.questionSeqNo;
      questionOption.optionIndex = String.fromCharCode(i);
      if (questionOption.optionIndex === 'A') {
        questionOption.optionTextBodyEng = this.questionSet.optionBodyAEng;
        questionOption.optionTextBodyHnd = this.questionSet.optionBodyAHnd;

        questionOption.optionTextImage = this.questionSet.optionBodyAImg;

      }
      if (questionOption.optionIndex === 'B') {
        questionOption.optionTextBodyEng = this.questionSet.optionBodyBEng;
        questionOption.optionTextBodyHnd = this.questionSet.optionBodyBHnd;

        questionOption.optionTextImage = this.questionSet.optionBodyBImg;

      }
      if (questionOption.optionIndex === 'C') {
        questionOption.optionTextBodyEng = this.questionSet.optionBodyCEng;
        questionOption.optionTextBodyHnd = this.questionSet.optionBodyCHnd;

        questionOption.optionTextImage = this.questionSet.optionBodyCImg;

      }
      if (questionOption.optionIndex === 'D') {
        questionOption.optionTextBodyEng = this.questionSet.optionBodyDEng;
        questionOption.optionTextBodyHnd = this.questionSet.optionBodyDHnd;

        questionOption.optionTextImage = this.questionSet.optionBodyDImg;

      }
      if (questionOption.optionIndex === 'E') {
        questionOption.optionTextBodyEng = this.questionSet.optionBodyEEng;
        questionOption.optionTextBodyHnd = this.questionSet.optionBodyEHnd;

        questionOption.optionTextImage = this.questionSet.optionBodyEImg;

      }
      this.qstnOptionList.push(questionOption);
    }
  }

  finalSubmit() {
    console.log('finally submited');
    console.log(this.questionStatusList);

    this.api.saveExam(this.questionStatusList).subscribe(
      data => {
        console.log(data);
        alert(data);
      },
      // Errors will call this callback instead:
      err => {
        console.log('Something went wrong!' + err);
        console.log(err);
      }, () => {
        this.router.navigate(['/result']);
      }
    );
  }

  ngOnInit() {
    this.questionSet = new QuestionSet();
    this.qstnOptionList = [];
    this.api.getQuestionSet(this.cookieService.get('course')).subscribe(
      data => {
        this.questionSetList = data.mcqQuestionList;
        this.examTime = data.examTime;
        this.examQuestionSet = data;
        //   this.questionNavigator(1);
      },
      // Errors will call this callback instead:
      err => {
        console.log('Something went wrong!');
      },
      () => {
        this.questionSetList.forEach(item => {
          const questionStatus = new QuestionStatus();
          questionStatus.course = this.cookieService.get('course');
          questionStatus.examSeqNo = item.examSeqNo;
          questionStatus.questionSeqNo = item.questionSeqNo;
          questionStatus.questionId = item.questionId;
          questionStatus.markedForReview = false;
          questionStatus.finalSubmitAns = '';
          questionStatus.questionAttemptTime = '';
          questionStatus.visited = false;
          this.questionStatusList.push(questionStatus);
        });
        this.questionNavigator(1);
        this.startCountDownTimer(this.examTime * 60);
        this.examSeqNoLocalStore = this.questionSetList[0].examSeqNo;
        // this.cookieService.set('EXAMSEQNO', this.questionSetList[0].examSeqNo.toString());
        this.examSeqNo = this.questionSetList[0].examSeqNo;
        this.quetStatusCount.notAswared = this.questionSetList.length;
        this.quetStatusCount.answered = 0;
        this.quetStatusCount.markedReviewAnswered = 0;
        this.quetStatusCount.markedReviewNotAns = 0;
      }
    );
    this.api.getExamLang().subscribe(
      data => {
        this.questionLangList = data;
      },
      // Errors will call this callback instead:
      err => {
        console.log('Something went wrong!');
      }
    );


    this.api.getCourseExamDtl(this.cookieService.get('course')).subscribe(
      data => {
        this.courseExamDeatal = data;
      },
      // Errors will call this callback instead:
      err => {
        console.log('Something went wrong!');
      }
    );
    /*  Observable.interval(1000 * 60).subscribe(x => {
        alert('schedular submit');
        this.api.saveExam(this.questionStatusList).subscribe(
          data => {
            console.log(data);
            alert(data);
          },
          // Errors will call this callback instead:
          err => {
            console.log('Something went wrong!' + err);
            console.log(err);
          }
        );
      });
      */
  }
  // timer

  private startCountDownTimer(counter: number) {
    const countDown = Observable.timer(0, 1000)
      .take(counter)
      .map(() => --counter)
      .subscribe(
      t => {
        this.secondsDisplay = this.getSeconds(counter);
        this.minutesDisplay = this.getMinutes(counter);
        this.hoursDisplay = this.getHours(counter);
      }
      );
  }

  private getSeconds(ticks: number) {
    return this.pad(ticks % 60);
  }

  private getMinutes(ticks: number) {
    return this.pad((Math.floor(ticks / 60)) % 60);
  }

  private getHours(ticks: number) {
    return this.pad(Math.floor((ticks / 60) / 60));
  }

  private pad(digit: any) {
    return digit <= 9 ? '0' + digit : digit;
  }

}
