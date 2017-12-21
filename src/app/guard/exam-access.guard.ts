import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { SessionStorageService, SessionStorage } from 'ngx-store';
import { UserDetails } from '../model/user-details';
@Injectable()
export class ExamAccessGuard implements CanActivate {
  constructor(private router: Router,
    private auth: AuthenticationService,
    private sessionStorageService: SessionStorageService) { }
  @SessionStorage('loginUserDetail') userDtl: UserDetails;
  canActivate() {

    if (this.userDtl.roleId === 3) {
      return true;
    } else {
      this.router.navigate(['/adm']);
      return false;
    }
  }
}
