import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import { CauthService } from '../../../../services/cauth.service';

@Component({
  selector: 'app-drop-search',
  templateUrl: './drop-search.component.html',
  styleUrls: ['./drop-search.component.css']
})
export class DropSearchComponent implements OnInit {

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
    this.createForm();
  }

  ngOnInit() {

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

}
