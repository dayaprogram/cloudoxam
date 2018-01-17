import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams, } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable';
import { Options } from '../model/options';
import { Global } from '../Globel';
import { QuestionSet } from '../model/question-set';
import { StudentDetails } from '../model/student-details';
import { ExamRateDetail } from '../model/exam-rate-detail';
import { MenuUrl } from '../model/menu-url';
import { ExamSetDetail } from '../model/exam-set-detail';
import { ResultDetail } from '../model/result-detail';


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

  public getAllCources(): Observable<Array<Options>> {
    const url = this.global.BASEURL + '/options/allcourse';
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

  public makeExamCoursePayment(examRateDetailList: ExamRateDetail[]): Observable<string> {
    const url = this.global.BASEURL + '/adm/makecoursepayment';
    return this.api.post<string>(url, examRateDetailList, { headers: this.headers });
  }

  public saveStudentDetail(studentDetails: StudentDetails): Observable<string> {
    const url = this.global.BASEURL + '/student/savestudentdetail';
    return this.api.post<string>(url, studentDetails, { headers: this.headers });
  }

  public getGender(): Observable<Array<Options>> {
    const url = this.global.BASEURL + '/options/gender';
    return this.api.get<Array<Options>>(url, { headers: this.headers });
  }

  public getCatagory(): Observable<Array<Options>> {
    const url = this.global.BASEURL + '/options/catagory';
    return this.api.get<Array<Options>>(url, { headers: this.headers });
  }

  public getFamilyIncomeRange(): Observable<Array<Options>> {
    const url = this.global.BASEURL + '/options/familyincomrange';
    return this.api.get<Array<Options>>(url, { headers: this.headers });
  }

  public getExamRateList(): Observable<Array<ExamRateDetail>> {
    const url = this.global.BASEURL + '/options/examratelist';
    return this.api.get<Array<ExamRateDetail>>(url, { headers: this.headers });
  }

  public getAllMenu(): Observable<Array<MenuUrl>> {
    const url = this.global.BASEURL + '/options/examratelist';
    return this.api.get<Array<MenuUrl>>(url, { headers: this.headers });
  }

  public getExamSetDtlList(): Observable<Array<ExamSetDetail>> {
    const url = this.global.BASEURL + '/adm/examsetlist';
    return this.api.get<Array<ExamSetDetail>>(url, { headers: this.headers });
  }

  public getQuestionPaperWithResult(courseId: string, examSeqNo: number): Observable<Array<QuestionSet>> {
    const url = this.global.BASEURL + '/adm/questionpaper/?course=' + courseId + '&examseqno=' + examSeqNo;
    return this.api.get<Array<QuestionSet>>(url, { headers: this.headers });
  }

  public getSubjectResult(courseId: string, examSeqNo: number): Observable<Array<ResultDetail>> {
    const url = this.global.BASEURL + '/adm/getsubjectresult/?course=' + courseId + '&examseqno=' + examSeqNo;
    return this.api.get<Array<ResultDetail>>(url, { headers: this.headers });
  }
}
