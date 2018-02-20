import { Component, OnInit } from '@angular/core';
import { BauthService } from '../../../services/bauth.service';

@Component({
  selector: 'app-bdashboard',
  templateUrl: './bdashboard.component.html',
  styleUrls: ['./bdashboard.component.css']
})
export class BdashboardComponent implements OnInit {

  id;

  constructor(
    private bauthService: BauthService
  ) { }

  ngOnInit() {
    this.bauthService.getProfile().subscribe(profile => {
      this.id = profile.buser._id;
      // this.id = profile.buser._id;
    });
  }

}
