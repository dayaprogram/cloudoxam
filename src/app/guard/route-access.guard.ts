import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from '../service/authentication.service';
import { SessionStorageService, SessionStorage } from 'ngx-store';
import { MenuUrl } from '../model/menu-url';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';
import { NavigationStart } from '@angular/router/src/events';

@Injectable()
export class RouteAccessGuard implements CanActivate {
  route = '';
  constructor(private router: Router,
    location: Location,
    private auth: AuthenticationService,
    private sessionStorageService: SessionStorageService) {

  }

  @SessionStorage('MENUURLLIST') menuUrlList: MenuUrl[];
  canActivate() {
    /*
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .pairwise()
      .subscribe((value: [NavigationEnd, NavigationStart]) => {

        const previousUrl = value[0].url;
        const nextUrl = value[1].url;
        // console.log(value);
        // alert(nextUrl);
        this.route = previousUrl;
      });
    const menu = this.menuUrlList.find(x => x.menuClass === this.route);
    return true;
    /* if (this.userDtl.roleId === 3) {
     } else {
       this.router.navigate(['/adm']);
       return false;
     }
   }
   */
    return true;
  }
}
