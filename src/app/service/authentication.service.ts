import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient, HttpResponse, HttpHeaders, HttpParams, } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable';
import { Global } from '../Globel'

@Injectable()
export class AuthenticationService {

  public static expairyTime: number = new Date().getTime() - 1;
  // + (1000 * 60 * 60 * 24 * 365 * 5);

  constructor(
    private _router: Router,
    private _http: HttpClient,
    private cookieService: CookieService,
    private global: Global
  ) { }

  obtainAccessToken(loginData: any) {
    let params = new HttpParams();
    params.append('username', 'bill');
    params.append('password', 'abc123');
    params.append('grant_type', 'password');
    params.append('client_id', 'my-trusted-client');

    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Accept': 'application/json',
      //  'Authorization': 'Basic ' + btoa("my-trusted-client:secret")
    });
    //  let url = this.BASEURL + '/oauth/token?grant_type=password&username=bill&password=abc123';
    let url = this.global.BASEURL + '/oauth/token?grant_type=password&scope=read+write+trust&client_id=my-trusted-client&client_secret=secret&username=' + loginData.userid + '&password=' + loginData.password;
    this._http.post(url, { headers: headers }).subscribe(
      (val) => {
        this.saveToken(val);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
  }

  saveToken(token) {
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.cookieService.set("access_token", token.access_token, expireDate);
    AuthenticationService.expairyTime = expireDate;
    this._router.navigate(['/course']);
  }
  checkCredentials() {

    if (AuthenticationService.expairyTime > new Date().getTime()) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.cookieService.delete('access_token');
    this._router.navigate(['/']);
  }
}
