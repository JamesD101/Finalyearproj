import { Component, OnInit } from '@angular/core';
import { CauthService } from '../../../../services/cauth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-serviceprovider',
  templateUrl: './serviceprovider.component.html',
  styleUrls: ['./serviceprovider.component.css']
})
export class ServiceproviderComponent implements OnInit {


  constructor(
    private cauthService: CauthService,
    private router: Router,
    private activedR: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }

}
