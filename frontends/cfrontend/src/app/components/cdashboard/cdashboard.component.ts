import { Component, OnInit } from '@angular/core';
import { CauthService } from '../../services/cauth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-cdashboard',
  templateUrl: './cdashboard.component.html',
  styleUrls: ['./cdashboard.component.css']
})
export class CdashboardComponent implements OnInit {

  revForm: FormGroup;
  message;
  messageClass;
  id;
  requests;
  comrequests;
  reqId;
  singleReq;
  all;
  username;
  businessname;
  empty = false;
  empt = false;

  constructor(private cauthService: CauthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
    this.cauthService.getProfile().subscribe(data => {
      // this.id = cuser._id;
      if (!data.success) {
        console.log(data.message);
      } else {
        this.all = data.cuser;
        // console.log(this.all);
        this.id = this.all._id;
        console.log(this.id);
      }
      this.cauthService.checkRequest(this.id).subscribe(data => {
        this.requests = data.somereq;
        if (this.requests.length < 1) {
          this.empty = true;
        } else {
          this.requests = data.somereq;
        }
        // console.log(this.request);
      });
      this.cauthService.checkconfirmedRequest(this.id).subscribe(data => {
        this.comrequests = data.somereq;
        if (this.comrequests.length < 1) {
          this.empt = true;
        } else {
          this.comrequests = data.somereq;
        }
        // console.log(this.request);
      });

    });

  }

  getInfo(businessname) {
    this.cauthService.getProfile().subscribe(data => {
      this.username = data.cuser.username;
      this.businessname = businessname;
    });
  }

  change(id){
    this.cauthService.getSingleReq(id).subscribe(data => {
      this.singleReq = data.request;
      this.reqId = this.singleReq._id;
      // console.log(this.singleReq);
      // console.log(this.reqId);
    });
  }

  changestat(){
    this.cauthService.changeStatus(this.reqId).subscribe(data => {
      if (!data.success) {
        this.message = 'An Error Occurred';
        this.messageClass = 'alert alert-danger';
      } else {
        this.message = 'Successfully changed the status';
        this.messageClass = 'alert alert-success';
        window.location.reload();
      }
    });
  }

  deletereq(id){
    this.cauthService.deleteReq(id).subscribe(data => {
      if (!data.success) {
        this.message = data.message;
        this.messageClass = 'alert alert-danger';
      } else {
        this.message = data.message;
        this.messageClass = 'alert alert-success';
        window.location.reload();
      }
    });
  }


  createForm() {
    this.revForm = this.formBuilder.group({
      // id: [''],
      username: ['', Validators.required],
      businessname: ['', Validators.required],
      review: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(130),
        Validators.required
      ])],
    });
    this.revForm.controls['username'].disable();
    this.revForm.controls['businessname'].disable();
  }

  review(){
    const review = {
      username : this.revForm.get('username').value,
      businessname: this.revForm.get('businessname').value,
      review: this.revForm.get('review').value
    };
    this.cauthService.addReview(review).subscribe(data => {
      if (!data.success) {
        this.message = 'An error occurred';
        this.messageClass = 'alert alert-danger';
      } else {
        this.message = 'Review sent successfully';
        this.messageClass = 'alert alert-success';
        this.revForm.controls['review'].disable();
        // window.location.reload();
      }
    });
  }


}
