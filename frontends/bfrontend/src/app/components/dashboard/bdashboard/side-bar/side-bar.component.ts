import { Component, OnInit } from '@angular/core';
import { BauthService } from '../../../../services/bauth.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  editForm: FormGroup;
  message: String;
  messageClass;
  processing = false;
  info = {};
  fullname;
  hold= true;
  _id;
  businessname ;
  email;
  address;
  city;
  category;
  state;
  id ;
  description;
  // image;

  constructor(private bauthService: BauthService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.bauthService.getProfile().subscribe(profile => {
      this.businessname = profile.buser.businessname;
      this.email = profile.buser.email;
      this.address = profile.buser.address;
      this.description = profile.buser.description;
      this.city = profile.buser.city;
      this.state = profile.buser.state;
      this.category = profile.buser.category;
      this.id = profile.buser._id;
    });
  }

  updateUserInfo() {
    const newbuser = {
      businessname: this.editForm.get('businessname').value,
      description: this.editForm.get('description').value
    };
    this.bauthService.editBuserInfo(newbuser).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        window.location.reload();
      }
    });
  }

  createForm() {
    this.editForm = this.formBuilder.group({
      businessname: ['', Validators.compose([
        Validators.required
      ])],
      description: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(130),
        Validators.required
      ])]
    });
    this.editForm.controls['businessname'].disable();
  }

}
