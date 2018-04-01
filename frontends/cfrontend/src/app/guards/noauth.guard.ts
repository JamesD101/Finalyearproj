import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { CauthService } from "../services/cauth.service";

@Injectable()

export class NoauthGuard implements CanActivate {

  constructor(
    private authService: CauthService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  canActivate(){
    if(this.authService.loggedInC()){
      this.router.navigate(['/']);
      return false;
    }else{
      return true;

    }
  }
}
