import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CauthService } from '../../../../../services/cauth.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  currentId;
  reviews:any;
  originalrev: any;
  lengthofreview;
  u;
  r;
  empty: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cauth: CauthService
  ) { }

  ngOnInit() {
    this.currentId = this.activatedRoute.snapshot.params['id'];

    this.cauth.getReviews(this.currentId).subscribe(data => {
      if (!data.success) {
        console.log('No review was found');
      } else {
        this.lengthofreview = data.review.length;
        if (this.lengthofreview != 0 ) {
          // this.empty = true;
          // } else {
          this.empty = false;
          this.originalrev = data.review;
        } else {
          this.empty = true;
        }
        // for (var i = 0; i <= this.lengthofreview; i++){
        //   this.reviews.push(this.originalrev[i]);
        //   console.log(this.reviews);
        // console.log(this.originalrev);
      }
    });
  }

}
