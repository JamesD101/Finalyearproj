import { Component, OnInit } from '@angular/core';
import {CauthService} from '../../../../../services/cauth.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {

  id;
  works;
  myworks = [];
  mine: number;

  constructor(
    private cauthService: CauthService,
    private router: Router,
    private activedR: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.id = this.activedR.snapshot.params['id'];
    this.cauthService.getUploadPics(this.id).subscribe(data => {
      if (data.success){
        // this.works = data.work[0].imgpath;
        this.works = data.work;
        for (this.mine = 0; this.mine < this.works.length; this.mine++) {
          this.myworks.push("../../../../../assets/uploads/"+this.works[this.mine].imgpath);
        }
      } else {
        console.log(data.message);
      }
    });
  }

}
