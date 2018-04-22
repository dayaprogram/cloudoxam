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

import { LocalStorage, SessionStorage } from 'ngx-store';
import { UserDetails } from '../../../model/user-details';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {


  @SessionStorage('loginUserDetail') userDtl: UserDetails;
  @LocalStorage('EXAMSEQNO') examSeqNoLocalStore: number;
  @SessionStorage('EXAMCOMPLETEFLAG') examCompleteFlag: String;
  @SessionStorage('EXAMQUESTIONSET') examQuestionSetLocal: ExamQuestionSet = new ExamQuestionSet();

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
    this.api.saveExam(this.questionStatusList, 'COMPLETE').subscribe(
      data => {
        alert(data);
      },
      // Errors will call this callback instead:
      err => {
        console.log('Something went wrong!' + err);
        console.log(err);
      }, () => {
        this.examCompleteFlag = 'COMPLETE';
        this.router.navigate(['/result']);
      }
    );
  }
  initializeExam() {
    this.questionSetList = this.examQuestionSet.mcqQuestionList;
    this.examTime = this.examQuestionSet.examTime;

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
    this.examSeqNo = this.questionSetList[0].examSeqNo;
    this.quetStatusCount.notAswared = this.questionSetList.length;
    this.quetStatusCount.answered = 0;
    this.quetStatusCount.markedReviewAnswered = 0;
    this.quetStatusCount.markedReviewNotAns = 0;
  }

  ngOnInit() {
    this.questionSet = new QuestionSet();
    this.qstnOptionList = [];
    if (this.examCompleteFlag === 'COMPLETE' || this.examCompleteFlag === 'FRESH') {
      this.api.getQuestionSetRequest(this.cookieService.get('course')).subscribe(
        data => {
          this.examQuestionSetLocal = data;
          this.examQuestionSet = this.examQuestionSetLocal;
        },
        // Errors will call this callback instead:
        err => {
          console.log('Something went wrong!');
        }, () => {
          this.initializeExam();
          this.examCompleteFlag = 'UNCOMPLETE';
        }
      );
    } else {
      this.examQuestionSet = this.api.getQuestionSetLocal();
      this.initializeExam();
    }


    this.api.getCourseExamDtl(this.cookieService.get('course')).subscribe(
      data => {
        this.courseExamDeatal = data;
      },
      // Errors will call this callback instead:
      err => {
        console.log('Something went wrong!');
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
        if (counter === 0) {
          this.finalSubmit();
        } if (counter === 300) {
          alert('Only Five Minutes Left to over the exam! its automatically save after five minuts.');
        }
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
