import { Component, OnInit } from '@angular/core';
import { SessionStorageService, SessionStorage } from 'ngx-store';
import { UserDetails } from '../../../model/user-details';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @SessionStorage('loginUserDetail') userDtl: UserDetails;

  constructor() { }

  ngOnInit() {
  }

}
