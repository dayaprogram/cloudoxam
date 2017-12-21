import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../service/authentication.service';
import { Global } from '../../../Globel';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthenticationService,
    private globels: Global,
    private location: PlatformLocation
  ) { }

  loginData: any = {
    userid: '',
    password: ''
  };
  getAuthentication() {
    this.auth.obtainAccessToken(this.loginData);
  }
  ngOnInit(): void {
    this.location.onPopState(() => {
      // Do whatever you want
    });
  }
}
