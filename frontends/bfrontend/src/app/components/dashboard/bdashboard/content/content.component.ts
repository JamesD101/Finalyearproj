import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BauthService } from '../../../../services/bauth.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  currentId;
  holdReviews;
  lengthofreview;
  empty;

  constructor(
    private bauth: BauthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.bauth.getProfile().subscribe(profile => {
      if (!profile.success) {
        console.log('Error');
      } else {
        this.currentId = profile.buser._id;
        this.bauth.getReviews(this.currentId).subscribe(data => {
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
    });
  }

}
