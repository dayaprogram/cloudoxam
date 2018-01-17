import { Component, OnInit } from '@angular/core';
import { SessionStorageService, SessionStorage } from 'ngx-store';
import { UserDetails } from '../../../model/user-details';
import { MenuUrl } from '../../../model/menu-url';
import { AdminService } from '../../../service/admin.service';
import { AuthenticationService } from '../../../service/authentication.service';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css']
})
export class DashboardMainComponent implements OnInit {

  @SessionStorage('loginUserDetail') userDtl: UserDetails;
  @SessionStorage('MENUURLLIST') menuUrlList: MenuUrl[] = [];
  constructor(
    private adminApi: AdminService,
    private authApi: AuthenticationService,
  ) { }
  logout() {
    this.authApi.logout();
  }

  ngOnInit() {
    this.adminApi.getAllMenu().subscribe(
      data => {
        this.menuUrlList = data;
             },
      err => {
        console.log('Something went wrong!');
      },
      () => {

      });
  }
}
