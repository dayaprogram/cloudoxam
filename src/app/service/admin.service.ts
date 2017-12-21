import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams, } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable';
import { Options } from '../model/options';
import { Global } from '../Globel';
import { QuestionSet } from '../model/question-set';

@Injectable()
export class AdminService {

  constructor(
    private router: Router,
    private api: HttpClient,
    private cookieService: CookieService,
    private global: Global
  ) { }
  // accesTcn = '?access_token=' + this.cookieService.get('access_token');
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json;charset=utf-8',
    'Authorization': 'Bearer ' + this.cookieService.get('access_token')
  });

  public getCoursesSubjectWies(subject: string): Observable<Array<Options>> {
    const url = this.global.BASEURL + '/options/coursessub/?subject=' + subject;
    return this.api.get<Array<Options>>(url, { headers: this.headers });
  }

  public getAllSubject(): Observable<Array<Options>> {
    const url = this.global.BASEURL + '/options/subjectall';
    return this.api.get<Array<Options>>(url, { headers: this.headers });
  }

  public getQuestionLevel(): Observable<Array<Options>> {
    const url = this.global.BASEURL + '/options/questionlevel';
    return this.api.get<Array<Options>>(url, { headers: this.headers });
  }

  public getSubjestChapters(subject: string): Observable<Array<Options>> {
    const url = this.global.BASEURL + '/options/chapters/?subject=' + subject;
    return this.api.get<Array<Options>>(url, { headers: this.headers });
  }

  public saveMcqQuestionSet(mcqQuestionSet: QuestionSet): Observable<string> {
    const url = this.global.BASEURL + '/adm/savemcq';
    return this.api.post<string>(url, mcqQuestionSet, { headers: this.headers });
  }


}
