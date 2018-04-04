import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  mybusers;
  myb;
  myc;myj;myt
  mycusers;
  myreq;
  myaccreq;
  empty = false;
  empt = false;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.getAllBuser().subscribe(data => {
      if(!data.success) {
        console.log('An error occurred');
      } else {
        this.mybusers = data.busers;
        this.myb = this.mybusers.length;
      }
    });
    this.auth.getAllCuser().subscribe(data => {
      if(!data.success) {
        console.log('An error occurred');
      } else {
        this.mycusers = data.cusers;
        this.myc = this.mycusers.length;
      }
    });
    this.auth.getAllReq().subscribe(data => {
      if(!data.success) {
        console.log('An error occurred');
      } else {
        this.myreq = data.requests;
        this.myj = this.myreq.length;
        if (this.myj < 0) {
          this.empt = true;
        }
      }
    });
    this.auth.getAllTransaction().subscribe(data => {
      if(!data.success) {
        console.log('An error occurred');
      } else {
        this.myaccreq = data.accs;
        console.log(this.myaccreq);
        this.myt = this.myaccreq.length;
        if (this.myt < 0) {
          this.empty = true;
        }
      }
    });
  }


}
