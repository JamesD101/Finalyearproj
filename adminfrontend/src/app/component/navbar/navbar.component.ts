import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  displayblogin = false;
  disp: any;
  isValid: boolean = true;


  constructor(private authService: AuthService,
              private router: Router,
              private flashMessagesService: FlashMessagesService ) {

  }

  onLogoutUser() {
    this.authService.logoutUser();
    this.flashMessagesService.show('You are logged out', {cssClass: 'alert-info'});
    this.router.navigate(['/login']);

  }

  ngOnInit() {

  }

}


