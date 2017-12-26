import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams, } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable';
import { Options } from '../model/options';
import { QuestionSet } from '../model/question-set';
import { ExamQuestionSet } from '../model/examQuestionSet';
import { ExamQuestionSetSubject } from '../model/examQuestionSetSubject';
import { QuestionStatus } from '../model/questionStatus';
import { Global } from '../Globel';
import { ExamResult } from '../model/examResult';
import { CourseDetail } from '../model/course-detail';
import { SessionStorage } from 'ngx-store';

@Injectable()
export class ExamcontrolService {
  @SessionStorage('EXAMCOMPLETEFLAG') examCompleteFlag: String = 'FRESH';
  @SessionStorage('EXAMQUESTIONSET') examQuestionSetLocal: ExamQuestionSet;
  @SessionStorage('EXAMQUESTIONSETSUBJECT') examQuestionSetSubjectLocal: ExamQuestionSetSubject;
  constructor(
    private _router: Router,
    private api: HttpClient,
    private cookieService: CookieService,
    private global: Global
  ) { }
  accesTcn = '?access_token=' + this.cookieService.get('access_token');
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json;charset=utf-8',
    'Authorization': 'Bearer ' + this.cookieService.get('access_token')
  });

  // const url='';

  public getCourses(): Observable<Array<Options>> {
    const url = this.global.BASEURL + '/options/courses';
    return this.api.get<Array<Options>>(url, { headers: this.headers });
  }

  public getExamLang(): Observable<Array<Options>> {
    const url = this.global.BASEURL + '/options/examlangs';
    return this.api.get<Array<Options>>(url, { headers: this.headers });
  }

  public getQuestionSetRequest(course: string): Observable<ExamQuestionSet> {
    const url = this.global.BASEURL + '/exam/questions/?course=' + course;
    const param = new HttpParams();
    param.set('course', course);
    return this.api.get<ExamQuestionSet>(url, { params: param, headers: this.headers });
  }

  public getQuestionSetLocal() {
    return this.examQuestionSetLocal;
  }


  public getQuestionSetSubjectRequest(course: string): Observable<ExamQuestionSetSubject> {
    const url = this.global.BASEURL + '/exam/questionssubject/?course=' + course;
    const param = new HttpParams();
    param.set('course', course);
    return this.api.get<ExamQuestionSetSubject>(url, { params: param, headers: this.headers });
  }
  public getQuestionSetSubjectLocal() {
    return this.examQuestionSetSubjectLocal;
  }
  // /subjects

  public getSubjectMappedToCource(course: string): Observable<Array<Options>> {
    const url = this.global.BASEURL + '/options/subjects/?course=' + course;
    const param = new HttpParams();
    param.set('course', course);
    return this.api.get<Array<Options>>(url, { headers: this.headers });
  }

  public saveExam(questionStatusList: QuestionStatus[], examCompleteFlag: String): Observable<string> {
    const url = this.global.BASEURL + '/exam/saveexam/?examCompleteFlag=' + examCompleteFlag;
    const param = new HttpParams();
    return this.api.post<string>(url, questionStatusList, { headers: this.headers });
  }

  public getExamNature(course: string): Observable<string> {
    const url = this.global.BASEURL + '/redirect/coursenature/?course=' + course;
    const param = new HttpParams();
    param.set('course', course);
    return this.api.get<string>(url, { headers: this.headers });
  }

  public getResult(course: string, examSeqNo: number): Observable<ExamResult> {
    const url = this.global.BASEURL + '/exam/result/?course=' + course + '&examseqno=' + examSeqNo;
    const param = new HttpParams();
    param.set('course', course);
    param.set('examseqno', examSeqNo.toString());
    //  return this.api.get<ExamResult>(url, { headers: this.headers, params: param });
    return this.api.get<ExamResult>(url, { headers: this.headers });
  }

  public getCourseExamDtl(course: string): Observable<CourseDetail> {
    const url = this.global.BASEURL + '/exam/coursedtl/?course=' + course;
    const param = new HttpParams();
    param.set('course', course);
    //  return this.api.get<ExamResult>(url, { headers: this.headers, params: param });
    return this.api.get<CourseDetail>(url, { headers: this.headers });

  }

  public validateStudent(course: string): Observable<Boolean> {
    const url = this.global.BASEURL + '/exam/validatestudent/?course=' + course;
    const param = new HttpParams();
    param.set('course', course);
    //  return this.api.get<ExamResult>(url, { headers: this.headers, params: param });
    return this.api.get<Boolean>(url, { headers: this.headers });
  }

}
