import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams, } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable';
import { Global } from '../Globel';
import { CookiesStorageService, LocalStorageService, SessionStorageService, SharedStorageService } from 'ngx-store';
import { CookieStorage, LocalStorage, SessionStorage } from 'ngx-store';

import { UserDetails } from '../model/user-details';

@Injectable()
export class AuthenticationService {
  public static expairyTime: number = new Date().getTime() - 1;

  // it will be stored under ${prefix}itWillBeRemovedAfterBrowserClose in session storage
  @SessionStorage({ key: 'itWillBeRemovedAfterBrowserClose' }) accesToken: string;
  @SessionStorage({ key: 'loginUserDetail' }) loginUserDetail: UserDetails = new UserDetails();
  @LocalStorage('userExpairyTime') userExpairyTime: number;
  // + (1000 * 60 * 60 * 24 * 365 * 5);

  constructor(
    private _router: Router,
    private _http: HttpClient,
    private cookieService: CookieService,
    private global: Global,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private cookiesStorageService: CookiesStorageService,
    private sharedStorageService: SharedStorageService,
  ) { }

  headers: any;

  public saveSomeData(object: Object, array: Array<any>) {
    this.localStorageService.set('someObject', object);
    this.sessionStorageService.set('someArray', array);
    this.localStorageService.keys.forEach((key) => {
      console.log(key + ' =', this.localStorageService.get(key));
    });
  }

  public clearLocalData(): void {
    this.localStorageService.clear('decorators'); // removes only variables created by decorating functions
    this.localStorageService.clear('prefix'); // removes variables starting with set prefix (including decorators)
    this.sessionStorageService.clear('all'); // removes all session storage data
  }

  obtainAccessToken(loginData: any) {
    const params = new HttpParams();
    params.append('username', 'bill');
    params.append('password', '123456');
    params.append('grant_type', 'password');
    params.append('client_id', 'my-trusted-client');

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Accept': 'application/json',
      //  'Authorization': 'Basic ' + btoa("my-trusted-client:secret")
    });
    //  let url = this.BASEURL + '/oauth/token?grant_type=password&username=bill&password=abc123';
    const url = this.global.BASEURL + '/oauth/token?grant_type=password&scope=read+write+trust&' +
      'client_id=my-trusted-client&client_secret=secret&username=' + loginData.userid + '&password=' + loginData.password;
    this._http.post(url, { headers: headers }).subscribe(
      (val) => {
        this.cookieService.delete('access_token');
        this.saveToken(val);
      },
      response => {
        console.log('POST call in error', response);
      },
      () => {

      });
  }

  saveToken(token) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.cookieService.set('access_token', token.access_token, expireDate);
    AuthenticationService.expairyTime = expireDate;
    this.userExpairyTime = expireDate;
    this.headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json;charset=utf-8',
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    this.getLoginUserDetails().subscribe(
      data => {
        this.loginUserDetail = data;
      },
      err => {
        console.log('Something went wrong!');
      }, () => {
        this.redirectManage();
      }
    );
  }

  checkCredentials() {
    //  alert(this.userExpairyTime);
    if (this.userExpairyTime > new Date().getTime()) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.cookieService.delete('access_token');
    this.userExpairyTime = 0;
    this._router.navigate(['/login']);
  }

  public getLoginUserDetails(): Observable<UserDetails> {
    const url = this.global.BASEURL + '/redirect/userdetail';
    return this._http.get<UserDetails>(url, { headers: this.headers });
  }

  private redirectManage() {
    if (this.loginUserDetail.roleId !== 3) {
      this._router.navigate(['/adm']);
    } else {
      this._router.navigate(['/course']);
    }
  }
}
