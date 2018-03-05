import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CauthService } from '../../../services/cauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicesfinder',
  templateUrl: './servicesfinder.component.html',
  styleUrls: ['./servicesfinder.component.css']
})

export class ServicesfinderComponent implements OnInit {

  message;
  messageClass;
  searchForm: FormGroup;
  holdService ;
  allCategory: string[] = ['Select a category', 'Photography', 'Makeup Artist', 'Stylist', 'MC', 'Catering'];
  defaultcat: string = 'Select a category';
  allState: string[] = ['Select a state', 'Abuja', 'Adamawa', 'Kaduna', 'Kano', 'Kwara', 'Lagos', 'Ogun', 'Ondo', 'Osun', 'Plateau'];
  defaultstate: string = 'Select a state';

  constructor(
    private formBuilder: FormBuilder,
    private cauthService: CauthService,
    private router: Router
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
    // if (!this.cauthService.loggedInC()){
    //     this.message = 'You must login to search';
    //     this.messageClass = 'alert alert-info';
    // } else {
    const someSearch = {
      category: this.searchForm.get('category').value,
      state: this.searchForm.get('state').value
    };
      this.cauthService.searchBusiness(someSearch).subscribe(data => {
        if (!data.success) {
          // console.log(data.message);
        } else {
          this.holdService = data.busers;
          console.log(this.holdService);
          // this.holdService.push(this.jb);
          // console.log("jb");
          let searched = ['/search', someSearch.category, someSearch.state];
          // public searched;
          this.router.navigate(searched);
          console.log(searched);
        }
      });
    }

}
