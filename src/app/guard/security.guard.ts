import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { LocalStorageService, LocalStorage } from 'ngx-store';
@Injectable()
export class SecurityGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthenticationService) { }
  @LocalStorage('userExpairyTime') userExpairyTime: number;
  canActivate() {
    if (this.userExpairyTime > new Date().getTime()) {
      // logged in so return true
      return true;
    } else {
      // not logged in so redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
