import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import { CauthService } from '../../../../../services/cauth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-search-content',
  templateUrl: './search-content.component.html',
  styleUrls: ['./search-content.component.css']
})
export class SearchContentComponent implements OnInit {

  message;
  messageClass;
  insbusinessname;
  insbuserid;
  inscategory;
  insusername;
  inscuserid;
  takeBuser: any;
  takeCuser: any;
  domain = 'http://localhost:5000';
  empty: boolean;
  searches: any;
  data;
  searchme: any;
  searchForm: FormGroup;
  searchedData: any;
  searched;
  loggedIn;
  allCategory: string[] = ['Select a category', 'Photography', 'Makeup Artist', 'Stylist', 'MC', 'Catering'];
  defaultcat= 'Select a category';
  allState: string[] = ['Select a state', 'Abuja', 'Adamawa', 'Kaduna', 'Kano', 'Kwara', 'Lagos', 'Ogun', 'Ondo', 'Osun', 'Plateau'];
  defaultstate= 'Select a state';
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private cauth: CauthService,
    private flashMessagesService: FlashMessagesService,
    private http: HttpClient
  ) {
    this.searchme = cauth.currentSearch.subscribe(data => this.data = data);
    // this.newSearch();
    this.createForm();
  }

  // (holdService);

  ngOnInit() {
    this.newSearch();

  }
  createForm() {
    this.searchForm = this.formBuilder.group({
      category: [''],
      state: ['']
    });
    this.searchForm.controls['category'].setValue(this.defaultcat, {onlySelf: true});
    this.searchForm.controls['state'].setValue(this.defaultstate, {onlySelf: true});
  }

  onSearch() {
    const someSearch = {
      category: this.searchForm.get('category').value,
      state: this.searchForm.get('state').value
    };
    this.newSearch();
    console.log(someSearch.category);
    this.cauth.searchBusiness(someSearch).subscribe(data => {
      if (!data.success) {
        console.log(data.message);
      } else {
        // this.searched = ['/search', someSearch.category, someSearch.state];
        // this.router.navigate(this.searched);
        this.searches = data.busers;
        if (this.searches != 0 ) {
          // this.empty = true;
        // } else {
          this.empty = false;
          this.searches = data.busers;
        } else {
          this.empty = true;
          // console.log("Hy");
        }
      }
    });
  }

  newSearch() {
    const newSearch = {
      category: this.route.snapshot.paramMap.get('category'),
      state: this.route.snapshot.paramMap.get('state')
    };
    this.cauth.searchBusiness(newSearch).subscribe(data => {
      if (!data.success) {
        console.log('fail');
      } else {
        this.searches = data.busers;
        if (this.searches != 0 ) {
          // this.empty = true;
          // } else {
          this.empty = false;
          this.searches = data.busers;
        } else {
          this.empty = true;
          // console.log("Hy");
        }
      }
    });
  }

  hirepro(currentId){
    if(this.cauth.loggedInC()){
      // this.currentId = this.activedR.snapshot.params['id'];
      this.cauth.hirepro(currentId).subscribe(data => {
        // console.log(data);
        this.takeBuser = data;
        this.insbusinessname = this.takeBuser.buser.businessname;
        this.insbuserid = this.takeBuser.buser._id;
        this.inscategory = this.takeBuser.buser.category;
        this.cauth.getProfile().subscribe(data => {
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
          this.cauth.sendRequest(essRequest).subscribe(data => {
            if (!data.success) {
              console.log('An Error Occurred');
            } else {
              this.flashMessagesService.show('Request sent', {cssClass: 'alert-success'});
            }
          });
          this.cauth.sendRrequest(essRequest).subscribe(data => {
            if (!data.success) {
              console.log('An Error Occurred');
            } else {
              // this.flashy.show('Request sent', {cssClass: 'alert-success'});
            }
          });
        });
      });
    }
    else {
      this.flashMessagesService.show('You must be logged In to Hire the Service Provider', {cssClass: 'alert-danger'});
    }
  }

  addtoview(id){
    this.cauth.addtoViews(id).subscribe(data => {
      if (!data.success) {
        console.log(data.message);
      } else {
        console.log('Added');
      }
    });
  }


}
