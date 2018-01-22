import { Component, OnInit } from '@angular/core';
import { BauthService } from '../../services/bauth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  displayblogin = false;

  constructor( private bauthService: BauthService,
               private router: Router,
               private flashMessagesService: FlashMessagesService
  ) { }

  onLogoutClick() {
    this.bauthService.logoutBusiness();
    this.flashMessagesService.show('You are logged out', { cssClass: 'alert-info' });
    this.router.navigate(['/login/blogin']);

  }

  ngOnInit() {
  }

}
