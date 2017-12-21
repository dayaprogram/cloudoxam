import { Component, OnInit, Optional } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../service/authentication.service';
import { AdminService } from '../../../../service/admin.service';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Options } from '../../../../model/options';
import { QuestionOption } from '../../../../model/questionOption';
import { QuestionSet } from '../../../../model/question-set';

@Component({
  selector: 'app-mcq-question',
  templateUrl: './mcq-question.component.html',
  styleUrls: ['./mcq-question.component.css']
})

export class McqQuestionComponent implements OnInit {
  constructor(
    private cookieService: CookieService,
    private admApi: AdminService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  mcqBodyForm: FormGroup;
  mcqOptionForm: FormGroup;
  courseList: Options[];
  subjectList: Options[];

  levelList: Options[];
  chapterList: Options[];
  questionOptionList: QuestionOption[] = [];

  callFromFlag: String = '';
  base64textQuestionBodyImg = '';
  base64textOptionBodyImg = '';
  mcqQuestionSet: QuestionSet;

  mcqQuestionSaveStatus: String;

  selectedSubject = '';
  currectOption: string;

  onSubmitMCQBodyForm() {
    if (this.mcqBodyForm.valid) {
      if (this.questionOptionList.length > 5 || this.questionOptionList.length < 4) {
        alert('Question must have four or five option');
        return;
      }

      if (this.currectOption === '') {
        alert('Select Currect Opption !');
        return;
      }
      this.mcqQuestionSet = new QuestionSet();
      this.createMcqQuestionSet();
      this.admApi.saveMcqQuestionSet(this.mcqQuestionSet).subscribe(
        data => {
          this.mcqQuestionSaveStatus = data;
        },
        err => {
          console.log('Something went wrong!');
        },
        () => {
          this.mcqBodyForm.reset({
            qutnBodyEng: '',
            qutnBodyHnd: '',
            qutnBodyImg: ''
          });
          this.mcqQuestionSet = new QuestionSet();
          this.questionOptionList = [];
          this.base64textQuestionBodyImg = '';
          this.base64textOptionBodyImg = '';
          alert(this.mcqQuestionSaveStatus);
        }
      );
    }
  }

  onSubmitMCQOptionForm() {
    if (this.mcqOptionForm.valid && this.questionOptionList.length < 5) {
      const questionOption: QuestionOption = new QuestionOption();
      questionOption.optionTextBodyEng = this.mcqOptionForm.value.optionBodyEng;
      questionOption.optionTextBodyHnd = this.mcqOptionForm.value.optionBodyHnd;
      questionOption.optionTextImage = this.base64textOptionBodyImg;
      this.questionOptionList.push(questionOption);
      questionOption.optionIndex = String.fromCharCode(64 + this.questionOptionList.length);
      this.questionOptionList[this.questionOptionList.length - 1].optionIndex = questionOption.optionIndex;
      this.mcqOptionForm.reset();
    }
    // alert(this.currectOption);
  }
  deleteOption(index: string) {
    /* this.questionOptionList.splice(this.questionOptionList.indexOf(
       this.questionOptionList.find(x => x.optionIndex === index)), 1);
 */
    this.questionOptionList = this.questionOptionList.filter(x => x.optionIndex !== index);

    this.questionOptionList.forEach(itm => {
      const tempList: QuestionOption[] = [];
      const indexNo: number = this.questionOptionList.indexOf(itm);
      this.questionOptionList[indexNo].optionIndex =
        String.fromCharCode(65 + indexNo);
      itm.optionIndex = String.fromCharCode(65 + indexNo);
    });
  }
  selectCorrectOption(option: string) {
    this.currectOption = option;
  }
  createMcqQuestionSet() {
    this.mcqQuestionSet.subjectId = this.mcqBodyForm.value.subject;
    this.mcqQuestionSet.questionLevel = this.mcqBodyForm.value.level;
    this.mcqQuestionSet.chapterId = this.mcqBodyForm.value.chapter;
    this.mcqQuestionSet.fullMarks = this.mcqBodyForm.value.fullMarks;
    this.mcqQuestionSet.negativeMarks = this.mcqBodyForm.value.negativeMarks;
    this.mcqQuestionSet.questionBodyEng = this.mcqBodyForm.value.qutnBodyEng;
    this.mcqQuestionSet.questionBodyHindi = this.mcqBodyForm.value.qutnBodyHnd;
    this.mcqQuestionSet.questionBodyImage = this.base64textQuestionBodyImg;
    this.mcqQuestionSet.courseGroup = '';
    if (this.questionOptionList.length >= 4) {
      this.mcqQuestionSet.optionBodyAEng = this.questionOptionList[0].optionTextBodyEng;
      this.mcqQuestionSet.optionBodyAHnd = this.questionOptionList[0].optionTextBodyHnd;
      this.mcqQuestionSet.optionBodyAImg = this.questionOptionList[0].optionTextImage;

      this.mcqQuestionSet.optionBodyBEng = this.questionOptionList[1].optionTextBodyEng;
      this.mcqQuestionSet.optionBodyBHnd = this.questionOptionList[1].optionTextBodyHnd;
      this.mcqQuestionSet.optionBodyBImg = this.questionOptionList[1].optionTextImage;

      this.mcqQuestionSet.optionBodyCEng = this.questionOptionList[2].optionTextBodyEng;
      this.mcqQuestionSet.optionBodyCHnd = this.questionOptionList[2].optionTextBodyHnd;
      this.mcqQuestionSet.optionBodyCImg = this.questionOptionList[2].optionTextImage;

      this.mcqQuestionSet.optionBodyDEng = this.questionOptionList[3].optionTextBodyEng;
      this.mcqQuestionSet.optionBodyDHnd = this.questionOptionList[3].optionTextBodyHnd;
      this.mcqQuestionSet.optionBodyDImg = this.questionOptionList[3].optionTextImage;
    }
    if (this.questionOptionList.length > 4) {

      this.mcqQuestionSet.optionBodyEEng = this.questionOptionList[4].optionTextBodyEng;
      this.mcqQuestionSet.optionBodyEHnd = this.questionOptionList[4].optionTextBodyHnd;
      this.mcqQuestionSet.optionBodyEImg = this.questionOptionList[4].optionTextImage;
    }

    this.mcqQuestionSet.noOfOpt = this.questionOptionList.length;
    this.mcqQuestionSet.correctAns = this.currectOption;
  }

  handleFileSelect(evt, callFrom: string) {
    const files = evt.target.files;
    const file = files[0];
    if (files && file) {
      const reader = new FileReader();
      this.callFromFlag = callFrom;
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    if (this.callFromFlag === 'QuestionImg') {
      this.base64textQuestionBodyImg = btoa(binaryString);
    } else if (this.callFromFlag === 'OptionImg') {
      this.base64textOptionBodyImg = btoa(binaryString);
    }
  }

  getCourses(subject: string) {
    this.admApi.getCoursesSubjectWies(subject).subscribe(
      data => {
        this.courseList = data;
      },
      err => {
        console.log('Something went wrong!');
      },
      () => {
        this.getChapters(this.selectedSubject);
      }
    );
  }

  getChapters(subject: string) {
    this.admApi.getCoursesSubjectWies(subject).subscribe(
      data => {
        this.chapterList = data;
      },
      err => {
        console.log('Something went wrong!');
      },
      () => { }
    );
  }

  ngOnInit() {
    this.mcqBodyForm = this.formBuilder.group({
      'subject': [null, Validators.required],
      'level': [null, Validators.required],
      'chapter': [null],
      'fullMarks': [null, Validators.required],
      'negativeMarks': [null, Validators.required],
      'course': [null],
      'qutnBodyEng': [null, Validators.required],
      'qutnBodyHnd': [null],
      'qutnBodyImg': [null],
    });

    this.mcqOptionForm = this.formBuilder.group({
      'optionBodyEng': [null, Validators.required],
      'optionBodyHnd': [null],
      'optionBodyImg': [null]
    });
    this.admApi.getAllSubject().subscribe(
      data => {
        this.subjectList = data;
      },
      err => {
        console.log('Something went wrong!');
      },
      () => { }
    );
    this.admApi.getQuestionLevel().subscribe(
      data => {
        this.levelList = data;
      },
      err => {
        console.log('Something went wrong!');
      },
      () => { }
    );
  }
}
