import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Options } from '../../../model/options';
import { QuestionSet } from '../../../model/question-set';
import { QuestionSetSubject } from '../../../model/questionSetSubject';
import { Subject } from '../../../model/subject';
import { ExamQuestionSetSubject } from '../../../model/examQuestionSetSubject';
import { QuestionOption } from '../../../model/questionOption';
import { QuestionStatus } from '../../../model/questionStatus';
import { AuthenticationService } from '../../../service/authentication.service';
import { ExamcontrolService } from '../../../service/examcontrol.service';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/interval';
@Component({
  selector: 'app-exam-subject-wies',
  templateUrl: './exam-subject-wies.component.html',
  styleUrls: ['./exam-subject-wies.component.css']
})
export class ExamSubjectWiesComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private api: ExamcontrolService,
    private router: Router
  ) { }

  questionSetSubjectList: QuestionSetSubject[];
  questionSetSubject: QuestionSetSubject;
  examTime: number;

  questionSetList: QuestionSet[];
  questionSet: QuestionSet;

  questionStatusList: QuestionStatus[] = [];
  questionStatus: QuestionStatus = new QuestionStatus();

  qstnOptionList: QuestionOption[];
  // this array evoluate by createQuestionOptions methode

  questionLangList: Options[];

  questionSubjectList: Options[];
  subject = '';
  questionLang = 'ENG';
  selectedOption: string;
  selectedSubject: string;

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

  onClickSubject(subjectId: string) {
    this.questionSetSubject = this.questionSetSubjectList.find(x => x.subjectId === subjectId);
    this.questionSetList = this.questionSetSubject.mcqQuestionList;

    this.selectedSubject = subjectId;
    this.questionNavigator(this.questionSetList[0].questionSeqNo);
  }

  questionNavigator(questionSeqNo: number) {
    if (this.questionSetList[this.questionSetList.length - 1].questionSeqNo >= questionSeqNo) {
      this.questionSet = this.questionSetList.find(x => x.questionSeqNo === questionSeqNo);
      this.createQuestionOptions(this.questionSet.noOfOpt, this.questionSet.questionSeqNo);
      const questionStatus = this.questionStatusList.find(x => x.questionSeqNo === questionSeqNo);
      if (!questionStatus.visited) {
        this.questionStatusList.find(x => x.questionSeqNo === questionSeqNo).visited = true;
        // set the css class not answer
        this.questionStatusList.find(x => x.questionSeqNo === questionSeqNo).navButtonClass = this.navButtonClassNotAnswered;
      }
    } else {
      // navigate to next subject
      // find the index of this current questionSetSubject and add 1
      const nextIndex = this.questionSetSubjectList.indexOf(this.questionSetSubject);
      const subjectId = this.questionSetSubjectList[nextIndex + 1].subjectId;
      this.onClickSubject(subjectId);
    }
  }

  markForReviewAndNav(questionSeqNo: number) {
    const questionSet = this.questionSetList.find(x => x.questionSeqNo === questionSeqNo);
    // this.noOfOption = this.questionSet.noOfOpt;
    this.createQuestionOptions(questionSet.noOfOpt, questionSet.questionSeqNo);
    const questionStatus = this.questionStatusList.find(x => x.questionSeqNo === questionSeqNo);
    if (!questionStatus.markedForReview) {
      if (questionStatus.finalSubmitAns === '') {
        this.questionStatusList.find(x => x.questionSeqNo === questionSeqNo).markedForReview = true;
        // set the css class mark for review and not answered
        this.questionStatusList.find(x => x.questionSeqNo === questionSeqNo).navButtonClass = this.navButtonClassMarkedForReviewNotAns;
      } else {
        // set the css class mark for review but answered
        this.questionStatusList.find(x => x.questionSeqNo === questionSeqNo).navButtonClass = this.navButtonClassMarkedForReviewAns;
      }
    } else {
      if (questionStatus.finalSubmitAns !== '') {
        // set the css class mark for review but answered
        this.questionStatusList.find(x => x.questionSeqNo === questionSeqNo).navButtonClass = this.navButtonClassMarkedForReviewAns;
      }
    }
    this.questionNavigator(questionSeqNo + 1);
  }

  saveAndNext(questionSeqNo: number) {
    const questionSet = this.questionSetList.find(x => x.questionSeqNo === questionSeqNo);
    this.createQuestionOptions(questionSet.noOfOpt, questionSet.questionSeqNo);
    const questionStatus = this.questionStatusList.find(x => x.questionSeqNo === questionSeqNo);
    if (questionStatus.finalSubmitAns === '') {
      if (questionStatus.markedForReview) {
        // set the css class mark for review but not answered
        this.questionStatusList.find(x => x.questionSeqNo === questionSeqNo).navButtonClass = this.navButtonClassMarkedForReviewNotAns;
      } else {
        this.questionStatusList.find(x => x.questionSeqNo === questionSeqNo).markedForReview = false;
        // set the css class not answered
        this.questionStatusList.find(x => x.questionSeqNo === questionSeqNo).navButtonClass = this.navButtonClassNotAnswered;
      }
    } else {
      this.questionStatusList.find(x => x.questionSeqNo === questionSeqNo).markedForReview = false;
      // set the css class answered
      this.questionStatusList.find(x => x.questionSeqNo === questionSeqNo).navButtonClass = this.navButtonClassAnswered;
    }
    this.questionNavigator(questionSeqNo + 1);
  }

  clearResponse(questionSeqNo: number) {
    const questionStatus = this.questionStatusList.find(x => x.questionSeqNo === questionSeqNo);
    if (questionStatus.finalSubmitAns !== '') {
      this.questionStatusList.find(x => x.questionSeqNo === questionSeqNo).finalSubmitAns = '';
      // set the css class not answered
      this.questionStatusList.find(x => x.questionSeqNo === questionSeqNo).navButtonClass = this.navButtonClassNotAnswered;
    }
  }

  onClickOption(questionSeqNo: number, optionIndex: string) {
    console.log(questionSeqNo);
    console.log(this.questionStatusList.find(x => x.questionSeqNo === questionSeqNo));
    this.questionStatusList.find(x => x.questionSeqNo === questionSeqNo).finalSubmitAns = optionIndex;
  }

  finalSubmit() {
    console.log('finally submited');
    console.log('finally submited');
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
    /*
    Observable.interval(1000 * 60).subscribe(x => {
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
  createQuestionStaus(questionSeqNo: number) {
    this.questionSet = this.questionSetList.find(x => x.questionSeqNo === questionSeqNo);
  }

  ngOnInit() {
    this.questionSet = new QuestionSet();
    this.qstnOptionList = [];
    this.questionSetList = [];
    this.questionSetSubjectList = [];

    this.api.getQuestionSetSubject(this.cookieService.get('course')).subscribe(
      data => {
        console.log('examquestiomsert');
        console.log(data);
        // this.examQuestionSetSubject = data;
        this.questionSetSubjectList = data.mcqQuestionSubjectList;
        this.examTime = data.examTime;

      },
      // Errors will call this callback instead:
      err => {
        console.log('Something went wrong!');
      },
      () => {
        this.questionSetSubjectList.forEach(item => {
          item.mcqQuestionList.forEach(itemCh => {
            const questionStatus = new QuestionStatus();
            questionStatus.course = this.cookieService.get('course');
            questionStatus.examSeqNo = itemCh.examSeqNo;
            questionStatus.questionSeqNo = itemCh.questionSeqNo;
            questionStatus.questionId = itemCh.questionId;
            questionStatus.markedForReview = false;
            questionStatus.finalSubmitAns = '';
            questionStatus.questionAttemptTime = '';
            questionStatus.visited = false;
            this.questionStatusList.push(questionStatus);
          });
        });

        this.questionSetSubject = this.questionSetSubjectList[0];
        this.questionSetList = this.questionSetSubject.mcqQuestionList;
        this.selectedSubject = this.questionSetSubject.subjectId;
        this.questionNavigator(1);
        this.startCountDownTimer(this.examTime * 60);
        this.cookieService.set('EXAMSEQNO', this.questionSetList[0].examSeqNo.toString());
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
  /// timer



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
