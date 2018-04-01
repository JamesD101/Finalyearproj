import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CauthService } from '../services/cauth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  redirectUrl;

  constructor(
    private authService: CauthService,
    private router: Router
  ){}
  canActivate(
    router:  ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ){
    if(this.authService.loggedInC()){
      return true;
    }else{
      this.redirectUrl = state.url;
      this.router.navigate(['/login']);
      return false;
    }
  }
}
