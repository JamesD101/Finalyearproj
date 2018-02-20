import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BauthService } from '../../../../services/bauth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-addinfo',
  templateUrl: './addinfo.component.html',
  styleUrls: ['./addinfo.component.css']
})
export class AddinfoComponent implements OnInit {

  editForm: FormGroup;
  message: String;
  messageClass;
  processing = false;
  currentUrl;
  info = {};
  fullname;
  businessname;
  email;
  address;
  city;
  state: any;
  description;
  category;
  password;
  _id;
  allCategory: string[] = ['Select a category', 'Photography', 'Makeup Artist', 'Stylist', 'MC', 'Catering'];
  defaultcat: string = 'Select a category';
  allState: string[] = ['Select a state', 'Abuja', 'Adamawa', 'Kaduna', 'Kano', 'Kwara', 'Lagos', 'Ogun', 'Ondo', 'Osun', 'Plateau'];
  defstate;

  constructor(
    private formBuilder: FormBuilder,
    private bauthService: BauthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.createForm();
  }


  ngOnInit() {
   this.bauthService.getProfile().subscribe(profile => {
     if (!profile.success) {
       console.log('Error');
     } else {
       this.info = profile;
       this._id = profile.buser.id;
     }
   });


  }


  updateUserInfo() {
    const idme = {
      _id: this.activatedRoute.snapshot.paramMap.get('id'),
    };
    const pbuser = {
      fullname: this.editForm.get('fullname').value
      // email: this.editForm.get('email').value,
      // businessname: this.editForm.get('businessname').value,
      // category: this.editForm.get('category').value,
      // address: this.editForm.get('address').value,
      // password: this.editForm.get('password').value,
      // city: this.editForm.get('city').value,
      // state: this.editForm.get('state').value,
      // description: this.editForm.get('description').value
    };
    console.log(idme);
    console.log(pbuser);
    // console.log(this.info);
    this.bauthService.editBuserInfo(pbuser, idme).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        console.log(data);
      }
    });
   console.log('hey');
  }

  createForm() {
    console.log(this.defstate);
    this.editForm = this.formBuilder.group({
      // id: [''],
      fullname: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(70)
      ])]
     /* email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        this.validateEmail
      ])],
      businessname: ['', Validators.compose([
        Validators.required
      ])],
      category: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      description: ['', Validators.required]*/
      // profilepic: ['']
    });
    // this.editForm.controls['category'].setValue(this.defaultcat, {onlySelf: true});
    // this.editForm.controls['state'].setValue(this.defstate, {onlySelf: true});
  }

  validateEmail(controls) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateEmail': true};
    }
  }

  disableForm(){
    this.editForm.controls['fullname'].disable();
    this.editForm.controls['email'].disable();
    this.editForm.controls['businessname'].disable();
    this.editForm.controls['category'].disable();
    this.editForm.controls['address'].disable();
    this.editForm.controls['city'].disable();
    this.editForm.controls['state'].disable();
    this.editForm.controls['description`'].disable();
    // this.editForm.controls['confirm'].disable();
  }

  enableForm(){
    this.editForm.controls['fullname'].enable();
    this.editForm.controls['email'].enable();
    this.editForm.controls['businessname'].enable();
    this.editForm.controls['category'].enable();
    this.editForm.controls['address'].enable();
    this.editForm.controls['city'].enable();
    this.editForm.controls['state'].enable();
    this.editForm.controls['password'].enable();
    this.editForm.controls['confirm'].enable();
  }

}
