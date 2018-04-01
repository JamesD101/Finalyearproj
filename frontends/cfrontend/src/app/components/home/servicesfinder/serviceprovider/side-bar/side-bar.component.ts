import { Component, OnInit } from '@angular/core';
import { CauthService } from '../../../../../services/cauth.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  holdall:any;
  businessname ;
  email;
  address;
  city;
  category;
  state;
  id ;
  currentId;
  description;
  insbusinessname;
  insbuserid;
  inscategory;
  insusername;
  inscuserid;
  meid;
  image;
  domain = 'http://localhost:5000';
  public takeBuser: any;
  public takeCuser: any;

  constructor(
    private cauthService: CauthService,
    private router: Router,
    private activedR: ActivatedRoute,
    private http: HttpClient,
    private flashy: FlashMessagesService

  ) { }

  ngOnInit() {
    this.getSingleSP(this.activedR.snapshot.params['id']);
    }

    getSingleSP(id) {
      this.http.get(this.domain + '/cauthentication/singleserviceprovider/'+id).subscribe(data => {
        this.holdall = data;
        this.meid = this.holdall.buser._id;
        this.businessname = this.holdall.buser.businessname;
        this.email = this.holdall.buser.email;
        this.address = this.holdall.buser.address;
        this.city = this.holdall.buser.city;
        this.category = this.holdall.buser.category;
        this.description = this.holdall.buser.description;
        this.image = this.holdall.buser.image;
      });
    }

    hirepro(){
     this.currentId = this.activedR.snapshot.params['id'];
     this.http.get(this.domain + '/cauthentication/singleserviceprovider/'+ this.currentId).subscribe(data => {
       this.takeBuser = data;
       this.insbusinessname = this.takeBuser.buser.businessname;
       this.insbuserid = this.takeBuser.buser._id;
       this.inscategory = this.takeBuser.buser.category;
       this.cauthService.getProfile().subscribe(data => {
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
         this.cauthService.sendRequest(essRequest).subscribe(data => {
            if (!data.success) {
              console.log('An Error Occurred');
            } else {
              this.flashy.show('Request sent', {cssClass: 'alert-success'});
            }
         });
         this.cauthService.sendRrequest(essRequest).subscribe(data => {
           if (!data.success) {
             console.log('An Error Occurred');
           } else {
             // this.flashy.show('Request sent', {cssClass: 'alert-success'});
           }
         });
       });
     });
    }


}
