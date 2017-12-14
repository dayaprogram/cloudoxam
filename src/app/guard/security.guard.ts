import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class SecurityGuard implements CanActivate {
  // canActivate(
  //  next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //    return true;
  // }
  // }

  constructor(private router: Router, private auth: AuthenticationService) { }

  canActivate() {
    if (this.auth.checkCredentials()) {
      // logged in so return true

      return true;
    } else {
      // not logged in so redirect to login page
     // this.router.navigate(['/login']);
      return true;
    }
  }
}
