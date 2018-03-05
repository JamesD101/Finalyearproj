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

  constructor(
    private bauthService: BauthService
  ) { }

  ngOnInit() {
    this.bauthService.getProfile().subscribe(profile => {
      this.id = profile.buser._id;
      this.bauthService.checkRequest(this.id).subscribe(data => {
        this.requests = data.somereq;
        this.valreq = this.requests.length;
        this.bauthService.confirmedRequest(this.id).subscribe(data => {
          this.comrequests = data.somereq;
          this.valcomreq = this.comrequests.length;
          this.total = this.valreq + this.valcomreq;
        });
      });
      this.bauthService.confirmedRequest(this.id).subscribe(data => {
        this.comrequests = data.somereq;
        this.valcomreq = this.comrequests.length;
      });
    });
  }

}
