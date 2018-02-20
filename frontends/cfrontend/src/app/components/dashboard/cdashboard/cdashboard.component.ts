import { Component, OnInit } from '@angular/core';
import { CauthService } from '../../../services/cauth.service';

@Component({
  selector: 'app-cdashboard',
  templateUrl: './cdashboard.component.html',
  styleUrls: ['./cdashboard.component.css']
})
export class CdashboardComponent implements OnInit {

  id;
  constructor(private cauthService: CauthService) { }

  ngOnInit() {
    // this.cauthService.getProfile().subscribe(profile => {
    //   this.id = profile.cuser._id;
    //   // this.id = profile.buser._id;
    // });
  }

}
