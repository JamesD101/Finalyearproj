import { Component, OnInit } from '@angular/core';
import { CauthService } from '../../../services/cauth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-filterservices',
  templateUrl: './filterservices.component.html',
  styleUrls: ['./filterservices.component.css']
})
export class FilterservicesComponent implements OnInit {

  searches: any;
  dirSearch;

  constructor(
    private cauth: CauthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  runSearchP(){
    this.cauth.searchBusinessP().subscribe(data => {
      if (!data.success){
        console.log('fail');
      } else {
        this.searches = data.busers;
        this.cauth.currentSearch = this.dirSearch;
        console.log(this.cauth.currentSearch);
        // public searched;
        this.router.navigate(['/search/Photography']);
        // console.log(this.dirSearch);
      }

    });

  }

  runSearchS(){
    this.cauth.searchBusinessS().subscribe(data => {
      if (!data.success){
        console.log('fail');
      } else {
        this.dirSearch = data.busers;
        console.log(this.dirSearch);
      }

    });

  }
  runSearchE(){
    this.cauth.searchBusinessE().subscribe(data => {
      if (!data.success){
        console.log('fail');
      } else {
        this.dirSearch = data.busers;
        console.log(this.dirSearch);
      }
    });
  }
  runSearchC(){
    this.cauth.searchBusinessC().subscribe(data => {
      if (!data.success){
        console.log('fail');
      } else {
        this.dirSearch = data.busers;
        console.log(this.dirSearch);
      }
    });
  }
  runSearchM(){
    this.cauth.searchBusinessM().subscribe(data => {
      if (!data.success){
        console.log('fail');
      } else {
        this.dirSearch = data.busers;
        console.log(this.dirSearch);
      }
    });
  }
  runSearchMa(){
    this.cauth.searchBusinessMa().subscribe(data => {
      if (!data.success){
        console.log('fail');
      } else {
        this.dirSearch = data.busers;
        console.log(this.dirSearch);
      }
    });
  }
}
