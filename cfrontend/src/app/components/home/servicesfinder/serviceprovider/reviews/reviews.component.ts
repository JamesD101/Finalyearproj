import { Component, OnInit } from '@angular/core';
import { CauthService } from '../../../../../services/cauth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  holdall;
  currentId;
  requests;
  comrequests;
  valreq;
  valcomreq;
  total;
  views;
  domain = 'http://localhost:5000';
  empty;
  holdReviews;
  lengthofreview;

  constructor(
    private cauthService: CauthService,
    private router: Router,
    private activedR: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    var myid = this.activedR.snapshot.params['id'];
    this.http.get(this.domain + '/cauthentication/singleserviceprovider/'+myid).subscribe(data => {
      this.holdall = data;
      this.views = this.holdall.buser.views;
    });
    this.cauthService.checkBRequest(myid).subscribe(data => {
      this.requests = data.somereq;
      this.valreq = this.requests.length;
      this.cauthService.checkconfirmedBRequest(myid).subscribe(data => {
        this.comrequests = data.somereq;
        this.valcomreq = this.comrequests.length;
        this.total = this.valreq + this.valcomreq;
      });
    });
    this.cauthService.checkconfirmedBRequest(myid).subscribe(data => {
      this.comrequests = data.somereq;
      this.valcomreq = this.comrequests.length;
    });

    this.cauthService.getReviews(myid).subscribe(data => {
      if (!data.success) {
        console.log('error');
      } else {
        this.lengthofreview = data.review.length;
        if (this.lengthofreview != 0) {
          this.holdReviews = data.review;
          this.empty = false;
        } else {
          this.empty = true;
        }
      }
    });
  }

}
