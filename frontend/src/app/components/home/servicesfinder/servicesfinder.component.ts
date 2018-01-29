import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BauthService } from '../../../services/bauth.service';

@Component({
  selector: 'app-servicesfinder',
  templateUrl: './servicesfinder.component.html',
  styleUrls: ['./servicesfinder.component.css']
})
export class ServicesfinderComponent implements OnInit {

  searchform: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bauthService: BauthService
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.searchform = this.formBuilder.group({
      category: [''],
      state: ['']
    });
  }

  onSearch() {
    const someSearch = {
      category: this.searchform.get('category').value,
      state: this.searchform.get('state').value
    };
    // console.log(someSearch.category);
    this.bauthService.searchBusiness(someSearch).subscribe(data => {
      if (!data.success) {
        console.log(data.message);
      } else {
        console.log(data.message);
      }
    });
    // console.log('Logging');
  }
}
