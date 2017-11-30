import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient, HttpResponse, HttpHeaders, HttpParams, } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable';
import { Options } from '../model/options';
import { QuestionSet } from '../model/question-set';
import { ExamQuestionSet } from '../model/examQuestionSet';
import { ExamQuestionSetSubject } from '../model/examQuestionSetSubject'
import { QuestionStatus } from '../model/questionStatus'
import { Global } from '../Globel'
import { ExamResult } from '../model/examResult'

@Injectable()
export class ExamcontrolService {

  constructor(
    private _router: Router,
    private api: HttpClient,
    private cookieService: CookieService,
    private global: Global
  ) { }
  accesTcn = '?access_token=' + this.cookieService.get('access_token');
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Accept': 'application/json;charset=utf-8',
    'Authorization': 'Bearer ' + this.cookieService.get('access_token')
  });

  public getCourses(): Observable<Array<Options>> {
    let url = this.global.BASEURL + '/options/courses';
    return this.api.get<Array<Options>>(url, { headers: this.headers });
  }

  public getExamLang(): Observable<Array<Options>> {
    let url = this.global.BASEURL + '/options/examlangs';
    return this.api.get<Array<Options>>(url, { headers: this.headers });
  }

  public getQuestionSet(course: string): Observable<ExamQuestionSet> {
    let url = this.global.BASEURL + '/exam/questions/?course=' + course;
    let param = new HttpParams();
    param.set('course', course)
    return this.api.get<ExamQuestionSet>(url, { params: param, headers: this.headers });
  }
  public getQuestionSetSubject(course: string): Observable<ExamQuestionSetSubject> {
    let url = this.global.BASEURL + '/exam/questionssubject/?course=' + course;
    let param = new HttpParams();
    param.set('course', course)
    return this.api.get<ExamQuestionSetSubject>(url, { params: param, headers: this.headers });
  }
  // /subjects

  public getSubjectMappedToCource(course: string): Observable<Array<Options>> {
    let url = this.global.BASEURL + '/options/subjects/?course=' + course;
    let param = new HttpParams();
    param.set('course', course)
    return this.api.get<Array<Options>>(url, { headers: this.headers });
  }


  public saveExam(questionStatusList: QuestionStatus[]): Observable<string> {
    console.log('course---' + questionStatusList);
    let url = this.global.BASEURL + '/exam/saveexam'
    let param = new HttpParams();
    //  param.set('course', course)
    return this.api.post<string>(url, questionStatusList, { headers: this.headers });
  }

  public getExamNature(course: string): Observable<string> {
    let url = this.global.BASEURL + '/redirect/coursenature/?course=' + course;
    let param = new HttpParams();
    param.set('course', course)
    return this.api.get<string>(url, { headers: this.headers });
  }

  public getResult(course: string, examSeqNo: number): Observable<ExamResult> {
    let url = this.global.BASEURL + '/exam/result/?course=' + course + '&examseqno=' + examSeqNo;
    let param = new HttpParams();
    param.set('course', course);
    param.set('examseqno', examSeqNo.toString())
    //  return this.api.get<ExamResult>(url, { headers: this.headers, params: param });
    return this.api.get<ExamResult>(url, { headers: this.headers });

  }

}
