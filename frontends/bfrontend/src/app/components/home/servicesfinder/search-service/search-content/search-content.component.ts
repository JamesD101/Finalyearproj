import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import { CauthService } from '../../../../../services/cauth.service';

@Component({
  selector: 'app-search-content',
  templateUrl: './search-content.component.html',
  styleUrls: ['./search-content.component.css']
})
export class SearchContentComponent implements OnInit {

  searches: any;
  data;
  searchme: any;
  searchForm: FormGroup;
  searchedData: any;
  searched;
  allCategory: string[] = ['Select a category', 'Photography', 'Makeup Artist', 'Stylist', 'MC', 'Catering'];
  defaultcat= 'Select a category';
  allState: string[] = ['Select a state', 'Abuja', 'Adamawa', 'Kaduna', 'Kano', 'Kwara', 'Lagos', 'Ogun', 'Ondo', 'Osun', 'Plateau'];
  defaultstate= 'Select a state';
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private cauth: CauthService
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
    // console.log(someSearch.category);
    this.cauth.searchBusiness(someSearch).subscribe(data => {
      if (!data.success) {
        console.log(data.message);
      } else {
        this.searched = ['/search', someSearch.category, someSearch.state];
        // let searches = [someSearch.category, someSearch.state];
        this.router.navigate(this.searched);
        this.searches = data.busers;
      }
    });
  }

  newSearch() {
    // this.bauth.changeSearch(''
    const newSearch = {
      category: this.route.snapshot.paramMap.get('category'),
      state: this.route.snapshot.paramMap.get('state')
    };
    this.cauth.searchBusiness(newSearch).subscribe(data => {
      if (!data.success) {
        console.log('fail');
      } else {
        this.searches = data.busers;
        console.log(this.searches);
        console.log(this.data);
        console.log(this.searchme);
      }
    });
  }

}
