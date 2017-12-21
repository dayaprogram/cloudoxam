import { Component, OnInit } from '@angular/core';
import { SessionStorageService, SessionStorage } from 'ngx-store';
import { UserDetails } from '../../../model/user-details';
@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css']
})
export class DashboardMainComponent implements OnInit {

  @SessionStorage('loginUserDetail') userDtl: UserDetails;

  constructor() { }

  ngOnInit() {
  }

}
