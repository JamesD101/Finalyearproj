import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import { CauthService } from '../../../../services/cauth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.css']
})
export class FilterSearchComponent implements OnInit {

  message;
  messageClass;
  insbusinessname;
  insbuserid;
  inscategory;
  insusername;
  inscuserid;
  category;
  takeBuser: any;
  takeCuser: any;
  empty: boolean;
  searches: any;
  loggedIn;
  domain = 'http://localhost:5000';

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private cauth: CauthService,
    private flashMessagesService: FlashMessagesService,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.category = this.route.snapshot.params['category'];
    this.cauth.searchAll(this.category).subscribe(data => {
      if(!data.success){
        console.log(data.message);
      } else {
        // console.log(data);
        this.searches = data.busers;
        // window.location.reload();
      }
    });
  }
  runSearchP(){
    this.cauth.searchBusinessP().subscribe(data => {
      if(!data.success){
        console.log(data.message);
      } else {
        // console.log(data);
        this.searches = data.busers;
        // window.location.reload();
      }
    });
  }
  runSearchC(){
    this.cauth.searchBusinessC().subscribe(data => {
      if(!data.success){
        console.log(data.message);
      } else {
        // console.log(data);
        this.searches = data.busers;
        // window.location.reload();
      }
    });
  }
  runSearchMa(){
    this.cauth.searchBusinessMa().subscribe(data => {
      if(!data.success){
        console.log(data.message);
      } else {
        // console.log(data);
        this.searches = data.busers;
        // window.location.reload();
      }
    });
  }
  runSearchM(){
    this.cauth.searchBusinessM().subscribe(data => {
      if(!data.success){
        console.log(data.message);
      } else {
        // console.log(data);
        this.searches = data.busers;
        // window.location.reload();
      }
    });
  }
  runSearchS(){
    this.cauth.searchBusinessS().subscribe(data => {
      if(!data.success){
        console.log(data.message);
      } else {
        // console.log(data);
        this.searches = data.busers;
        // window.location.reload();
      }
    });
  }
  runSearchE(){
    this.cauth.searchBusinessE().subscribe(data => {
      if(!data.success){
        console.log(data.message);
      } else {
        // console.log(data);
        this.searches = data.busers;
        // window.location.reload();
      }
    });
  }

  hirepro(currentId){
    this.http.get(this.domain + '/cauthentication/singleserviceprovider/'+ currentId).subscribe(data => {
      this.takeBuser = data;
      this.insbusinessname = this.takeBuser.buser.businessname;
      this.insbuserid = this.takeBuser.buser._id;
      this.inscategory = this.takeBuser.buser.category;
      this.cauth.getProfile().subscribe(data => {
        this.takeCuser = data;
        this.inscuserid = this.takeCuser.cuser._id;
        this.insusername = this.takeCuser.cuser.username;
        const essRequest = {
          businessname: this.insbusinessname,
          status: 'Pending',
          cuserId: this.inscuserid,
          username: this.insusername,
          buserId: this.insbuserid,
          category: this.inscategory
        }
        console.log(essRequest);
        this.cauth.sendRequest(essRequest).subscribe(data => {
          if (!data.success) {
            console.log('An Error Occurred');
          } else {
            this.message = 'Request sent';
            this.messageClass = 'alert alert-success';
          }
        });
        this.cauth.sendRrequest(essRequest).subscribe(data => {
          if (!data.success) {
            console.log('An Error Occurred');
          } else {
            // this.message = 'Request sent';
            // this.messageClass = 'alert alert-success';
          }
        });
      });
    });
  }

  addtoview(id){
    this.cauth.addtoViews(id).subscribe(data => {
      if (!data.success) {
        console.log(data.message);
      } else {
        console.log('Added');
      }
    });
  }

}
