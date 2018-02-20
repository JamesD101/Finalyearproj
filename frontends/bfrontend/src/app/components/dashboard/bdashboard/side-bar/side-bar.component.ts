import { Component, OnInit } from '@angular/core';
import { BauthService } from '../../../../services/bauth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  businessname ;
  email;
  address;
  city;
  category;
  state;
  id ;

  constructor(private bauthService: BauthService) { }

  ngOnInit() {
    this.bauthService.getProfile().subscribe(profile => {
      this.businessname = profile.buser.businessname;
      this.email = profile.buser.email;
      this.address = profile.buser.address;
      this.city = profile.buser.city;
      this.state = profile.buser.state;
      this.category = profile.buser.category;
      // this.id = profile.buser._id;
    });
  }

}
