import { Component, OnInit } from '@angular/core';
import { BauthService } from '../../../services/bauth.service';

@Component({
  selector: 'app-bdashboard',
  templateUrl: './bdashboard.component.html',
  styleUrls: ['./bdashboard.component.css']
})
export class BdashboardComponent implements OnInit {

  id;
  requests;
  valreq;
  comrequests;
  valcomreq;
  total;
  holdReviews;
  lengthofreview;
  currentId;
  empty;

  constructor(
    private bauthService: BauthService
  ) { }

  ngOnInit() {
  }

}
