import { Component, OnInit } from '@angular/core';
import { CauthService } from '../../../../services/cauth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-serviceprovider',
  templateUrl: './serviceprovider.component.html',
  styleUrls: ['./serviceprovider.component.css']
})
export class ServiceproviderComponent implements OnInit {

  currentId;
  requests;
  comrequests;
  valreq;
  valcomreq;
  total;

  constructor(
    private cauthService: CauthService,
    private router: Router,
    private activedR: ActivatedRoute
  ) { }

  ngOnInit() {
    var myid = this.activedR.snapshot.params['id'];
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


  }

}
