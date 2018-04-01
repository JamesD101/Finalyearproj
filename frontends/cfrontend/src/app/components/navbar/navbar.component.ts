import { Component, OnInit } from '@angular/core';
import { CauthService } from '../../services/cauth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  displayblogin = false;
  disp: any;
  isValid: boolean = true;
  id;
  all;

  constructor(
              private cauthService: CauthService,
              private router: Router,
              private flashMessagesService: FlashMessagesService,
              private location: Location
  ) {

  }


  loggedCustomerIn(){
    if (this.cauthService.loggedInC()){
      return true;
    } else {
      return false;
    }
  }

  goBack(){
    this.location.back();
  }
  onLogoutCustomerClick() {
    this.cauthService.logoutCustomer();
    this.flashMessagesService.show('You are logged out', {cssClass: 'alert-info'});
    this.router.navigate(['/login']);

  }
  ngOnInit() {
  }

}


