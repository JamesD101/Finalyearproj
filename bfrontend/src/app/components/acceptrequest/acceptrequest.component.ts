import { Component, OnInit } from '@angular/core';
import { BauthService } from '../../services/bauth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-acceptrequest',
  templateUrl: './acceptrequest.component.html',
  styleUrls: ['./acceptrequest.component.css']
})
export class AcceptrequestComponent implements OnInit {

  message;
  messageClass;
  all;
  id;
  empty = false;
  empt = false;
  comrequests;
  singleReq;
  reqId;

  constructor(
    private bauth: BauthService,
    private router: Router,
    private act: ActivatedRoute
  ) { }

  ngOnInit() {
    this.bauth.getProfile().subscribe(data => {
      if (!data.success) {
        console.log(data.message);
      } else {
        this.all = data.buser;
        this.id = this.all._id;
      }
      this.bauth.confirmedRequest(this.id).subscribe(data => {
        this.comrequests = data.somereq;
        if (this.comrequests.length < 1) {
          this.empt = true;
        } else {
          this.comrequests = data.somereq;
          console.log(this.comrequests);
        }
      });
    });
  }

  gettingId(id){
    this.bauth.getSingleReq(id).subscribe(data => {
      // console.log(data.request);
      this.singleReq = data.request;
      this.reqId = this.singleReq._id;
    });
  }

  delete() {
    this.bauth.deleteReq(this.reqId).subscribe(data => {
      if (!data.success) {
        this.message = data.message;
        this.messageClass = 'alert alert-danger';
      } else {
        this.message = 'Request has been deleted';
        this.messageClass = 'alert alert-success';
        window.location.reload();
      }
    });
  }

  accept(){
    this.bauth.acceptReq(this.reqId).subscribe(data => {
      if (!data.success) {
        this.message = data.message;
        this.messageClass = 'alert alert-danger';
      } else {
        this.message = 'Request Accepted';
        this.messageClass = 'alert alert-success';
        window.location.reload();
      }
    });
  }



}
