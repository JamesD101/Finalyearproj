import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CauthService } from '../../../../../services/cauth.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit {

  searchForm: FormGroup;
  searchedData;

  constructor(
    private formBuilder: FormBuilder,
    private cauthService: CauthService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.searchForm = this.formBuilder.group({
      category: [''],
      state: ['']
    });
  }

  onSearch() {
    const someSearch = {
      category: this.searchForm.get('category').value,
      state: this.searchForm.get('state').value
    };
    // console.log(someSearch.category);
    this.cauthService.searchBusiness(someSearch).subscribe(data => {
      if (!data.success) {
        console.log(data.message);
      } else {
        let searched = ['/search', someSearch.category, someSearch.state];
        let searches = [someSearch.category, someSearch.state];
        this.router.navigate(searched);
        this.searchedData = searches;
        this.cauthService.setSearch(searches);
        console.log(searches);
        // console.log(searched);
      }
    });
  }
  ngOnInit() {

  }

}
